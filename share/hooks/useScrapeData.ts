import { useState, useCallback } from 'react';
import { useToast } from '@chakra-ui/react';

export interface ScrapeData {
  title: string;
  content: string;
  description?: string;
  url: string;
  images?: string[];
  publishDate?: string;
  scrapedAt?: string;
}

export interface ScrapeResult {
  success: boolean;
  data?: ScrapeData;
  error?: string;
}

export const useScrapeData = () => {
  const [scrapeHistory, setScrapeHistory] = useState<ScrapeData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const scrapeUrl = useCallback(async (url: string, usePuppeteer = false): Promise<ScrapeResult> => {
    setIsLoading(true);
    
    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, usePuppeteer }),
      });

      const result: ScrapeResult = await response.json();

      if (result.success && result.data) {
        // Thêm timestamp
        const dataWithTimestamp = {
          ...result.data,
          scrapedAt: new Date().toISOString()
        };

        // Thêm vào lịch sử
        setScrapeHistory(prev => [dataWithTimestamp, ...prev]);

        toast({
          title: 'Thành công',
          description: 'Đã scrape dữ liệu thành công',
          status: 'success',
          duration: 3000,
          isClosable: true
        });

        return { ...result, data: dataWithTimestamp };
      } else {
        toast({
          title: 'Lỗi',
          description: result.error || 'Không thể scrape dữ liệu',
          status: 'error',
          duration: 5000,
          isClosable: true
        });
        return result;
      }
    } catch (error) {
      const errorMessage = 'Lỗi kết nối. Vui lòng thử lại.';
      toast({
        title: 'Lỗi',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true
      });
      return { success: false, error: errorMessage };
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  const clearHistory = useCallback(() => {
    setScrapeHistory([]);
    toast({
      title: 'Đã xóa',
      description: 'Đã xóa toàn bộ lịch sử scrape',
      status: 'info',
      duration: 3000,
      isClosable: true
    });
  }, [toast]);

  const removeItem = useCallback((index: number) => {
    setScrapeHistory(prev => prev.filter((_, i) => i !== index));
    toast({
      title: 'Đã xóa',
      description: 'Đã xóa item khỏi lịch sử',
      status: 'info',
      duration: 3000,
      isClosable: true
    });
  }, [toast]);

  const importData = useCallback((data: ScrapeData[]) => {
    setScrapeHistory(data);
    toast({
      title: 'Thành công',
      description: `Đã import ${data.length} bản ghi`,
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }, [toast]);

  const updateItem = useCallback((index: number, updatedData: ScrapeData) => {
    setScrapeHistory(prev => {
      const newHistory = [...prev];
      newHistory[index] = updatedData;
      return newHistory;
    });
    toast({
      title: 'Đã cập nhật',
      description: 'Đã cập nhật nội dung thành công',
      status: 'success',
      duration: 3000,
      isClosable: true
    });
  }, [toast]);

  return {
    scrapeHistory,
    isLoading,
    scrapeUrl,
    clearHistory,
    removeItem,
    importData,
    updateItem,
    setScrapeHistory
  };
};