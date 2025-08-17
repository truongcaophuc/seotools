import {
    Avatar,
    Center,
    Container,
    HStack,
    Link,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Heading, HeroIcon, Logo } from '@components/ui';
import { ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { SupportDashboardLayout } from './support.dashboard.layout';

export function BannedDashboardLayout() {
    return (
        <Container maxW="2xl">
            <HStack h="100px">
                <Logo />
                <Spacer />
                <SupportDashboardLayout />
            </HStack>

            <Center minH="calc(100vh - 200px)">
                <VStack p="6" spacing="3">
                    <Avatar
                        size="lg"
                        bgColor="red.100"
                        color="red.500"
                        icon={
                            <HeroIcon
                                boxSize="7"
                                as={ExclamationTriangleIcon}
                            />
                        }
                    />
                    <Heading fontSize="4xl" color="red.500" fontWeight="bold">
                        Tài khoản bị khoá
                    </Heading>
                    <Text color="gray.500" textAlign="center">
                        Tài khoản của khách hàng đang bị tạm khoá vì một lý do
                        nào đó. Vui lòng liên hệ với chúng tôi để được hỗ trợ.
                    </Text>

                    <Text my="2" fontWeight="medium">
                        <Text color="green" as={Link} href="tel:+84932586532">
                            093 2586532
                        </Text>{' '}
                        (gặp Duy)
                    </Text>
                </VStack>
            </Center>
        </Container>
    );
}
