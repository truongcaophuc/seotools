import {
    Center,
    Container,
    HStack,
    Spacer,
    Text,
    VStack,
    Button,
} from '@chakra-ui/react';
import { SupportDashboardLayout } from '@components/layout/dashboard/support.dashboard.layout';
import { Heading, Logo } from '@components/ui';
import Link from 'next/link';

interface Props {
    status?: string;
    content?: string;
    backLink?: string;
    description?: string;
}

export function ErrorLayout({
    status = '404',
    content = 'Trang này không tồn tại',
    description = '',
    backLink = '/',
}: Props) {
    return (
        <Container maxW="3xl">
            <HStack h="70px">
                <Link href="/">
                    <Logo variant="dark" />
                </Link>
                <Spacer />
                <SupportDashboardLayout />
            </HStack>

            <Center minH="calc(100vh - 300px)" p="8">
                <VStack spacing="3">
                    <Text
                        color="red.600"
                        as="span"
                        fontSize="9xl"
                        fontWeight="black"
                    >
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
            </Center>
        </Container>
    );
}
