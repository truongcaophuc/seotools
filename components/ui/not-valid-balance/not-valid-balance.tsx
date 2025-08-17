import { Avatar, Button, Text, VStack } from '@chakra-ui/react';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Heading } from '../heading';
import { HeroIcon } from '../icon';

export function NotValidBalance() {
    return (
        <VStack spacing="3" px="10" py="6">
            <Avatar
                bgColor="red.500"
                icon={<HeroIcon as={ExclamationTriangleIcon} />}
            />
            <Heading fontSize="2xl">Tài khoản không đủ</Heading>
            <Text textAlign="center" color="gray.500">
                Số dư tài khoản không đủ để thực hiện dùng chức năng này. Vui
                lòng nạp thêm tiền để sử dụng.
            </Text>
            <Button as={Link} href="/user/workspace" colorScheme="green">
                Nạp ngay
            </Button>
        </VStack>
    );
}
