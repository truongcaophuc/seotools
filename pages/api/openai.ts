import { openAiWithEdge } from '@lib/openai';
import type { NextRequest } from 'next/server';

const handler = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);

    const promtdasd = searchParams.get('prompt');

    console.log({ promtdasd });

    try {
        const completion = await openAiWithEdge.createCompletion({
            model: 'text-davinci-003',
            prompt: searchParams.get('prompt') ?? 'Say this is a test',
            temperature: 0.5,
            max_tokens: +searchParams.get('max_tokens') ?? 800,
            top_p: 1.0,
            frequency_penalty: 0,
            presence_penalty: 0,
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
    } catch (error: any) {
        console.error(error);
        if (error.response) {
            console.error(error.response.status);
            console.error(error.response.data);
        } else {
            console.error(error.message);
        }
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
