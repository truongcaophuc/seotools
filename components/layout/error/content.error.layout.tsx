import { Button, Text, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import Link from 'next/link';

interface Props {
    status?: string;
    content?: string;
    backLink?: string;
    description?: string;
}

export function ContentErrorLayout({
    status = '404',
    content = 'Trang này không tồn tại',
    description = '',
    backLink = '/',
}: Props) {
    return (
        <VStack spacing="3">
            <Text color="red.600" as="span" fontSize="9xl" fontWeight="black">
                {status}
            </Text>

            <Heading>{content}</Heading>

            {description ? (
                <Text textAlign="center" maxW="400px" color="gray.500">
                    {description}
                </Text>
            ) : null}

            <Button as={Link} href={backLink} colorScheme="blue">
                Quay lại
            </Button>
        </VStack>
    );
}
