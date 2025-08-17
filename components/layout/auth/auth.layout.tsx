import {
    Container,
    HStack,
    Spacer,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Heading, Loading, Logo, SelectLanguage } from '@components/ui';
import { UserRole } from '@generated/graphql/query';
import { useMe } from '@share/hooks/auth.hooks';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect } from 'react';
import { SupportDashboardLayout } from '../dashboard/support.dashboard.layout';

interface IBottomLink {
    text: string;
    link: string;
    label: string;
}

interface Props {
    title: string;
    description: string;
    children: ReactNode;
    bottom: IBottomLink;
}

export function AuthLayout({ children, title, description, bottom }: Props) {
    const router = useRouter();
    const { data, isLoading } = useMe();

    const me = data?.me;

    useEffect(() => {
        function progress() {
            if (!me) {
                return;
            }

            if ([UserRole.Admin, UserRole.RootAdmin].includes(me.role)) {
                router.push('/dashboard');
                return;
            }

            if ([UserRole.User, UserRole.Staff].includes(me.role)) {
                router.push('/user');
                return;
            }
        }
        progress();
    }, [me]);

    if (isLoading) {
        return <Loading full />;
    }

    return (
        <>
            <Head>
                <title>{title}</title>
            </Head>
            <Container>
                <HStack borderBottomWidth="1px" h="70px" mb="30">
                    <Logo variant="dark" size="sm" />
                    <Spacer />
                    <HStack divider={<StackDivider />} spacing="3">
                        <SupportDashboardLayout size="sm" />
                        <SelectLanguage size="sm" />
                    </HStack>
                </HStack>
                <VStack
                    justifyContent="center"
                    minH="calc(100vh - 110px)"
                    align="stretch"
                    maxW="360px"
                    w="full"
                    mx="auto"
                    spacing="8"
                >
                    <VStack align="stretch" spacing="8">
                        <VStack>
                            <Heading as="h3" fontSize="3xl">
                                {title}
                            </Heading>
                            <Text
                                textAlign="center"
                                color="gray.600"
                                fontSize="sm"
                            >
                                {description}
                            </Text>
                        </VStack>
                        {children}
                    </VStack>
                    <Text
                        color="gray.500"
                        fontSize="sm"
                        textAlign="center"
                        fontWeight="medium"
                    >
                        <Text as="span">{bottom.text}</Text>{' '}
                        <Text as={Link} href={bottom.link} color="green.600">
                            {bottom.label}
                        </Text>
                    </Text>
                </VStack>
            </Container>
        </>
    );
}
