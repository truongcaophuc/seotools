"use client";

import React, { useState } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Text,
  Textarea,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Badge,
  useToast,
  Spinner,
  Select,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Divider,
  Input
} from '@chakra-ui/react';
import axios from 'axios';

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

interface ContentRewriterProps {
  scrapedData: ScrapedData;
  onContentRewritten?: (data: RewrittenData) => void;
}

const ContentRewriter: React.FC<ContentRewriterProps> = ({ scrapedData, onContentRewritten }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [rewrittenData, setRewrittenData] = useState<RewrittenData | null>(null);
  const [tone, setTone] = useState<'professional' | 'casual' | 'engaging' | 'informative'>('professional');
  const [length, setLength] = useState<'shorter' | 'same' | 'longer'>('same');
  const [language, setLanguage] = useState<'vi' | 'en'>('vi');
  const [customPrompt, setCustomPrompt] = useState('');
  const [isApproved, setIsApproved] = useState(false);
  const [editedContent, setEditedContent] = useState('');
  const [editedTitle, setEditedTitle] = useState('');
  const toast = useToast();

  const handleRewrite = async () => {
    setIsLoading(true);
    setRewrittenData(null);
    setIsApproved(false);

    try {
      const response = await axios.post('/api/rewrite-content', {
        content: scrapedData.content,
        title: scrapedData.title,
        tone,
        length,
        language,
        customPrompt: customPrompt.trim() || undefined
      });

      if (response.data.success) {
        const data = response.data.data;
        setRewrittenData(data);
        setEditedContent(data.rewrittenContent);
        setEditedTitle(data.rewrittenTitle);
        toast({
          title: 'Thành công',
          description: 'Đã viết lại nội dung thành công',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      } else {
        throw new Error(response.data.error || 'Rewriting failed');
      }
    } catch (error: any) {
      console.error('Rewriting error:', error);
      toast({
        title: 'Lỗi',
        description: error.response?.data?.error || 'Không thể viết lại nội dung',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = () => {
    if (rewrittenData) {
      const finalData = {
        ...rewrittenData,
        rewrittenContent: editedContent,
        rewrittenTitle: editedTitle
      };
      setIsApproved(true);
      onContentRewritten?.(finalData);
      toast({
        title: 'Đã duyệt',
        description: 'Nội dung đã được duyệt và sẵn sàng để đăng',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const toneOptions = [
    { value: 'professional', label: 'Chuyên nghiệp' },
    { value: 'casual', label: 'Thân thiện' },
    { value: 'engaging', label: 'Hấp dẫn' },
    { value: 'informative', label: 'Thông tin' }
  ];

  const lengthOptions = [
    { value: 'shorter', label: 'Ngắn gọn hơn' },
    { value: 'same', label: 'Độ dài tương tự' },
    { value: 'longer', label: 'Chi tiết hơn' }
  ];

  const languageOptions = [
    { value: 'vi', label: 'Tiếng Việt' },
    { value: 'en', label: 'English' }
  ];

  return (
    <Box p={6} maxW="6xl" mx="auto">
      <VStack spacing={6} align="stretch">
        <Card>
          <CardHeader>
            <Heading size="md">AI Content Rewriter</Heading>
            <Text color="gray.600" mt={2}>
              Sử dụng ChatGPT để viết lại nội dung đã scrape
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Phong cách</FormLabel>
                  <Select value={tone} onChange={(e) => setTone(e.target.value as any)}>
                    {toneOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Độ dài</FormLabel>
                  <Select value={length} onChange={(e) => setLength(e.target.value as any)}>
                    {lengthOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                
                <FormControl>
                  <FormLabel>Ngôn ngữ</FormLabel>
                  <Select value={language} onChange={(e) => setLanguage(e.target.value as any)}>
                    {languageOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </HStack>
              
              <FormControl>
                <FormLabel>Prompt tùy chỉnh (tùy chọn)</FormLabel>
                <Textarea
                  placeholder="Nhập yêu cầu đặc biệt cho việc viết lại..."
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  rows={3}
                />
              </FormControl>
              
              <Button
                colorScheme="purple"
                onClick={handleRewrite}
                isLoading={isLoading}
                loadingText="Đang viết lại..."
                size="lg"
              >
                Viết lại với AI
              </Button>
            </VStack>
          </CardBody>
        </Card>

        {isLoading && (
          <Card>
            <CardBody>
              <VStack spacing={4}>
                <Spinner size="lg" color="purple.500" />
                <Text>Đang sử dụng ChatGPT để viết lại nội dung...</Text>
                <Text fontSize="sm" color="gray.600">
                  Phong cách: {toneOptions.find(t => t.value === tone)?.label} | 
                  Độ dài: {lengthOptions.find(l => l.value === length)?.label} | 
                  Ngôn ngữ: {languageOptions.find(l => l.value === language)?.label}
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}

        {rewrittenData && (
          <Card>
            <CardHeader>
              <HStack justify="space-between" align="center">
                <Heading size="md">Kết quả viết lại</Heading>
                <Badge colorScheme={isApproved ? 'green' : 'purple'}>
                  {isApproved ? 'Đã duyệt' : 'Chờ duyệt'}
                </Badge>
              </HStack>
            </CardHeader>
            <CardBody>
              <VStack spacing={6} align="stretch">
                <StatGroup>
                  <Stat>
                    <StatLabel>Từ gốc</StatLabel>
                    <StatNumber>{rewrittenData.wordCount.original}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Từ mới</StatLabel>
                    <StatNumber>{editedContent.split(/\s+/).length}</StatNumber>
                  </Stat>
                  <Stat>
                    <StatLabel>Thay đổi</StatLabel>
                    <StatNumber color={editedContent.split(/\s+/).length > rewrittenData.wordCount.original ? 'green.500' : 'red.500'}>
                      {editedContent.split(/\s+/).length > rewrittenData.wordCount.original ? '+' : ''}
                      {editedContent.split(/\s+/).length - rewrittenData.wordCount.original}
                    </StatNumber>
                  </Stat>
                </StatGroup>

                <Tabs variant="enclosed">
                  <TabList>
                    <Tab>So sánh</Tab>
                    <Tab>Chỉnh sửa</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <Box>
                          <Text fontWeight="bold" mb={2} color="gray.600">Tiêu đề gốc:</Text>
                          <Text bg="gray.50" p={3} borderRadius="md">
                            {rewrittenData.title}
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" mb={2} color="purple.600">Tiêu đề mới:</Text>
                          <Text bg="purple.50" p={3} borderRadius="md">
                            {editedTitle}
                          </Text>
                        </Box>
                        
                        <Divider />
                        
                        <Box>
                          <Text fontWeight="bold" mb={2} color="gray.600">Nội dung gốc:</Text>
                          <Textarea
                            value={rewrittenData.originalContent}
                            readOnly
                            minH="200px"
                            bg="gray.50"
                          />
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" mb={2} color="purple.600">Nội dung đã viết lại:</Text>
                          <Textarea
                            value={editedContent}
                            readOnly
                            minH="200px"
                            bg="purple.50"
                          />
                        </Box>
                      </VStack>
                    </TabPanel>
                    
                    <TabPanel>
                      <VStack spacing={4} align="stretch">
                        <FormControl>
                          <FormLabel>Chỉnh sửa tiêu đề:</FormLabel>
                          <Input
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                          />
                        </FormControl>
                        
                        <FormControl>
                          <FormLabel>Chỉnh sửa nội dung:</FormLabel>
                          <Textarea
                            value={editedContent}
                            onChange={(e) => setEditedContent(e.target.value)}
                            minH="300px"
                          />
                          <Text fontSize="sm" color="gray.600" mt={1}>
                            {editedContent.split(/\s+/).length} từ
                          </Text>
                        </FormControl>
                      </VStack>
                    </TabPanel>
                  </TabPanels>
                </Tabs>

                <Divider />

                {!isApproved && (
                  <HStack spacing={4}>
                    <Button
                      colorScheme="green"
                      size="lg"
                      onClick={handleApprove}
                      flex={1}
                    >
                      Duyệt nội dung này
                    </Button>
                    <Button
                      colorScheme="purple"
                      variant="outline"
                      onClick={handleRewrite}
                      isLoading={isLoading}
                    >
                      Viết lại khác
                    </Button>
                  </HStack>
                )}

                {isApproved && (
                  <Text color="green.600" fontWeight="bold" textAlign="center">
                    ✓ Nội dung đã được duyệt và sẵn sàng để đăng lên mạng xã hội
                  </Text>
                )}
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>
    </Box>
  );
};

export default ContentRewriter;