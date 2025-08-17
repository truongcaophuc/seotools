import { DEFAULT_MAX_TOKEN } from '@constants/openai';
import { openAiWithEdge } from '@lib/openai';
import type { NextRequest } from 'next/server';

const handler = async (req: NextRequest, res) => {
    const { searchParams } = new URL(req.url);
    const messages = JSON.parse(searchParams.get('messages'));
    const max_tokens_query = searchParams.get('max_tokens');

    let max_tokens = DEFAULT_MAX_TOKEN;

    if (max_tokens_query !== 'undefined') {
        max_tokens = JSON.parse(max_tokens_query);
    }

    try {
        const completion = await openAiWithEdge.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
            max_tokens,
            temperature: 0.7,
            stream: true,
        });

        return new Response(completion.body, {
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'text/event-stream;charset=utf-8',
                'Cache-Control': 'no-cache, no-transform',
                'X-Accel-Buffering': 'no',
            },
        });
    } catch (error) {
        console.error(error);

        return new Response(JSON.stringify(error), {
            status: 400,
            headers: {
                'content-type': 'application/json',
            },
        });
    }
};

export const config = {
    runtime: 'edge',
};

export default handler;
