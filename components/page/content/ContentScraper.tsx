"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  Input,
  VStack,
  HStack,
  Text,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Badge,
  Image,
  SimpleGrid,
  useToast,
  Spinner,
  Switch,
  FormControl,
  FormLabel,
  Divider,
  useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import ContentDetailModal from './ContentDetailModal';

interface ScrapedData {
  title: string;
  content: string;
  description?: string;
  url: string;
  images?: string[];
  publishDate?: string;
}

interface ContentScraperProps {
  onContentScraped?: (data: ScrapedData) => void;
}

const ContentScraper: React.FC<ContentScraperProps> = ({ onContentScraped }) => {
  const [url, setUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [usePuppeteer, setUsePuppeteer] = useState(false);
  const [isApproved, setIsApproved] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

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

    // Validate URL
    try {
      new URL(url);
    } catch {
      toast({
        title: 'Lỗi',
        description: 'URL không hợp lệ',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsLoading(true);
    setScrapedData(null);
    setIsApproved(false);

    try {
      const response = await axios.post('/api/scrape', {
        url: url.trim(),
        usePuppeteer
      });

      if (response.data.success) {
        setScrapedData(response.data.data);
        toast({
          title: 'Thành công',
          description: 'Đã scrape nội dung thành công',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.data.error || 'Scraping failed');
      }
    } catch (error: any) {
      console.error('Scraping error:', error);
      toast({
        title: 'Lỗi',
        description: error.response?.data?.error || 'Không thể scrape nội dung từ URL này',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = () => {
    if (scrapedData) {
      setIsApproved(true);
      onContentScraped?.(scrapedData);
      toast({
        title: 'Đã duyệt',
        description: 'Nội dung đã được duyệt và sẵn sàng để xử lý tiếp',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleReset = () => {
    setUrl('');
    setScrapedData(null);
    setIsApproved(false);
  };

  const handleSaveEditedContent = (editedData: ScrapedData) => {
    setScrapedData(editedData);
    // Reset approval status if content was edited
    setIsApproved(false);
  };

  return (
    <Box p={6} maxW="4xl" mx="auto">
      <VStack spacing={6} align="stretch">
        <Card>
          <CardHeader>
            <Heading size="md">Web Content Scraper</Heading>
            <Text color="gray.600" mt={2}>
              Nhập URL để scrape nội dung từ trang web
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <FormControl>
                <FormLabel>URL trang web</FormLabel>
                <Input
                  placeholder="https://example.com/article"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  disabled={isLoading}
                />
              </FormControl>
              
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="puppeteer-switch" mb="0">
                  Sử dụng Puppeteer (cho SPA)
                </FormLabel>
                <Switch
                  id="puppeteer-switch"
                  isChecked={usePuppeteer}
                  onChange={(e) => setUsePuppeteer(e.target.checked)}
                  disabled={isLoading}
                />
              </FormControl>
              
              <HStack>
                <Button
                  colorScheme="blue"
                  onClick={handleScrape}
                  isLoading={isLoading}
                  loadingText="Đang scrape..."
                  disabled={!url.trim()}
                  flex={1}
                >
                  Scrape Content
                </Button>
                <Button
                  variant="outline"
                  onClick={handleReset}
                  disabled={isLoading}
                >
                  Reset
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {isLoading && (
          <Card>
            <CardBody>
              <VStack spacing={4}>
                <Spinner size="lg" color="blue.500" />
                <Text>Đang scrape nội dung...</Text>
                <Text fontSize="sm" color="gray.600">
                  {usePuppeteer ? 'Sử dụng Puppeteer để xử lý SPA' : 'Sử dụng static scraping'}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {scrapedData && (
          <Card>
            <CardHeader>
              <HStack justify="space-between" align="center">
                <Heading size="md">Nội dung đã scrape</Heading>
                <Badge colorScheme={isApproved ? 'green' : 'yellow'}>
                  {isApproved ? 'Đã duyệt' : 'Chờ duyệt'}
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" mb={2}>Tiêu đề:</Text>
                  <Text bg="gray.50" p={3} borderRadius="md">
                    {scrapedData.title}
                  </Text>
                </Box>

                {scrapedData.description && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>Mô tả:</Text>
                    <Text bg="gray.50" p={3} borderRadius="md">
                      {scrapedData.description}
                    </Text>
                  </Box>
                )}

                <Box>
                  <Text fontWeight="bold" mb={2}>Nội dung:</Text>
                  <Textarea
                    value={scrapedData.content}
                    readOnly
                    minH="200px"
                    bg="gray.50"
                  />
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    {scrapedData.content.length} ký tự
                  </Text>
                </Box>

                {scrapedData.images && scrapedData.images.length > 0 && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>Hình ảnh ({scrapedData.images.length}):</Text>
                    <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                      {scrapedData.images.slice(0, 8).map((img, index) => (
                        <Image
                          key={index}
                          src={img}
                          alt={`Image ${index + 1}`}
                          borderRadius="md"
                          maxH="100px"
                          objectFit="cover"
                          fallbackSrc="https://via.placeholder.com/150?text=No+Image"
                        />
                      ))}
                    </SimpleGrid>
                  </Box>
                )}

                <Box>
                  <Text fontWeight="bold" mb={2}>URL nguồn:</Text>
                  <Text bg="gray.50" p={3} borderRadius="md" fontSize="sm">
                    {scrapedData.url}
                  </Text>
                </Box>

                {scrapedData.publishDate && (
                  <Box>
                    <Text fontWeight="bold" mb={2}>Ngày đăng:</Text>
                    <Text bg="gray.50" p={3} borderRadius="md">
                      {new Date(scrapedData.publishDate).toLocaleDateString('vi-VN')}
                    </Text>
                  </Box>
                )}

                <Divider />

                <HStack spacing={3} justify="center">
                  <Button
                    colorScheme="blue"
                    variant="outline"
                    onClick={onOpen}
                  >
                    Xem chi tiết
                  </Button>
                  
                  {!isApproved && (
                    <Button
                      colorScheme="green"
                      onClick={handleApprove}
                    >
                      Duyệt nội dung này
                    </Button>
                  )}
                </HStack>

                {isApproved && (
                  <Text color="green.600" fontWeight="bold" textAlign="center">
                    ✓ Nội dung đã được duyệt và sẵn sàng để xử lý tiếp
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}
        
        {/* Content Detail Modal */}
        <ContentDetailModal
          isOpen={isOpen}
          onClose={onClose}
          data={scrapedData}
          onSave={handleSaveEditedContent}
        />
      </VStack>
    </Box>
  );
};

export default ContentScraper;