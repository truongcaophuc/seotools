import { NextApiRequest, NextApiResponse } from 'next';
import puppeteer from 'puppeteer';
import * as cheerio from 'cheerio';
import axios from 'axios';

interface ScrapeResult {
  success: boolean;
  data?: {
    title: string;
    content: string;
    description?: string;
    url: string;
    images?: string[];
    publishDate?: string;
  };
  error?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ScrapeResult>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Method not allowed' });
  }

  const { url, usePuppeteer = false } = req.body;

  if (!url) {
    return res.status(400).json({ success: false, error: 'URL is required' });
  }

  try {
    let scrapedData;

    if (usePuppeteer) {
      // Use Puppeteer for SPA websites
      scrapedData = await scrapeWithPuppeteer(url);
    } else {
      // Try static scraping first
      try {
        scrapedData = await scrapeStatic(url);
      } catch (error) {
        console.log('Static scraping failed, trying with Puppeteer:', error);
        scrapedData = await scrapeWithPuppeteer(url);
      }
    }

    return res.status(200).json({
      success: true,
      data: scrapedData
    });
  } catch (error) {
    console.error('Scraping error:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to scrape content from the provided URL'
    });
  }
}

async function scrapeStatic(url: string) {
  const response = await axios.get(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    timeout: 10000
  });

  const $ = cheerio.load(response.data);

  // Extract title
  const title = $('title').text().trim() || 
                $('h1').first().text().trim() || 
                $('meta[property="og:title"]').attr('content') || 
                'No title found';

  // Extract description
  const description = $('meta[name="description"]').attr('content') || 
                     $('meta[property="og:description"]').attr('content') || 
                     '';

  // Extract main content
  let content = '';
  // Special selectors for Viblo
  const isViblo = url.includes('viblo.asia');
  const contentSelectors = isViblo ? [
    '.md-contents',
    '.post-content-body',
    '.markdown-body',
    '.post__content',
    '.post-body',
    'article .content',
    '.content'
  ] : [
    '.post-content-body',
    '.markdown-content', 
    '.post-body',
    '.article-body',
    '.content-body',
    'article',
    '.content',
    '.post-content',
    '.entry-content',
    '.article-content',
    'main',
    '.main-content'
  ];

  for (const selector of contentSelectors) {
    const element = $(selector);
    if (element.length > 0) {
      content = element.text().trim();
      break;
    }
  }

  // Fallback: get all paragraph text
  if (!content) {
    content = $('p').map((_, el) => $(el).text().trim()).get().filter(text => text.length > 0).join(' ');
  }

  // Check if content indicates login required (skip for Viblo)
  if (!isViblo) {
    const loginIndicators = [
      'register a viblo account',
      'đăng ký một tài khoản viblo',
      'login',
      'đăng nhập',
      'sign up',
      'đăng kí'
    ];
    
    const isLoginRequired = loginIndicators.some(indicator => 
      content.toLowerCase().includes(indicator.toLowerCase())
    );
    
    if (isLoginRequired && content.length < 500) {
      throw new Error('Trang web này yêu cầu đăng nhập để xem nội dung đầy đủ. Vui lòng thử với một URL khác hoặc sử dụng trang web không yêu cầu đăng nhập.');
    }
  }

  // Extract images
  const images: string[] = [];
  $('img').each((_, el) => {
    const src = $(el).attr('src');
    if (src) {
      const absoluteUrl = new URL(src, url).href;
      images.push(absoluteUrl);
    }
  });

  // Extract publish date
  const publishDate = $('meta[property="article:published_time"]').attr('content') ||
                     $('meta[name="publish_date"]').attr('content') ||
                     $('time').attr('datetime') ||
                     '';

  return {
    title,
    content: content, // No character limit
    description,
    url,
    images: images.slice(0, 10), // Limit number of images
    publishDate
  };
}

async function scrapeWithPuppeteer(url: string) {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    // Set user agent
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36');
    
    // Navigate to page
    await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
    
    // Wait for content to load
    await page.waitForTimeout(3000);

    // Extract data
    const scrapedData = await page.evaluate(() => {
      // Extract title
      const title = document.title || 
                   document.querySelector('h1')?.textContent?.trim() || 
                   document.querySelector('meta[property="og:title"]')?.getAttribute('content') || 
                   'No title found';

      // Extract description
      const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || 
                         document.querySelector('meta[property="og:description"]')?.getAttribute('content') || 
                         '';

      // Extract main content
      let content = '';
      // Special selectors for Viblo
      const isViblo = window.location.href.includes('viblo.asia');
      const contentSelectors = isViblo ? [
        '.md-contents',
        '.post-content-body',
        '.markdown-body',
        '.post__content',
        '.post-body',
        'article .content',
        '.content'
      ] : [
        '.post-content-body',
        '.markdown-content',
        '.post-body',
        '.article-body',
        '.content-body',
        'article',
        '.content',
        '.post-content',
        '.entry-content',
        '.article-content',
        'main',
        '.main-content'
      ];

      for (const selector of contentSelectors) {
        const element = document.querySelector(selector);
        if (element) {
          content = element.textContent?.trim() || '';
          break;
        }
      }

      // Fallback: get all paragraph text
      if (!content) {
        const paragraphs = Array.from(document.querySelectorAll('p'));
        content = paragraphs.map(p => p.textContent?.trim()).filter(text => text && text.length > 0).join(' ');
      }

      // Check if content indicates login required (skip for Viblo)
      if (!isViblo) {
        const loginIndicators = [
          'register a viblo account',
          'đăng ký một tài khoản viblo',
          'login',
          'đăng nhập',
          'sign up',
          'đăng kí'
        ];
        
        const isLoginRequired = loginIndicators.some(indicator => 
          content.toLowerCase().includes(indicator.toLowerCase())
        );
        
        if (isLoginRequired && content.length < 500) {
          return {
            error: 'Trang web này yêu cầu đăng nhập để xem nội dung đầy đủ. Vui lòng thử với một URL khác hoặc sử dụng trang web không yêu cầu đăng nhập.'
          };
        }
      }

      // Extract images
      const images = Array.from(document.querySelectorAll('img'))
        .map(img => img.src)
        .filter(src => src && src.startsWith('http'))
        .slice(0, 10);

      // Extract publish date
      const publishDate = document.querySelector('meta[property="article:published_time"]')?.getAttribute('content') ||
                         document.querySelector('meta[name="publish_date"]')?.getAttribute('content') ||
                         document.querySelector('time')?.getAttribute('datetime') ||
                         '';

      return {
        title,
        content: content, // No character limit
        description,
        url: window.location.href,
        images,
        publishDate
      };
    });

    // Check if there's an error from the evaluation
    if (scrapedData.error) {
      throw new Error(scrapedData.error);
    }

    return scrapedData;
  } finally {
    await browser.close();
  }
}