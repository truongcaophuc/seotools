import prisma from '@lib/prisma';
import { sessionOptions } from '@lib/session';
import { supabaseClient } from '@lib/supabase';
import { encode } from 'gpt-3-encoder';
import { withIronSessionApiRoute } from 'iron-session/next';
import { getCorsMiddleware } from '@lib/cors';
import { NextApiRequest, NextApiResponse } from 'next';
import { Configuration, OpenAIApi } from 'openai';
import stripIndent from 'strip-indent';

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
    const { documentId, question } = req.body;

    const documentRes = await prisma.image.findFirst({
        where: { id: documentId },
    });

    if (!documentRes) {
        return res.status(200).json({ status: false });
    }

    const client = supabaseClient();

    const embeddingResponse = await openai.createEmbedding({
        model: 'text-embedding-ada-002',
        input: question,
    });

    const [{ embedding }] = embeddingResponse.data.data;

    const { data, error } = await client.rpc('match_documents', {
        query_embedding: embedding,
        similarity_threshold: 0.78, // Choose an appropriate threshold for your data
        match_count: 10, // Choose the number of matches
        doc_id: documentId,
    });

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
    });

    const sendData = (data: string) => {
        res.write(`data: ${data}\n\n`);
    };

    if (error) {
        sendData('[DONE]');
        res.end();
    } else {
        let tokenCount = 0;
        let contextText = '';
        for (let i = 0; i < data.length; i++) {
            const item = data[i];
            const text = item.content;
            const encoded = encode(text);

            tokenCount += encoded.length;

            if (tokenCount > 1500) {
                break;
            }

            contextText += `${text.trim()}\n---\n`;
        }

        const prompt =
            stripIndent(`I am a highly intelligent question answering bot. If you ask me a question that is rooted in truth, I will give you the answer. If you ask me a question that is nonsense, trickery, or has no clear answer, I will respond with "Unknown".
    
        Context sections:
        ${contextText}
    
        Answer as markdown (including related code snippets if available):
      `);

        const completion = await openai.createChatCompletion(
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: prompt },
                    { role: 'user', content: question },
                ],
                stream: true,
                max_tokens: 1500, // Choose the max allowed tokens in completion
                temperature: 0, // Set to 0 for deterministic results
            },
            { responseType: 'stream' }
        );

        // @ts-ignore
        completion.data.on('data', (data) => {
            let lines = data
                .toString()
                .split('\n')
                .filter((item: string) => {
                    return item !== '';
                });

            if (lines.length > 1) {
                lines.shift();
            }

            for (let line of lines) {
                const message = line.replace(/^data: /, '');

                if (message === '[DONE]') {
                    sendData('[DONE]');

                    return res.end();
                }

                try {
                    const parsed = JSON.parse(message);

                    if (parsed.choices[0].finish_reason === 'stop ') {
                        sendData('[DONE]');
                        return res.end();
                    }

                    const content = parsed.choices[0].delta.content;

                    if (content === undefined) {
                        sendData('');
                        return;
                    }

                    sendData(JSON.stringify({ text: content }));
                    return content;
                } catch (error) {
                    console.error(
                        'Could not JSON parse stream message',
                        message,
                        error
                    );
                }
            }
        });
    }
}

export default withIronSessionApiRoute(getCorsMiddleware()(handler), sessionOptions);
