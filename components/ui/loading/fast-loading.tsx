import { Box, Spinner, Text, VStack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';

interface FastLoadingProps {
    message?: string;
    showProgressText?: boolean;
    timeout?: number;
}

export function FastLoading({ 
    message = 'Đang tải...', 
    showProgressText = true,
    timeout = 10000 
}: FastLoadingProps) {
    const [progress, setProgress] = useState(0);
    const [timeoutReached, setTimeoutReached] = useState(false);

    useEffect(() => {
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 90) return prev;
                return prev + Math.random() * 10;
            });
        }, 200);

        const timeoutTimer = setTimeout(() => {
            setTimeoutReached(true);
        }, timeout);

        return () => {
            clearInterval(interval);
            clearTimeout(timeoutTimer);
        };
    }, [timeout]);

    if (timeoutReached) {
        return (
            <Box 
                position="fixed" 
                top="0" 
                left="0" 
                right="0" 
                bottom="0" 
                bg="white" 
                zIndex="9999"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <VStack spacing={4}>
                    <Spinner size="xl" color="blue.500" thickness="4px" />
                    <Text color="red.500" fontWeight="medium">
                        Trang đang tải chậm hơn bình thường...
                    </Text>
                    <Text fontSize="sm" color="gray.600" textAlign="center">
                        Vui lòng kiểm tra kết nối mạng hoặc thử tải lại trang
                    </Text>
                </VStack>
            </Box>
        );
    }

    return (
        <Box 
            position="fixed" 
            top="0" 
            left="0" 
            right="0" 
            bottom="0" 
            bg="white" 
            zIndex="9999"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <VStack spacing={4}>
                <Spinner size="xl" color="blue.500" thickness="4px" />
                <Text fontWeight="medium">{message}</Text>
                {showProgressText && (
                    <Text fontSize="sm" color="gray.600">
                        {Math.round(progress)}% hoàn thành
                    </Text>
                )}
            </VStack>
        </Box>
    );
}

export default FastLoading;