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
  Checkbox,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Icon,
  Divider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure
} from '@chakra-ui/react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from 'react-icons/fa';
import axios from 'axios';
import { usePageChannels } from '@share/hooks/channel.hooks';
import { ChannelType } from '@generated/graphql/query';

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

interface SocialPlatform {
  id: string;
  name: string;
  icon: any;
  color: string;
  maxLength: number;
  enabled: boolean;
  customMessage?: string;
  connectedPages?: ConnectedPage[];
}

interface ConnectedPage {
  id: string;
  name: string;
  pageChannelId: string;
  token: string;
}

interface SocialMediaPublisherProps {
  rewrittenData: RewrittenData;
  onPublishComplete?: (results: PublishResult[]) => void;
}

interface PublishResult {
  platform: string;
  success: boolean;
  message?: string;
  postId?: string;
  error?: string;
}

const SocialMediaPublisher: React.FC<SocialMediaPublisherProps> = ({ 
  rewrittenData, 
  onPublishComplete 
}) => {
  const [platforms, setPlatforms] = useState<SocialPlatform[]>([
    {
      id: 'facebook',
      name: 'Facebook',
      icon: FaFacebook,
      color: 'blue.600',
      maxLength: 63206,
      enabled: false
    },
    {
      id: 'twitter',
      name: 'Twitter/X',
      icon: FaTwitter,
      color: 'blue.400',
      maxLength: 280,
      enabled: false
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      icon: FaLinkedin,
      color: 'blue.700',
      maxLength: 3000,
      enabled: false
    },
    {
      id: 'instagram',
      name: 'Instagram',
      icon: FaInstagram,
      color: 'pink.500',
      maxLength: 2200,
      enabled: false
    }
  ]);

  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResults, setPublishResults] = useState<PublishResult[]>([]);
  const [globalMessage, setGlobalMessage] = useState('');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  // Fetch Facebook pages
  const { data: pageChannelsData, isLoading: isLoadingPages } = usePageChannels({
    type: ChannelType.Facebook,
    isActive: true,
    isAll: true
  });

  React.useEffect(() => {
    // Initialize global message with rewritten content
    const initialMessage = `${rewrittenData.rewrittenTitle}\n\n${rewrittenData.rewrittenContent}`;
    setGlobalMessage(initialMessage);
    
    // Set custom messages for each platform
    setPlatforms(prev => prev.map(platform => ({
      ...platform,
      customMessage: truncateForPlatform(initialMessage, platform.maxLength)
    })));
  }, [rewrittenData]);

  // Update Facebook connected pages when pageChannelsData changes
  React.useEffect(() => {
    if (pageChannelsData?.pageChannels?.data) {
      const facebookPages = pageChannelsData.pageChannels.data
        .filter(page => page.type === ChannelType.Facebook)
        .map(page => ({
          id: page.id,
          name: page.name,
          pageChannelId: page.pageChannelId,
          token: page.token || ''
        }));

      setPlatforms(prev => prev.map(platform => 
        platform.id === 'facebook' 
          ? { ...platform, connectedPages: facebookPages }
          : platform
      ));
    }
  }, [pageChannelsData]);

  const truncateForPlatform = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength - 3) + '...';
  };

  const handlePlatformToggle = (platformId: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, enabled: !platform.enabled }
        : platform
    ));
  };

  const handleCustomMessageChange = (platformId: string, message: string) => {
    setPlatforms(prev => prev.map(platform => 
      platform.id === platformId 
        ? { ...platform, customMessage: message }
        : platform
    ));
  };

  const handleGlobalMessageChange = (message: string) => {
    setGlobalMessage(message);
    // Update all platform messages
    setPlatforms(prev => prev.map(platform => ({
      ...platform,
      customMessage: truncateForPlatform(message, platform.maxLength)
    })));
  };

  const handlePublish = async () => {
    const enabledPlatforms = platforms.filter(p => p.enabled);
    
    if (enabledPlatforms.length === 0) {
      toast({
        title: 'Lỗi',
        description: 'Vui lòng chọn ít nhất một nền tảng để đăng',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setIsPublishing(true);
    setPublishResults([]);

    const results: PublishResult[] = [];

    for (const platform of enabledPlatforms) {
      try {
        // Simulate API call to social media platform
        const result = await publishToPlatform(platform);
        results.push(result);
        
        toast({
          title: `${platform.name}`,
          description: result.success ? 'Đăng thành công!' : `Lỗi: ${result.error}`,
          status: result.success ? 'success' : 'error',
          duration: 3000,
          isClosable: true,
        });
      } catch (error: any) {
        const errorResult: PublishResult = {
          platform: platform.name,
          success: false,
          error: error.message || 'Unknown error'
        };
        results.push(errorResult);
        
        toast({
          title: `${platform.name}`,
          description: `Lỗi: ${error.message}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      }
    }

    setPublishResults(results);
    setIsPublishing(false);
    onPublishComplete?.(results);
  };

  const publishToPlatform = async (platform: SocialPlatform): Promise<PublishResult> => {
    try {
      const message = platform.customMessage || globalMessage;
      
      if (platform.id === 'facebook') {
        // For Facebook, we need to check connected pages
        if (!platform.connectedPages || platform.connectedPages.length === 0) {
          return {
            platform: platform.name,
            success: false,
            error: 'Không có trang Facebook nào được kết nối. Vui lòng kết nối trang Facebook trước.'
          };
        }

        // Post to all connected pages
        const results = [];
        let successCount = 0;
        let errorMessages = [];
        
        for (const page of platform.connectedPages) {
          try {
            if (!page.token) {
              errorMessages.push(`Trang "${page.name}": Token truy cập không hợp lệ`);
              continue;
            }

            // Call our API endpoint for each page
            const response = await axios.post('/api/social-media-post', {
              platform: 'facebook',
              message: message,
              pageId: page.pageChannelId,
              accessToken: page.token
            });

            if (response.data.success) {
              successCount++;
              results.push(`Trang "${page.name}": Đăng thành công`);
            } else {
              errorMessages.push(`Trang "${page.name}": ${response.data.error}`);
            }
          } catch (error) {
            errorMessages.push(`Trang "${page.name}": Lỗi kết nối API`);
          }
        }

        if (successCount > 0) {
          return {
            platform: platform.name,
            success: true,
            message: `Đăng thành công lên ${successCount}/${platform.connectedPages.length} trang. ${results.join(', ')}${errorMessages.length > 0 ? '. Lỗi: ' + errorMessages.join(', ') : ''}`
          };
        } else {
          return {
            platform: platform.name,
            success: false,
            error: `Không thể đăng lên trang nào. ${errorMessages.join(', ')}`
          };
        }
      }
      
      // For other platforms, return not implemented for now
      return {
        platform: platform.name,
        success: false,
        error: `Đăng bài lên ${platform.name} chưa được hỗ trợ`
      };
      
    } catch (error: any) {
      console.error(`Error posting to ${platform.name}:`, error);
      
      // Handle axios errors
      if (error.response?.data?.error) {
        return {
          platform: platform.name,
          success: false,
          error: error.response.data.error
        };
      }
      
      return {
        platform: platform.name,
        success: false,
        error: error.message || 'Đã xảy ra lỗi không xác định'
      };
    }
  };

  const enabledPlatformsCount = platforms.filter(p => p.enabled).length;

  return (
    <Box p={6} maxW="4xl" mx="auto">
      <VStack spacing={6} align="stretch">
        <Card>
          <CardHeader>
            <Heading size="md">Social Media Publisher</Heading>
            <Text color="gray.600" mt={2}>
              Đăng nội dung lên các nền tảng mạng xã hội
            </Text>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Box>
                  <AlertTitle>Lưu ý!</AlertTitle>
                  <AlertDescription>
                    Đây là phiên bản demo. Trong thực tế, bạn cần cấu hình API keys và tokens cho từng nền tảng.
                  </AlertDescription>
                </Box>
              </Alert>

              <FormControl>
                <FormLabel>Nội dung chung (sẽ được điều chỉnh cho từng nền tảng)</FormLabel>
                <Textarea
                  value={globalMessage}
                  onChange={(e) => handleGlobalMessageChange(e.target.value)}
                  minH="150px"
                  placeholder="Nhập nội dung để đăng..."
                />
                <Text fontSize="sm" color="gray.600" mt={1}>
                  {globalMessage.length} ký tự
                </Text>
              </FormControl>

              <Box>
                <Text fontWeight="bold" mb={4}>Chọn nền tảng để đăng:</Text>
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {platforms.map((platform) => (
                    <Card key={platform.id} variant={platform.enabled ? 'filled' : 'outline'}>
                      <CardBody>
                        <VStack spacing={3} align="stretch">
                          <HStack justify="space-between">
                            <HStack>
                              <Icon as={platform.icon} color={platform.color} boxSize={6} />
                              <VStack align="start" spacing={0}>
                                <Text fontWeight="bold">{platform.name}</Text>
                                <Text fontSize="sm" color="gray.600">
                                  Tối đa {platform.maxLength.toLocaleString()} ký tự
                                </Text>
                                {platform.id === 'facebook' && (
                                  <Text fontSize="xs" color={platform.connectedPages && platform.connectedPages.length > 0 ? 'green.600' : 'red.500'}>
                                    {platform.connectedPages && platform.connectedPages.length > 0 
                                      ? `${platform.connectedPages.length} trang đã kết nối` 
                                      : 'Chưa kết nối trang nào'
                                    }
                                  </Text>
                                )}
                              </VStack>
                            </HStack>
                            <Checkbox
                              isChecked={platform.enabled}
                              onChange={() => handlePlatformToggle(platform.id)}
                              colorScheme="blue"
                              isDisabled={platform.id === 'facebook' && (!platform.connectedPages || platform.connectedPages.length === 0)}
                            />
                          </HStack>
                          
                          {platform.enabled && (
                            <Box>
                              {platform.id === 'facebook' && platform.connectedPages && platform.connectedPages.length > 0 && (
                                <Box mb={3}>
                                  <Text fontSize="sm" fontWeight="medium" mb={2}>
                                    Trang Facebook sẽ đăng:
                                  </Text>
                                  <VStack spacing={1} align="stretch">
                                    {platform.connectedPages.map((page) => (
                                      <HStack key={page.id} p={2} bg="blue.50" borderRadius="md">
                                        <Badge colorScheme="blue" size="sm">FB</Badge>
                                        <Text fontSize="sm" fontWeight="medium">{page.name}</Text>
                                      </HStack>
                                    ))}
                                  </VStack>
                                </Box>
                              )}
                              
                              <Text fontSize="sm" fontWeight="medium" mb={2}>
                                Nội dung cho {platform.name}:
                              </Text>
                              <Textarea
                                value={platform.customMessage || ''}
                                onChange={(e) => handleCustomMessageChange(platform.id, e.target.value)}
                                size="sm"
                                rows={3}
                                maxLength={platform.maxLength}
                              />
                              <Text fontSize="xs" color="gray.600" mt={1}>
                                {(platform.customMessage || '').length} / {platform.maxLength} ký tự
                              </Text>
                            </Box>
                          )}
                        </VStack>
                      </CardBody>
                    </Card>
                  ))}
                </SimpleGrid>
              </Box>

              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Lên lịch đăng (tùy chọn)</FormLabel>
                  <HStack>
                    <Input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                    />
                    <Input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                    />
                  </HStack>
                </FormControl>
              </HStack>

              <Divider />

              <HStack spacing={4}>
                <Button
                  colorScheme="blue"
                  size="lg"
                  onClick={handlePublish}
                  isLoading={isPublishing}
                  loadingText="Đang đăng..."
                  disabled={enabledPlatformsCount === 0}
                  flex={1}
                >
                  Đăng lên {enabledPlatformsCount} nền tảng
                </Button>
                <Button
                  variant="outline"
                  onClick={onOpen}
                  disabled={publishResults.length === 0}
                >
                  Xem kết quả
                </Button>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {isPublishing && (
          <Card>
            <CardBody>
              <VStack spacing={4}>
                <Spinner size="lg" color="blue.500" />
                <Text>Đang đăng lên các nền tảng mạng xã hội...</Text>
                <Text fontSize="sm" color="gray.600">
                  Đang xử lý {enabledPlatformsCount} nền tảng
                </Text>
              </VStack>
            </CardBody>
          </Card>
        )}
      </VStack>

      {/* Results Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="lg">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Kết quả đăng bài</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4} align="stretch">
              {publishResults.map((result, index) => (
                <Card key={index} variant={result.success ? 'subtle' : 'outline'}>
                  <CardBody>
                    <HStack justify="space-between">
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
                  </CardBody>
                </Card>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Đóng</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default SocialMediaPublisher;