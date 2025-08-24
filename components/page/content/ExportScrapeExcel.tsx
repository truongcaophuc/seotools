import React, { useState } from 'react';
import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  Input, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  List, 
  ListItem, 
  useToast 
} from '@chakra-ui/react';
import { Spinner } from '@chakra-ui/react';

interface ScrapeData {
  title: string;
  content: string;
  description?: string;
  url: string;
  images?: string[];
  publishDate?: string;
  scrapedAt?: string;
}

interface ExportScrapeExcelProps {
  data: ScrapeData[];
  className?: string;
}

export const ExportScrapeExcel: React.FC<ExportScrapeExcelProps> = ({ 
  data, 
  className = '' 
}) => {
  const [filename, setFilename] = useState('scraped-data');
  const [isExporting, setIsExporting] = useState(false);
  const toast = useToast();

  const handleExport = async () => {
    if (!data || data.length === 0) {
      toast({
        title: 'Lỗi',
        description: 'Không có dữ liệu để xuất',
        status: 'error'
      });
      return;
    }

    setIsExporting(true);

    try {
      // Thêm timestamp cho mỗi item
      const dataWithTimestamp = data.map(item => ({
        ...item,
        scrapedAt: item.scrapedAt || new Date().toISOString()
      }));

      const response = await fetch('/api/export-scrape-excel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: dataWithTimestamp,
          filename: filename || 'scraped-data'
        }),
      });

      if (!response.ok) {
        throw new Error('Không thể xuất file Excel');
      }

      // Tạo blob từ response
      const blob = await response.blob();
      
      // Tạo URL để download
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      // Lấy filename từ response header hoặc sử dụng default
      const contentDisposition = response.headers.get('content-disposition');
      let downloadFilename = `${filename}-${new Date().toISOString().replace(/[:.]/g, '-')}.xlsx`;
      
      if (contentDisposition) {
        const filenameMatch = contentDisposition.match(/filename="(.+)"/i);
        if (filenameMatch) {
          downloadFilename = filenameMatch[1];
        }
      }
      
      link.download = downloadFilename;
      document.body.appendChild(link);
      link.click();
      
      // Cleanup
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Thành công',
        description: `Đã xuất ${data.length} bản ghi ra file Excel`,
        status: 'success'
      });

    } catch (error) {
      console.error('Export error:', error);
      toast({
        title: 'Lỗi',
        description: 'Không thể xuất file Excel. Vui lòng thử lại.',
        status: 'error'
      });
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card className={className}>
      <CardBody>
        <VStack spacing={4} align="stretch">
          <Box>
            <Heading size="md" mb={2}>Xuất dữ liệu Scrape ra Excel</Heading>
            <Text fontSize="sm" color="gray.600">
              Xuất {data?.length || 0} bản ghi dữ liệu scrape ra file Excel
            </Text>
          </Box>

          <VStack spacing={3} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="medium" mb={1}>
                Tên file (không cần đuôi .xlsx)
              </Text>
              <Input
                type="text"
                value={filename}
                onChange={(e) => setFilename(e.target.value)}
                placeholder="scraped-data"
              />
            </Box>

            <Box bg="gray.50" p={3} borderRadius="md">
              <Text fontSize="sm" fontWeight="medium" mb={2}>Dữ liệu sẽ bao gồm:</Text>
              <List fontSize="sm" color="gray.600" spacing={1}>
                <ListItem>• STT</ListItem>
                <ListItem>• Tiêu đề</ListItem>
                <ListItem>• Mô tả</ListItem>
                <ListItem>• URL</ListItem>
                <ListItem>• Nội dung (giới hạn 1000 ký tự)</ListItem>
                <ListItem>• Số lượng hình ảnh</ListItem>
                <ListItem>• URLs hình ảnh</ListItem>
                <ListItem>• Ngày xuất bản</ListItem>
                <ListItem>• Thời gian scrape</ListItem>
              </List>
            </Box>

            <Button
              onClick={handleExport}
              isDisabled={isExporting || !data || data.length === 0}
              isLoading={isExporting}
              loadingText="Đang xuất..."
              colorScheme="blue"
              width="full"
            >
              Xuất Excel
            </Button>
          </VStack>
        </VStack>
      </CardBody>
    </Card>
  );
};

export default ExportScrapeExcel;