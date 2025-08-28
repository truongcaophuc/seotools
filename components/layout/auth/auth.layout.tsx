import {
    Container,
    HStack,
    Spacer,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Heading, Loading, Logo, SelectLanguage } from '@components/ui';
import { FastLoading } from '@components/ui/loading/fast-loading';
import { UserRole } from '@generated/graphql/query';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactNode, useEffect, useState } from 'react';
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

// Helper function to check if session cookie exists
function hasSessionCookie(): boolean {
    if (typeof window === 'undefined') return false;
    
    const cookieName = 'iron-session/seo-tools/next.js';
    return document.cookie.split(';').some(cookie => 
        cookie.trim().startsWith(`${cookieName}=`)
    );
}

export function AuthLayout({ children, title, description, bottom }: Props) {
    const router = useRouter();
    const [hasRedirected, setHasRedirected] = useState(false);
    const [isCheckingSession, setIsCheckingSession] = useState(true);

    // Check for session cookie immediately and redirect
    useEffect(() => {
        if (hasRedirected) return;
        
        // Kiểm tra session cookie local trước
        if (hasSessionCookie()) {
            setHasRedirected(true);
            // Redirect to dashboard immediately if session exists
            // The actual user role check will happen in dashboard
            router.push('/dashboard');
        } else {
            // Không có session cookie, cho phép hiển thị form login
            setIsCheckingSession(false);
        }
    }, [router, hasRedirected]);

    // Don't show loading if we're redirecting
    if (hasRedirected) {
        return <Loading full />;
    }

    // Show loading while checking session
    if (isCheckingSession) {
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
