import {
    Box,
    HStack,
    Spacer,
    Text,
    useBreakpoint,
    VStack,
} from '@chakra-ui/react';
import { Logo, Social } from '@components/ui';
import { useTranslate } from '@share/hooks/translate.hooks';
import moment from 'moment';
import Link from 'next/link';
import { ContainerHomepageLayout } from './container.homepage.layout';

interface IMenu {
    label: string;
    href: string;
    isLink?: boolean;
}

function NavigationFooter() {
    const { t } = useTranslate();

    const menus: Array<IMenu> = [
        {
            label: t('homepage.footer.navigation.payment_method'),
            href: '/payment-method',
        },
        {
            label: t('homepage.footer.navigation.terms_of_service'),
            href: '/terms-of-service',
        },
        {
            label: t('homepage.footer.navigation.user_manual'),
            href: 'https://hdsd.copybox.app',
            isLink: true,
        },
        {
            label: t('homepage.footer.navigation.affiliate'),
            href: 'https://wiggly-oak-c42.notion.site/fdd3df8ff70a49b4adf136764c7c63a0?v=d3e649f35e0e4e0fb9e9ae2565d3b744',
            isLink: true,
        },
    ];

    return (
        <HStack spacing="6">
            {menus.map((item) => (
                <Text
                    color="brand_light"
                    _hover={{
                        color: 'brand',
                    }}
                    key={item.href}
                    as={Link}
                    fontWeight="medium"
                    fontSize="sm"
                    href={item.href}
                >
                    {item.label}
                </Text>
            ))}
        </HStack>
    );
}

export function FooterHomepageLayout() {
    const value = useBreakpoint();
    const isMobile = ['sm', 'base'].includes(value);

    return (
        <Box borderTopWidth="1px">
            <ContainerHomepageLayout>
                {isMobile ? (
                    <VStack align="stretch" spacing="4" py="8">
                        <HStack>
                            <Logo variant="dark" />
                            <Text fontSize="sm" fontWeight="medium" as="span">
                                &copy; {moment().format('YYYY')} CopyBox, Inc.
                            </Text>
                        </HStack>
                        <HStack spacing="6">
                            <Text
                                as={Link}
                                fontWeight="medium"
                                fontSize="sm"
                                href="/"
                            >
                                Privacy Notice
                            </Text>
                            <Text
                                as={Link}
                                fontWeight="medium"
                                fontSize="sm"
                                href="/"
                            >
                                Terms of Service
                            </Text>
                            <Text
                                as={Link}
                                fontWeight="medium"
                                fontSize="sm"
                                href="/"
                            >
                                Status
                            </Text>
                        </HStack>
                        <Social />
                    </VStack>
                ) : (
                    <HStack py="8" spacing="8">
                        <HStack spacing=" 6">
                            <Logo variant="dark" />
                            <Text
                                fontSize="sm"
                                color="gray.500"
                                fontWeight="medium"
                                as="span"
                            >
                                &copy; {moment().format('YYYY')} CopyBox, Inc.
                            </Text>
                        </HStack>
                        <NavigationFooter />
                        <Spacer />
                        <Social />
                    </HStack>
                )}
            </ContainerHomepageLayout>
        </Box>
    );
}
