import { DEFAULT_MAX_TOKEN, GEMINI_API_KEY } from '@constants/openai';
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
        // Convert messages to Gemini format
        const geminiMessages = messages.map(msg => ({
            role: msg.role === 'user' ? 'user' : 'model',
            parts: [{ text: msg.content }]
        }));

        const requestBody = {
            contents: geminiMessages,
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: max_tokens,
            }
        };

        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-goog-api-key': GEMINI_API_KEY,
            },
            body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
            throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
        }

        return new Response(response.body, {
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
