import { NextApiRequest, NextApiResponse } from 'next';
import * as XLSX from 'xlsx';

interface ScrapeData {
  title: string;
  content: string;
  description?: string;
  url: string;
  images?: string[];
  publishDate?: string;
  scrapedAt?: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { data, filename = 'scraped-data' } = req.body;

    if (!data || !Array.isArray(data)) {
      return res.status(400).json({ error: 'Invalid data format. Expected array of scrape results.' });
    }

    // Function to clean content
    const cleanContent = (content: string): string => {
      if (!content) return '';
      
      // Remove excessive whitespace and newlines
      return content
        .replace(/\s+/g, ' ')  // Replace multiple whitespace with single space
        .replace(/\n+/g, ' ')  // Replace newlines with space
        .trim();
    };

    // Prepare data for Excel
    const excelData = data.map((item: ScrapeData, index: number) => {
      const cleanedContent = cleanContent(item.content);
      const truncatedContent = cleanedContent.length > 1000 
        ? cleanedContent.substring(0, 1000) + '...' 
        : cleanedContent;
        
      return {
        'STT': index + 1,
        'Tiêu đề': item.title || '',
        'Mô tả': item.description || '',
        'URL': item.url || '',
        'Nội dung': truncatedContent,
        'Số lượng hình ảnh': item.images ? item.images.length : 0,
        'Hình ảnh (URLs)': item.images ? item.images.join('; ') : '',
        'Ngày xuất bản': item.publishDate || '',
        'Thời gian scrape': item.scrapedAt || new Date().toISOString()
      };
    });

    // Create workbook and worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.json_to_sheet(excelData);

    // Set column widths
    const columnWidths = [
      { wch: 5 },   // STT
      { wch: 30 },  // Tiêu đề
      { wch: 40 },  // Mô tả
      { wch: 50 },  // URL
      { wch: 60 },  // Nội dung
      { wch: 15 },  // Số lượng hình ảnh
      { wch: 80 },  // Hình ảnh URLs
      { wch: 20 },  // Ngày xuất bản
      { wch: 20 }   // Thời gian scrape
    ];
    worksheet['!cols'] = columnWidths;

    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Scraped Data');

    // Generate Excel buffer
    const excelBuffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });

    // Set response headers for file download
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const fileName = `${filename}-${timestamp}.xlsx`;
    
    res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
    res.setHeader('Content-Length', excelBuffer.length);

    // Send the Excel file
    res.status(200).send(excelBuffer);

  } catch (error) {
    console.error('Excel export error:', error);
    res.status(500).json({ error: 'Failed to generate Excel file' });
  }
}