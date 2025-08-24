import React, { useState } from 'react';
import { NextPage } from 'next';
import { 
  Box, 
  Button, 
  Card, 
  CardBody, 
  Input, 
  Checkbox, 
  Table, 
  Thead, 
  Tbody, 
  Tr, 
  Th, 
  Td, 
  VStack, 
  HStack, 
  Text, 
  Heading, 
  Container, 
  useToast,
  useDisclosure 
} from '@chakra-ui/react';
import ExportScrapeExcel from '@components/page/content/ExportScrapeExcel';
import ContentDetailModal from '@components/page/content/ContentDetailModal';
import { useScrapeData } from '@share/hooks/useScrapeData';

const ScrapeExcelPage: NextPage = () => {
  const [url, setUrl] = useState('');
  const [usePuppeteer, setUsePuppeteer] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const { 
    scrapeHistory, 
    isLoading, 
    scrapeUrl, 
    clearHistory, 
    removeItem,
    updateItem 
  } = useScrapeData();

  const handleScrape = async () => {
    if (!url.trim()) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng nhập URL',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      new URL(url); // Validate URL
      await scrapeUrl(url, usePuppeteer);
    } catch (error) {
      toast({
        title: 'Lỗi',
        description: 'URL không hợp lệ',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('vi-VN');
  };

  const handleViewDetail = (item: any) => {
    setSelectedItem(item);
    onOpen();
  };

  const handleSaveEditedContent = (editedData: any) => {
    if (selectedItem) {
      const index = scrapeHistory.findIndex(item => item === selectedItem);
      if (index !== -1) {
        updateItem(index, editedData);
        setSelectedItem(editedData);
      }
    }
  };

  return (
    <Container maxW="7xl" py={8} minH="100vh" bg="gray.50">
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" color="gray.900" mb={2}>
            Scrape Website & Xuất Excel
          </Heading>
          <Text color="gray.600">
            Scrape nội dung từ website và xuất dữ liệu ra file Excel
          </Text>
        </Box>

        <HStack spacing={8} align="start">
          {/* Scrape Form */}
          <VStack spacing={6} flex={2}>
            <Card w="full">
              <CardBody>
                <Heading size="lg" mb={4}>Scrape Website</Heading>
                
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontSize="sm" fontWeight="medium" mb={1}>
                      URL Website
                    </Text>
                    <Input
                      type="url"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder="https://example.com"
                    />
                  </Box>

                  <HStack>
                    <Checkbox
                      isChecked={usePuppeteer}
                      onChange={(e) => setUsePuppeteer(e.target.checked)}
                    />
                    <Text fontSize="sm">
                      Sử dụng Puppeteer (cho SPA websites)
                    </Text>
                  </HStack>

                  <Button
                    onClick={handleScrape}
                    isDisabled={isLoading || !url.trim()}
                    isLoading={isLoading}
                    loadingText="Đang scrape..."
                    colorScheme="blue"
                    width="full"
                  >
                    Scrape Website
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Scrape History */}
            <Card w="full">
              <CardBody>
                <HStack justify="space-between" mb={4}>
                  <Heading size="lg">
                    Lịch sử Scrape ({scrapeHistory.length})
                  </Heading>
                  {scrapeHistory.length > 0 && (
                    <Button
                      onClick={clearHistory}
                      variant="outline"
                      size="sm"
                    >
                      Xóa tất cả
                    </Button>
                  )}
                </HStack>

                {scrapeHistory.length === 0 ? (
                  <Text color="gray.500" textAlign="center" py={8}>
                    Chưa có dữ liệu scrape nào
                  </Text>
                ) : (
                  <VStack spacing={4} maxH="96" overflowY="auto">
                    {scrapeHistory.map((item, index) => (
                      <Box key={index} border="1px" borderColor="gray.200" borderRadius="lg" p={4} bg="white" w="full">
                        <HStack justify="space-between" align="start" mb={2}>
                          <Heading size="md" isTruncated flex={1} mr={2}>
                            {item.title}
                          </Heading>
                          <HStack spacing={2}>
                            <Button
                              onClick={() => handleViewDetail(item)}
                              variant="outline"
                              size="sm"
                              colorScheme="blue"
                            >
                              Chi tiết
                            </Button>
                            <Button
                              onClick={() => removeItem(index)}
                              variant="outline"
                              size="sm"
                              colorScheme="red"
                            >
                              Xóa
                            </Button>
                          </HStack>
                        </HStack>
                        
                        <Text fontSize="sm" color="gray.600" mb={2}>
                          {item.description || 'Không có mô tả'}
                        </Text>
                        
                        <VStack spacing={1} align="start" fontSize="xs" color="gray.500">
                          <Text><Text as="span" fontWeight="bold">URL:</Text> {item.url}</Text>
                          <Text><Text as="span" fontWeight="bold">Nội dung:</Text> {item.content.replace(/\s+/g, ' ').replace(/\n+/g, ' ').trim().substring(0, 100)}...</Text>
                          <Text><Text as="span" fontWeight="bold">Hình ảnh:</Text> {item.images?.length || 0} ảnh</Text>
                          <Text><Text as="span" fontWeight="bold">Thời gian:</Text> {item.scrapedAt ? formatDate(item.scrapedAt) : 'N/A'}</Text>
                        </VStack>
                      </Box>
                    ))}
                  </VStack>
                )}
              </CardBody>
            </Card>
          </VStack>

          {/* Export Excel */}
          <Box flex={1} position="sticky" top={8}>
            <ExportScrapeExcel 
              data={scrapeHistory}
            />
          </Box>
        </HStack>
        
        {/* Content Detail Modal */}
        <ContentDetailModal
          isOpen={isOpen}
          onClose={onClose}
          data={selectedItem}
          onSave={handleSaveEditedContent}
        />
      </VStack>
    </Container>
  );
};

export default ScrapeExcelPage;