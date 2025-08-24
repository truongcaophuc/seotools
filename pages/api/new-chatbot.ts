import { geminiAPI } from '@lib/gemini';
import { GEMINI_API_KEY } from '@constants/openai';
import { sessionOptions } from '@lib/session';
import { generateLeadingSentence } from '@share/helps/generateLeadingSentence';
import { serviceRedis } from '@share/helps/redis';
import { withIronSessionApiRoute } from 'iron-session/next';
import { getCorsMiddleware } from '@lib/cors';
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

    // Convert messages to Gemini format
    const geminiMessages = messages.map(msg => ({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.content }]
    }));

    const requestBody = {
        contents: geminiMessages,
        generationConfig: {
            temperature: service.model === 'GPT4' ? 0 : 0.5,
            maxOutputTokens: 1500,
        }
    };

    // Use Gemini API for all models
    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:streamGenerateContent', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-goog-api-key': GEMINI_API_KEY,
        },
        body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
        sendData('[DONE]');
        return res.end();
    }

    completion = { data: response.body };

    // Handle Gemini streaming response
    const reader = completion.data.getReader();
    const decoder = new TextDecoder();

    try {
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
                sendData('[DONE]');
                return res.end();
            }

            const chunk = decoder.decode(value);
            const lines = chunk.split('\n').filter(line => line.trim());

            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    
                    if (data === '[DONE]') {
                        sendData('[DONE]');
                        return res.end();
                    }

                    try {
                        const parsed = JSON.parse(data);
                        
                        if (parsed.candidates && parsed.candidates[0]) {
                            const candidate = parsed.candidates[0];
                            
                            if (candidate.finishReason) {
                                sendData('[DONE]');
                                return res.end();
                            }

                            const content = candidate.content?.parts?.[0]?.text;
                            
                            if (content) {
                                sendData(JSON.stringify({ text: content }));
                            }
                        }
                    } catch (error) {
                        console.error('Could not parse Gemini response:', error);
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error reading Gemini stream:', error);
        sendData('[DONE]');
        return res.end();
    }
}

export default withIronSessionApiRoute(getCorsMiddleware()(handler), sessionOptions);
