import { GEMINI_API_KEY } from '@constants/openai';

interface GeminiMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface GeminiRequest {
  contents: GeminiMessage[];
  generationConfig?: {
    temperature?: number;
    topK?: number;
    topP?: number;
    maxOutputTokens?: number;
    stopSequences?: string[];
  };
}

interface GeminiResponse {
  candidates: {
    content: {
      parts: { text: string }[];
      role: string;
    };
    finishReason: string;
    index: number;
    safetyRatings: any[];
  }[];
  promptFeedback: {
    safetyRatings: any[];
  };
}

class GeminiAPI {
  private apiKey: string;
  private baseUrl: string = 'https://generativelanguage.googleapis.com/v1beta/models';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async generateContent(request: GeminiRequest): Promise<GeminiResponse> {
    const response = await fetch(`${this.baseUrl}/gemini-2.0-flash:generateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  async generateContentStream(request: GeminiRequest): Promise<ReadableStream> {
    const response = await fetch(`${this.baseUrl}/gemini-2.0-flash:streamGenerateContent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': this.apiKey,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    return response.body!;
  }

  // Helper method to convert OpenAI-style messages to Gemini format
  convertOpenAIToGemini(messages: { role: string; content: string }[]): GeminiMessage[] {
    return messages.map(msg => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }]
    }));
  }

  // Helper method to create chat completion similar to OpenAI
  async createChatCompletion({
    messages,
    temperature = 0.7,
    maxTokens = 1000,
    stream = false
  }: {
    messages: { role: string; content: string }[];
    temperature?: number;
    maxTokens?: number;
    stream?: boolean;
  }) {
    const geminiMessages = this.convertOpenAIToGemini(messages);
    
    const request: GeminiRequest = {
      contents: geminiMessages,
      generationConfig: {
        temperature,
        maxOutputTokens: maxTokens,
      }
    };

    if (stream) {
      return this.generateContentStream(request);
    } else {
      const response = await this.generateContent(request);
      return {
        data: {
          choices: [{
            message: {
              content: response.candidates[0]?.content.parts[0]?.text || ''
            }
          }]
        }
      };
    }
  }
}

const geminiAPI = new GeminiAPI(GEMINI_API_KEY || '');

export { geminiAPI, GeminiAPI, type GeminiMessage, type GeminiRequest, type GeminiResponse };
export default geminiAPI;