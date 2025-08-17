import { Avatar, Center, Text, VStack } from '@chakra-ui/react';
import { InboxIcon } from '@heroicons/react/24/outline';
import { HeroIcon } from '../icon';

interface Props {
    content?: string;
}

export function Empty({ content = 'Không có dữ liệu' }: Props) {
    return (
        <Center
            px="4"
            py="16"
            bgColor="gray.50"
            rounded="md"
            borderWidth="1px"
            borderStyle="dashed"
        >
            <VStack spacing="3">
                <Avatar
                    bgColor="white"
                    rounded="md"
                    color="gray.500"
                    boxShadow="md"
                    icon={<HeroIcon as={InboxIcon} boxSize="7" />}
                />
                <Text fontWeight="medium" fontSize="sm" color="gray.400">
                    {content}
                </Text>
            </VStack>
        </Center>
    );
}
