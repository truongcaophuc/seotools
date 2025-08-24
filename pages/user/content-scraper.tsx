"use client";

import React, { useState } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Heading,
  Card,
  CardBody,
  CardHeader,
  Badge,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Divider,
  Progress,
  Flex
} from '@chakra-ui/react';
import { NextPage } from 'next';
import { DashboardLayout } from '@components/layout/dashboard/dashboard.layout';
import ContentScraper from '@components/page/content/ContentScraper';
import ContentRewriter from '@components/page/content/ContentRewriter';
import SocialMediaPublisher from '@components/page/content/SocialMediaPublisher';

interface ScrapedData {
  title: string;
  content: string;
  description?: string;
  url: string;
  images?: string[];
  publishDate?: string;
}

interface RewrittenData {
  originalContent: string;
  rewrittenContent: string;
  title: string;
  rewrittenTitle: string;
  wordCount: {
    original: number;
    rewritten: number;
  };
}

interface PublishResult {
  platform: string;
  success: boolean;
  message?: string;
  postId?: string;
  error?: string;
}

const steps = [
  {
    title: 'Scrape Content',
    description: 'Lấy nội dung từ website'
  },
  {
    title: 'Review Content',
    description: 'Duyệt nội dung đã scrape'
  },
  {
    title: 'AI Rewrite',
    description: 'Viết lại với ChatGPT'
  },
  {
    title: 'Review Rewrite',
    description: 'Duyệt nội dung đã viết lại'
  },
  {
    title: 'Publish',
    description: 'Đăng lên mạng xã hội'
  }
];

