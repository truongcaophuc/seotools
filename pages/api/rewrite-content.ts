import { NextApiRequest, NextApiResponse } from 'next';
import { GEMINI_API_KEY } from '@constants/openai';
import axios from 'axios';

interface RewriteRequest {
  content: string;
  title: string;
  tone?: 'professional' | 'casual' | 'engaging' | 'informative';
  length?: 'shorter' | 'same' | 'longer';
  language?: 'vi' | 'en';
  customPrompt?: string;
}

interface RewriteResult {
  success: boolean;
  data?: {
    originalContent: string;
    rewrittenContent: string;
    title: string;
    rewrittenTitle: string;
    wordCount: {
      original: number;
      rewritten: number;
    };
  };
  error?: string;
}

// Gemini API is initialized in the gemini lib

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RewriteResult>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const {
    content,
    title,
    tone = 'professional',
    length = 'same',
    language = 'vi',
    customPrompt
  }: RewriteRequest = req.body;

  if (!content || !title) {
    return res.status(400).json({
      success: false,
      error: 'Content and title are required'
    });
  }

  if (!GEMINI_API_KEY) {
    return res.status(500).json({
      success: false,
      error: 'Gemini API key not configured'
    });
  }

  try {
    let prompt;
    if (customPrompt) {
      // Khi có customPrompt, kết hợp với nội dung gốc
      prompt = `${customPrompt}\n\nTiêu đề gốc: ${title}\nNội dung gốc: ${content}\n\nLưu ý: Bạn PHẢI trả về theo đúng format sau:\nTITLE: [tiêu đề đã viết lại]\nCONTENT: [nội dung đã viết lại]`;
    } else {
      prompt = generatePrompt(content, title, tone, length, language);
    }

    // Combine system prompt with user prompt for Gemini
    const systemPrompt = getSystemPrompt(language);
    const fullPrompt = `${systemPrompt}\n\n${prompt}\n\nLưu ý: Bạn PHẢI trả về ngay lập tức theo format TITLE: và CONTENT: mà KHÔNG được hỏi thêm hay trò chuyện.`;
    
    // Call Gemini API directly
    const geminiResponse = await axios.post(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`, {
      contents: [
        {
          parts: [
            {
              text: fullPrompt
            }
          ]
        }
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 2000
      }
    }, {
      headers: {
        'Content-Type': 'application/json',
        'X-goog-api-key': GEMINI_API_KEY
      }
    });

    const geminiData = geminiResponse.data;
    const response = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!response) {
      throw new Error('No response from Gemini API');
    }

    // Parse the response to extract title and content
    const { rewrittenTitle, rewrittenContent } = parseResponse(response, title);

    // Calculate word counts
    const originalWordCount = content.split(/\s+/).length;
    const rewrittenWordCount = rewrittenContent.split(/\s+/).length;

    return res.status(200).json({
      success: true,
      data: {
        originalContent: content,
        rewrittenContent,
        title,
        rewrittenTitle,
        wordCount: {
          original: originalWordCount,
          rewritten: rewrittenWordCount
        }
      }
    });
  } catch (error: any) {
    console.error('Gemini API error:', error);
    
    let errorMessage = 'Failed to rewrite content';
    if (error.response?.status === 429) {
      errorMessage = 'API rate limit exceeded. Please try again later.';
    } else if (error.response?.status === 401) {
      errorMessage = 'Invalid API key';
    } else if (error.response?.data) {
      errorMessage = `API Error: ${JSON.stringify(error.response.data)}`;
    } else if (error.message) {
      errorMessage = error.message;
    }

    return res.status(500).json({
      success: false,
      error: errorMessage
    });
  }
}

function getSystemPrompt(language: string): string {
  const prompts = {
    vi: `Bạn là một công cụ viết lại nội dung tự động. Bạn KHÔNG được trò chuyện hay hỏi thêm thông tin. Bạn CHỈ được viết lại nội dung theo yêu cầu.

Quy tắc BẮTBUỘC:
- KHÔNG trò chuyện, KHÔNG hỏi thêm thông tin
- CHỈ viết lại nội dung được cung cấp
- Giữ nguyên ý nghĩa và thông tin chính
- Viết lại theo phong cách và độ dài được yêu cầu
- Đảm bảo nội dung tự nhiên và hấp dẫn
- Tránh lặp lại từ ngữ từ bản gốc

FORMAT TRẢ VỀ BẮT BUỘC (KHÔNG được thay đổi):
TITLE: [tiêu đề đã viết lại]
CONTENT: [nội dung đã viết lại]

Ví dụ:
TITLE: Cách học tiếng Anh hiệu quả
CONTENT: Học tiếng Anh không còn là thử thách khó khăn nếu bạn áp dụng đúng phương pháp...`,
    
    en: `You are an automatic content rewriting tool. You MUST NOT chat or ask for more information. You MUST ONLY rewrite the provided content.

MANDATORY rules:
- DO NOT chat, DO NOT ask for more information
- ONLY rewrite the provided content
- Preserve original meaning and key information
- Rewrite according to requested style and length
- Ensure content is natural and engaging
- Avoid repeating words from the original

MANDATORY RESPONSE FORMAT (DO NOT change):
TITLE: [rewritten title]
CONTENT: [rewritten content]

Example:
TITLE: Effective Ways to Learn English
CONTENT: Learning English is no longer a difficult challenge if you apply the right methods...`
  };
  
  return prompts[language as keyof typeof prompts] || prompts.en;
}

function generatePrompt(
  content: string,
  title: string,
  tone: string,
  length: string,
  language: string
): string {
  const toneDescriptions = {
    vi: {
      professional: 'chuyên nghiệp và trang trọng',
      casual: 'thân thiện và gần gũi',
      engaging: 'hấp dẫn và thu hút',
      informative: 'thông tin và giáo dục'
    },
    en: {
      professional: 'professional and formal',
      casual: 'friendly and casual',
      engaging: 'engaging and captivating',
      informative: 'informative and educational'
    }
  };

  const lengthDescriptions = {
    vi: {
      shorter: 'ngắn gọn hơn (giảm 20-30%)',
      same: 'độ dài tương tự',
      longer: 'chi tiết hơn (tăng 20-30%)'
    },
    en: {
      shorter: 'shorter (reduce by 20-30%)',
      same: 'similar length',
      longer: 'more detailed (increase by 20-30%)'
    }
  };

  if (language === 'vi') {
    return `Hãy viết lại bài viết sau với phong cách ${toneDescriptions.vi[tone]} và độ dài ${lengthDescriptions.vi[length]}:

Tiêu đề gốc: ${title}
Nội dung gốc: ${content}

Yêu cầu:
- Viết lại hoàn toàn bằng tiếng Việt
- Giữ nguyên thông tin chính nhưng thay đổi cách diễn đạt
- Tạo tiêu đề mới hấp dẫn
- Đảm bảo nội dung tự nhiên và SEO-friendly

Lưu ý: Bạn PHẢI trả về theo đúng format sau:
TITLE: [tiêu đề đã viết lại]
CONTENT: [nội dung đã viết lại]`;
  } else {
    return `Please rewrite the following article with a ${toneDescriptions.en[tone]} tone and ${lengthDescriptions.en[length]}:

Original title: ${title}
Original content: ${content}

Requirements:
- Completely rewrite in English
- Maintain key information but change the expression
- Create an attractive new title
- Ensure the content is natural and SEO-friendly

Note: You MUST respond in the following format:
TITLE: [rewritten title]
CONTENT: [rewritten content]`;
  }
}

function parseResponse(response: string, originalTitle: string): {
  rewrittenTitle: string;
  rewrittenContent: string;
} {
  let rewrittenTitle = originalTitle;
  let rewrittenContent = response.trim();

  // Try to extract title and content from the response using multiple patterns
  const titlePatterns = [
    /TITLE:\s*(.+)/i,
    /Tiêu đề:\s*(.+)/i,
    /Title:\s*(.+)/i,
    /^(.+)$/m // First line as title if no explicit marker
  ];
  
  const contentPatterns = [
    /CONTENT:\s*([\s\S]+)/i,
    /Nội dung:\s*([\s\S]+)/i,
    /Content:\s*([\s\S]+)/i
  ];

  // Try to find title
  for (const pattern of titlePatterns) {
    const match = response.match(pattern);
    if (match && match[1].trim().length > 0 && match[1].trim().length < 200) {
      rewrittenTitle = match[1].trim();
      break;
    }
  }

  // Try to find content
  let foundContent = false;
  for (const pattern of contentPatterns) {
    const match = response.match(pattern);
    if (match && match[1].trim().length > 0) {
      rewrittenContent = match[1].trim();
      foundContent = true;
      break;
    }
  }

  // If no explicit content marker found, use the whole response minus title
  if (!foundContent) {
    // Remove title line if it was found
    const lines = response.split('\n');
    if (rewrittenTitle !== originalTitle && lines.length > 1) {
      // Remove the first line (title) and any empty lines
      rewrittenContent = lines.slice(1).join('\n').trim();
    }
    
    // Remove any remaining title/content markers
    rewrittenContent = rewrittenContent
      .replace(/^(TITLE|Tiêu đề|Title):\s*.+\n?/im, '')
      .replace(/^(CONTENT|Nội dung|Content):\s*/im, '')
      .trim();
  }

  // Ensure we have some content
  if (!rewrittenContent || rewrittenContent.length < 10) {
    rewrittenContent = response.trim();
  }

  return {
    rewrittenTitle,
    rewrittenContent
  };
}