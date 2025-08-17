import { openAi } from '@lib/openai';
import { sessionOptions } from '@lib/session';
import { generateLeadingSentence } from '@share/helps/generateLeadingSentence';
import { serviceRedis } from '@share/helps/redis';
import { withIronSessionApiRoute } from 'iron-session/next';
import cors from 'micro-cors';
import { type NextApiRequest } from 'next';

async function handler(req: NextApiRequest, res) {
    const { serviceId, customFields } = req.body;

    const services = await serviceRedis.getAllService();
    const service = services.find((item) => item.id === serviceId);

    res.writeHead(200, {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache, no-transform',
        Connection: 'keep-alive',
    });

    const sendData = (data: string) => {
        res.write(`data: ${data}\n\n`);
    };

    if (!service) {
        sendData('[DONE]');
        return res.end();
    }

    const { leadingSentence, systemMessage } = generateLeadingSentence({
        service,
        customFields,
    });

    let messages: Array<{
        role: 'user' | 'system';
        content: string;
    }> = [{ role: 'user', content: leadingSentence }];

    if (service?.systemMessage) {
        messages.unshift({
            role: 'system',
            content: systemMessage,
        });
    }

    let completion: any;

    if (service.model === 'GPT') {
        completion = await openAi.createChatCompletion(
            {
                model: 'gpt-3.5-turbo',
                messages,
                stream: true,
                // max_tokens: 1500, // Choose the max allowed tokens in completion
                temperature: 0, // Set to 0 for deterministic results
            },
            { responseType: 'stream' }
        );
    }

    if (service.model === 'GPT4') {
        completion = await openAi.createChatCompletion(
            {
                model: 'gpt-4',
                messages,
                stream: true,
                // max_tokens: 1500, // Choose the max allowed tokens in completion
                temperature: 0, // Set to 0 for deterministic results
            },
            { responseType: 'stream' }
        );
    }

    if (!service.model || service.model === 'Davinci') {
        completion = await openAi.createCompletion(
            {
                model: 'text-davinci-003',
                prompt: leadingSentence,
                stream: true,
                temperature: 0.5,
                // max_tokens: 800,
                top_p: 1.0,
                frequency_penalty: 0,
                presence_penalty: 0,
            },
            { responseType: 'stream' }
        );
    }

    const isGpt = ['GPT', 'GPT4'].includes(service.model);

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

                //(parsed.choices[0].finish_reason === 'stop')
                if (parsed.choices[0].finish_reason) {
                    sendData('[DONE]');
                    return res.end();
                }

                const content = isGpt
                    ? parsed.choices[0].delta.content
                    : parsed.choices[0].text;

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

export default withIronSessionApiRoute(cors()(handler), sessionOptions);
