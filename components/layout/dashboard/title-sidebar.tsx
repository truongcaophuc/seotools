import { Box, Text } from '@chakra-ui/react';
import { useDashboardStore } from './dashboard.store';

interface Props {
    title: string;
}

export function TitleSidebar({ title }: Props) {
    const isOpen = useDashboardStore((state) => state.isOpen);

    if (!isOpen) return null;

    return (
        <Box px="4">
            <Text fontSize="xs" color="gray.400" fontWeight="medium">
                {title}
            </Text>
        </Box>
    );
}
