import {
    Box,
    Center,
    Container,
    Flex,
    HStack,
    Skeleton,
    Spacer,
    StackDivider,
    VStack,
} from '@chakra-ui/react';
import {
    Breadcrumb,
    Heading,
    HeroIcon,
    IBreadcrumbItem,
    Loading,
    ModalChatbot,
    NotFound,
    SelectLanguage,
    UserMenu,
} from '@components/ui';
import { UserRole } from '@generated/graphql/query';
import { Bars3Icon } from '@heroicons/react/24/outline';
import { useValidWorkspace } from '@share/hooks/account.hooks';
import { useMe } from '@share/hooks/auth.hooks';
import { useMobile } from '@share/hooks/size.hooks';
import { useAuthStore } from '@share/store/auth.store';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement, ReactNode, useEffect } from 'react';
import { BannedDashboardLayout } from './ banned.dashboard.layout';
import { MobileSidebarDashboardLayout } from './mobile-sidebar.dashboard.layout';
import { SidebarDashboardLayout } from './sidebar.dashboard.layout';
import { WarningDashboardLayout } from './warning.dashboard.layout';

export type TLayoutType = 'full' | 'container';

function InnerLayout({
    layout,
    children,
}: {
    layout: TLayoutType;
    children: ReactElement;
}) {
    // const isShowWarning = useDashboardStore((state) => state.isShowWarning);
    // const h = isShowWarning ? 'calc(100vh - 60px -50px)' : 'calc(100vh - 60px)';

    if (layout === 'container') {
        return (
            <Box overflowY="auto" flex="1" pos="relative" py="6">
                <Container maxW="8xl">{children}</Container>
            </Box>
        );
    }

    return (
        <>
            {cloneElement(children, {
                pos: 'relative',
                flex: 1,
                overflowY: 'auto',
            })}
        </>
    );
}

export type TType = 'customer' | 'admin';

export interface DashboardLayoutProps {
    children: ReactNode;
    title?: string;
    type?: TType;
    layout?: TLayoutType;
    breadcrumb?: Array<IBreadcrumbItem>;
    showHeading?: boolean;
    extra?: ReactNode;
    isAllow?: boolean;
    showChatbot?: boolean;
}

export function DashboardLayout({
    children,
    title,
    type = 'admin',
    layout = 'container',
    breadcrumb = [],
    showHeading = true,
    extra,
    isAllow = true,
    showChatbot = true,
}: DashboardLayoutProps) {
    const router = useRouter();
    const { data, isLoading } = useMe();
    const { isLoading: isLoadingBalance } = useValidWorkspace();
    const isLoadingAuth = useAuthStore((state) => state.isLoading);

    const isMobile = useMobile();

    // Kiểm tra session cookie để quyết định có redirect về login hay không
    const hasSessionCookie = () => {
        if (typeof window === 'undefined') return false;
        return document.cookie.includes('iron-session/seo-tools/next.js');
    };

    useEffect(() => {
        // Redirect về login nếu đã load xong và không có user data
        // Bao gồm cả trường hợp có session cookie nhưng user không tồn tại
        if (!isLoading && !data?.me) {
            router.push('/login');
        }
    }, [data, isLoading]);

    useEffect(() => {
        if (!isLoading && data?.me && type === 'admin') {
            if (
                ![UserRole.Admin, UserRole.RootAdmin].includes(data?.me?.role)
            ) {
                router.push('/user');
            }
        }
    }, [data, type]);

    if (!isAllow) {
        return (
            <>
                <Head>
                    <title>Page not found</title>
                </Head>
                <Center minH="100vh">
                    <NotFound />
                </Center>
            </>
        );
    }

    // Hiển thị skeleton loading nếu đang load và có session cookie
    if ((isLoading || isLoadingAuth) && hasSessionCookie()) {
        return (
            <Flex h="100vh">
                <Skeleton w="250px" h="100vh" />
                <VStack spacing="0" align="stretch" flex="1" overflow="hidden">
                    <Skeleton h="60px" />
                    <Box flex="1" p="6">
                        <VStack align="stretch" spacing="5">
                            <Skeleton h="40px" w="200px" />
                            <Skeleton h="200px" />
                            <Skeleton h="150px" />
                            <Skeleton h="100px" />
                        </VStack>
                    </Box>
                </VStack>
            </Flex>
        );
    }

    // Hiển thị loading toàn màn hình nếu không có session cookie
    if (isLoading || isLoadingAuth) {
        return <Loading full />;
    }

    if (data?.me && !data?.me?.active) {
        return <BannedDashboardLayout />;
    }

    const links = [
        {
            href: type === 'customer' ? '/user' : '/dashboard',
            label: 'Home',
        },
        ...breadcrumb,
    ];

    return (
        <>
            <Head>
                <title>{`Copybox ${title ? `- ${title}` : ''}`}</title>
            </Head>

            <Flex h="100vh">
                {isMobile ? null : <SidebarDashboardLayout type={type} />}
                <VStack spacing="0" align="stretch" flex="1" overflow="hidden">
                    {type === 'customer' && !isLoadingBalance && (
                        <WarningDashboardLayout />
                    )}
                    <HStack
                        pr="4"
                        pl={isMobile ? '0' : '4'}
                        bgColor="white"
                        h="60px"
                        borderBottomWidth="1px"
                        spacing="3"
                    >
                        {isMobile ? (
                            <MobileSidebarDashboardLayout type={type}>
                                <Center
                                    cursor="pointer"
                                    _hover={{
                                        color: 'white',
                                        bgColor: 'blue.600',
                                    }}
                                    h="60px"
                                    w="60px"
                                    borderRightWidth="1px"
                                >
                                    <HeroIcon as={Bars3Icon} boxSize="6" />
                                </Center>
                            </MobileSidebarDashboardLayout>
                        ) : null}
                        <VStack align="stretch" spacing="1">
                            {title ? (
                                <Heading noOfLines={1} fontSize="md" as="span">
                                    {title}
                                </Heading>
                            ) : null}
                            <Breadcrumb links={links} />
                        </VStack>
                        <Spacer />
                        <HStack h="full" divider={<StackDivider />}>
                            {type === 'customer' ? (
                                <>
                                    {showChatbot &&
                                    !!data?.me?.defaultProject ? (
                                        <ModalChatbot />
                                    ) : null}
                                </>
                            ) : null}
                            {data?.me?.isDeveloper ? (
                                <SelectLanguage size="sm" />
                            ) : null}
                            <UserMenu user={data?.me} />
                        </HStack>
                    </HStack>

                    <InnerLayout layout={layout}>
                        <VStack flex="1" align="stretch" spacing="5">
                            {showHeading ? (
                                <HStack>
                                    <Heading>{title}</Heading>
                                    <Spacer />
                                    {extra}
                                </HStack>
                            ) : null}
                            {children}
                        </VStack>
                    </InnerLayout>
                </VStack>
            </Flex>
        </>
    );
}