const ContentScraperPage: NextPage = () => {
  const [scrapedData, setScrapedData] = useState<ScrapedData | null>(null);
  const [rewrittenData, setRewrittenData] = useState<RewrittenData | null>(null);
  const [publishResults, setPublishResults] = useState<PublishResult[]>([]);
  const [isContentApproved, setIsContentApproved] = useState(false);
  const [isRewriteApproved, setIsRewriteApproved] = useState(false);
  
  const [activeStep, setActiveStep] = useState(0);

  const handleContentScraped = (data: ScrapedData) => {
    setScrapedData(data);
    setIsContentApproved(true);
    setActiveStep(2); // Move to AI Rewrite step
  };

  const handleContentRewritten = (data: RewrittenData) => {
    setRewrittenData(data);
    setIsRewriteApproved(true);
    setActiveStep(4); // Move to Publish step
  };

  const handlePublishComplete = (results: PublishResult[]) => {
    setPublishResults(results);
    // Stay on publish step to show results
  };

  const handleReset = () => {
    setScrapedData(null);
    setRewrittenData(null);
    setPublishResults([]);
    setIsContentApproved(false);
    setIsRewriteApproved(false);
    setActiveStep(0);
  };



  return (
    <DashboardLayout
      title="Content Scraper & Social Publisher"
      type="customer"
      breadcrumb={[
        {
          label: 'Content Scraper',
          href: '/user/content-scraper'
        }
      ]}
    >
       <VStack spacing={8} align="stretch">
          {/* Header */}
          <Box textAlign="center">
            <Heading size="xl" mb={4}>
              Content Scraper & Social Publisher
            </Heading>
            <Text fontSize="lg" color="gray.600" maxW="2xl" mx="auto">
              Scrape nội dung từ website, sử dụng AI để viết lại, và đăng lên các nền tảng mạng xã hội
            </Text>
          </Box>

          {/* Process Progress */}
          <Card>
            <CardHeader>
              <Heading size="md">Quy trình xử lý</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4}>
                <Progress 
                  value={(activeStep / (steps.length - 1)) * 100} 
                  size="lg" 
                  colorScheme="blue" 
                  w="100%"
                />
                
                <Flex justify="space-between" w="100%" flexWrap="wrap">
                  {steps.map((step, index) => (
                    <VStack key={index} spacing={1} align="center" flex={1}>
                      <Box
                        w={8}
                        h={8}
                        borderRadius="full"
                        bg={index <= activeStep ? 'blue.500' : 'gray.300'}
                        color="white"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        fontSize="sm"
                        fontWeight="bold"
                      >
                        {index + 1}
                      </Box>
                      <Text fontSize="sm" fontWeight="bold" textAlign="center">
                        {step.title}
                      </Text>
                      <Text fontSize="xs" color="gray.600" textAlign="center">
                        {step.description}
                      </Text>
                    </VStack>
                  ))}
                </Flex>
                
                <HStack mt={4} justify="center">
                  <Button
                    variant="outline"
                    onClick={handleReset}
                    disabled={activeStep === 0 && !scrapedData}
                  >
                    Bắt đầu lại
                  </Button>
                </HStack>
              </VStack>
            </CardBody>
          </Card>

          {/* Step 1: Content Scraper */}
          {activeStep >= 0 && (
            <Box>
              <ContentScraper onContentScraped={handleContentScraped} />
            </Box>
          )}

          {/* Step 2: AI Rewriter */}
          {activeStep >= 2 && scrapedData && isContentApproved && (
            <Box>
              <Alert status="success" mb={6}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Nội dung đã được duyệt!</AlertTitle>
                  <AlertDescription>
                    Bây giờ bạn có thể sử dụng AI để viết lại nội dung.
                  </AlertDescription>
                </Box>
              </Alert>
              <ContentRewriter 
                scrapedData={scrapedData} 
                onContentRewritten={handleContentRewritten} 
              />
            </Box>
          )}

          {/* Step 3: Social Media Publisher */}
          {activeStep >= 4 && rewrittenData && isRewriteApproved && (
            <Box>
              <Alert status="success" mb={6}>
                <AlertIcon />
                <Box>
                  <AlertTitle>Nội dung AI đã được duyệt!</AlertTitle>
                  <AlertDescription>
                    Bây giờ bạn có thể đăng nội dung lên các nền tảng mạng xã hội.
                  </AlertDescription>
                </Box>
              </Alert>
              <SocialMediaPublisher 
                rewrittenData={rewrittenData} 
                onPublishComplete={handlePublishComplete} 
              />
            </Box>
          )}

          {/* Publish Results */}
          {publishResults.length > 0 && (
            <Card>
              <CardHeader>
                <Heading size="md">Kết quả đăng bài</Heading>
              </CardHeader>
              <CardBody>
                <VStack spacing={4} align="stretch">
                  {publishResults.map((result, index) => (
                    <HStack key={index} justify="space-between" p={4} bg="gray.50" borderRadius="md">
                      <VStack align="start" spacing={1}>
                        <Text fontWeight="bold">{result.platform}</Text>
                        <Text fontSize="sm" color="gray.600">
                          {result.success ? result.message : result.error}
                        </Text>
                        {result.postId && (
                          <Text fontSize="xs" color="gray.500">
                            ID: {result.postId}
                          </Text>
                        )}
                      </VStack>
                      <Badge colorScheme={result.success ? 'green' : 'red'}>
                        {result.success ? 'Thành công' : 'Thất bại'}
                      </Badge>
                    </HStack>
                  ))}
                  
                  <Divider />
                  
                  <Alert status="info">
                    <AlertIcon />
                    <Box>
                      <AlertTitle>Hoàn thành!</AlertTitle>
                      <AlertDescription>
                        Quy trình scraping và đăng bài đã hoàn tất. Bạn có thể bắt đầu lại với URL mới.
                      </AlertDescription>
                    </Box>
                  </Alert>
                </VStack>
              </CardBody>
            </Card>
          )}

          {/* Instructions */}
          <Card variant="outline">
            <CardHeader>
              <Heading size="md">Hướng dẫn sử dụng</Heading>
            </CardHeader>
            <CardBody>
              <VStack spacing={4} align="stretch">
                <Box>
                  <Text fontWeight="bold" mb={2}>1. Scrape Content</Text>
                  <Text color="gray.600">
                    Nhập URL của trang web bạn muốn scrape. Hệ thống hỗ trợ cả website tĩnh và SPA (Single Page Application).
                  </Text>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>2. Review Content</Text>
                  <Text color="gray.600">
                    Kiểm tra và duyệt nội dung đã được scrape. Bạn có thể xem tiêu đề, nội dung, hình ảnh và thông tin khác.
                  </Text>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>3. AI Rewrite</Text>
                  <Text color="gray.600">
                    Sử dụng ChatGPT để viết lại nội dung với các tùy chọn phong cách, độ dài và ngôn ngữ khác nhau.
                  </Text>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>4. Review Rewrite</Text>
                  <Text color="gray.600">
                    Kiểm tra và chỉnh sửa nội dung đã được AI viết lại trước khi đăng.
                  </Text>
                </Box>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>5. Publish</Text>
                  <Text color="gray.600">
                    Chọn các nền tảng mạng xã hội và đăng nội dung. Hỗ trợ Facebook, Twitter, LinkedIn và Instagram.
                  </Text>
                </Box>
              </VStack>
            </CardBody>
          </Card>
      </VStack>
    </DashboardLayout>
  );
};

export default ContentScraperPage;