"use client";

import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  HStack,
  Text,
  Textarea,
  Input,
  Box,
  Badge,
  Image,
  SimpleGrid,
  Divider,
  useToast,
  FormControl,
  FormLabel,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel
} from '@chakra-ui/react';

interface ScrapedData {
  title: string;
  content: string;
  description?: string;
  url: string;
  images?: string[];
  publishDate?: string;
  scrapedAt?: string;
}

interface ContentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  data: ScrapedData | null;
  onSave?: (editedData: ScrapedData) => void;
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({
  isOpen,
  onClose,
  data,
  onSave
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<ScrapedData | null>(null);
  const toast = useToast();

  useEffect(() => {
    if (data) {
      setEditedData({ ...data });
    }
  }, [data]);

  const handleSave = () => {
    if (editedData && onSave) {
      onSave(editedData);
      setIsEditing(false);
      toast({
        title: 'Đã lưu',
        description: 'Nội dung đã được cập nhật thành công',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleCancel = () => {
    if (data) {
      setEditedData({ ...data });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString('vi-VN');
  };

  if (!data || !editedData) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="6xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxH="90vh">
        <ModalHeader>
          <HStack justify="space-between" align="center">
            <Text>Chi tiết nội dung đã scrape</Text>
            <Badge colorScheme="blue" fontSize="sm">
              {editedData.content.length} ký tự
            </Badge>
          </HStack>
        </ModalHeader>
        <ModalCloseButton />
        
        <ModalBody>
          <Tabs variant="enclosed">
            <TabList>
              <Tab>Nội dung chính</Tab>
              <Tab>Hình ảnh ({editedData.images?.length || 0})</Tab>
              <Tab>Thông tin khác</Tab>
            </TabList>

            <TabPanels>
              {/* Tab 1: Main Content */}
              <TabPanel>
                <VStack spacing={6} align="stretch">
                  <FormControl>
                    <FormLabel fontWeight="bold">Tiêu đề:</FormLabel>
                    {isEditing ? (
                      <Input
                        value={editedData.title}
                        onChange={(e) => setEditedData({
                          ...editedData,
                          title: e.target.value
                        })}
                        placeholder="Nhập tiêu đề..."
                      />
                    ) : (
                      <Box bg="gray.50" p={3} borderRadius="md">
                        <Text>{editedData.title}</Text>
                      </Box>
                    )}
                  </FormControl>

                  {editedData.description && (
                    <FormControl>
                      <FormLabel fontWeight="bold">Mô tả:</FormLabel>
                      {isEditing ? (
                        <Textarea
                          value={editedData.description}
                          onChange={(e) => setEditedData({
                            ...editedData,
                            description: e.target.value
                          })}
                          placeholder="Nhập mô tả..."
                          rows={3}
                        />
                      ) : (
                        <Box bg="gray.50" p={3} borderRadius="md">
                          <Text>{editedData.description}</Text>
                        </Box>
                      )}
                    </FormControl>
                  )}

                  <FormControl>
                    <FormLabel fontWeight="bold">Nội dung:</FormLabel>
                    {isEditing ? (
                      <Textarea
                        value={editedData.content}
                        onChange={(e) => setEditedData({
                          ...editedData,
                          content: e.target.value
                        })}
                        placeholder="Nhập nội dung..."
                        minH="400px"
                        resize="vertical"
                      />
                    ) : (
                      <Box>
                        <Textarea
                          value={editedData.content}
                          readOnly
                          minH="400px"
                          bg="gray.50"
                          resize="vertical"
                        />
                        <Text fontSize="sm" color="gray.600" mt={2}>
                          {editedData.content.length} ký tự
                        </Text>
                      </Box>
                    )}
                  </FormControl>
                </VStack>
              </TabPanel>

              {/* Tab 2: Images */}
              <TabPanel>
                {editedData.images && editedData.images.length > 0 ? (
                  <VStack spacing={4} align="stretch">
                    <Text fontWeight="bold">
                      Hình ảnh ({editedData.images.length}):
                    </Text>
                    <SimpleGrid columns={{ base: 2, md: 3, lg: 4 }} spacing={4}>
                      {editedData.images.map((img, index) => (
                        <Box key={index} borderRadius="md" overflow="hidden">
                          <Image
                            src={img}
                            alt={`Image ${index + 1}`}
                            w="100%"
                            h="150px"
                            objectFit="cover"
                            fallbackSrc="https://via.placeholder.com/150?text=No+Image"
                          />
                          <Text fontSize="xs" color="gray.600" p={2} bg="gray.50">
                            {index + 1}. {img.substring(0, 50)}...
                          </Text>
                        </Box>
                      ))}
                    </SimpleGrid>
                  </VStack>
                ) : (
                  <Text color="gray.500" textAlign="center" py={8}>
                    Không có hình ảnh nào
                  </Text>
                )}
              </TabPanel>

              {/* Tab 3: Other Info */}
              <TabPanel>
                <VStack spacing={4} align="stretch">
                  <Box>
                    <Text fontWeight="bold" mb={2}>URL nguồn:</Text>
                    <Box bg="gray.50" p={3} borderRadius="md">
                      <Text fontSize="sm" wordBreak="break-all">
                        {editedData.url}
                      </Text>
                    </Box>
                  </Box>

                  {editedData.publishDate && (
                    <Box>
                      <Text fontWeight="bold" mb={2}>Ngày đăng:</Text>
                      <Box bg="gray.50" p={3} borderRadius="md">
                        <Text>{formatDate(editedData.publishDate)}</Text>
                      </Box>
                    </Box>
                  )}

                  {editedData.scrapedAt && (
                    <Box>
                      <Text fontWeight="bold" mb={2}>Thời gian scrape:</Text>
                      <Box bg="gray.50" p={3} borderRadius="md">
                        <Text>{formatDate(editedData.scrapedAt)}</Text>
                      </Box>
                    </Box>
                  )}

                  <Divider />

                  <Box>
                    <Text fontWeight="bold" mb={2}>Thống kê:</Text>
                    <SimpleGrid columns={2} spacing={4}>
                      <Box bg="blue.50" p={3} borderRadius="md" textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold" color="blue.600">
                          {editedData.content.length}
                        </Text>
                        <Text fontSize="sm" color="gray.600">Ký tự</Text>
                      </Box>
                      <Box bg="green.50" p={3} borderRadius="md" textAlign="center">
                        <Text fontSize="2xl" fontWeight="bold" color="green.600">
                          {editedData.content.split(/\s+/).filter(word => word.length > 0).length}
                        </Text>
                        <Text fontSize="sm" color="gray.600">Từ</Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <HStack spacing={3}>
            {isEditing ? (
              <>
                <Button variant="outline" onClick={handleCancel}>
                  Hủy
                </Button>
                <Button colorScheme="blue" onClick={handleSave}>
                  Lưu thay đổi
                </Button>
              </>
            ) : (
              <>
                <Button variant="outline" onClick={onClose}>
                  Đóng
                </Button>
                <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
                  Chỉnh sửa
                </Button>
              </>
            )}
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ContentDetailModal;