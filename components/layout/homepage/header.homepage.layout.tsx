import {
    Box,
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    IconButton,
    Link as LinkUi,
    SimpleGrid,
    Skeleton,
    Spacer,
    StackDivider,
    Text,
    useBreakpoint,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { HeroIcon, Logo, SelectLanguage, UserMenu } from '@components/ui';
import { Bars3Icon, Square2StackIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useAuthStore } from '@share/store/auth.store';
import Link from 'next/link';
import { HTMLAttributeAnchorTarget, useRef } from 'react';

interface IMenu {
    label: string;
    href: string;
    target?: HTMLAttributeAnchorTarget;
}

function Menu({ menu }: { menu: IMenu }) {
    const { href, ...rest } = menu;
    return (
        <Text
            fontWeight="medium"
            as={LinkUi}
            href={href}
            _hover={{
                color: 'brand',
                textDecoration: 'none',
            }}
            {...rest}
        >
            {menu.label}
        </Text>
    );
}

function useMenus() {
    const { t } = useTranslate();
    const menus: Array<IMenu> = [
        { href: '/#feature', label: t('homepage.header.navigation.feature') },
        { href: '/#pricing', label: t('homepage.header.navigation.pricing') },
        {
            href: 'https://hdsd.copybox.app',
            label: t('homepage.header.navigation.user_manual'),
            target: '_blank',
        },
        {
            href: 'https://wiggly-oak-c42.notion.site/fdd3df8ff70a49b4adf136764c7c63a0?v=d3e649f35e0e4e0fb9e9ae2565d3b744',
            label: t('homepage.header.navigation.affiliate'),
            target: '_blank',
        },
    ];
    return menus;
}

function Navigation() {
    const menus = useMenus();

    return (
        <HStack spacing={[4, 6, null, null, 10]}>
            {menus.map((item) => (
                <Menu menu={item} key={item.href} />
            ))}
        </HStack>
    );
}

function NavigationMobile() {
    const user = useAuthStore((state) => state.user);
    const btnRef = useRef();
    const { onToggle, isOpen, onClose } = useDisclosure();
    const menus = useMenus();

    return (
        <>
            <IconButton
                onClick={onToggle}
                variant="link"
                icon={<HeroIcon boxSize="8" as={Bars3Icon} />}
                aria-label="Menu"
            />

            <Drawer
                isOpen={isOpen}
                placement="right"
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <VStack align="stretch" spacing="6">
                            {menus.map((item) => (
                                <Text
                                    fontWeight="semibold"
                                    as={LinkUi}
                                    href={item.href}
                                    key={item.href}
                                >
                                    {item.label}
                                </Text>
                            ))}
                        </VStack>
                    </DrawerBody>

                    <DrawerFooter borderTopWidth="1px">
                        <Box flex="1">
                            {user ? (
                                <HStack>
                                    <UserMenu user={user} />
                                    <Spacer />
                                    <Button
                                        leftIcon={
                                            <HeroIcon as={Square2StackIcon} />
                                        }
                                        as={Link}
                                        href="/user"
                                    >
                                        Dashboard
                                    </Button>
                                </HStack>
                            ) : (
                                <SimpleGrid gap={6} columns={2}>
                                    <Button as={Link} href="/login">
                                        Đăng ký
                                    </Button>
                                    <Button
                                        as={Link}
                                        colorScheme="green"
                                        href="/signup"
                                    >
                                        Dùng thử
                                    </Button>
                                </SimpleGrid>
                            )}
                        </Box>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    );
}

export function HeaderHomepageLayout() {
    const user = useAuthStore((state) => state.user);
    const isLoading = useAuthStore((state) => state.isLoading);
    const value = useBreakpoint();
    const isTable = ['md', 'base', 'sm'].includes(value);
    const isMobile = ['base', 'sm'].includes(value);
    const { t } = useTranslate();

    function renderUserMenu() {
        if (isMobile) return null;

        if (!user) {
            return (
                <HStack spacing="8">
                    <Text
                        as={Link}
                        fontWeight="medium"
                        variant="ghost"
                        href="/login"
                        _hover={{
                            color: 'brand',
                        }}
                    >
                        {t('homepage.header.navigation.login')}
                    </Text>
                    <Button
                        as={Link}
                        colorScheme=""
                        bgColor="brand"
                        href="/signup/verify"
                    >
                        {t('homepage.header.navigation.trial')}
                    </Button>
                </HStack>
            );
        }

        return (
            <HStack spacing="4" divider={<StackDivider />}>
                <Button
                    color="brand"
                    _hover={{
                        bgColor: 'brand_light',
                        color: 'white',
                    }}
                    fontWeight="medium"
                    as={Link}
                    href="/user"
                >
                    {t('homepage.header.navigation.dashboard')}
                </Button>
                <UserMenu user={user} />
            </HStack>
        );
    }

    return (
        <Box as="header" bgColor="white" pos="sticky" zIndex="sticky" top="0">
            <Container maxW="7xl">
                <HStack py={[3, null, null, 7]} spacing={[4, 6, null, 8, 10]}>
                    <Logo variant="dark" size="md" />
                    {isTable ? null : <Navigation />}

                    <Spacer />
                    <Skeleton isLoaded={!isLoading}>
                        {renderUserMenu()}
                    </Skeleton>

                    <SelectLanguage />

                    {isTable && <NavigationMobile />}
                </HStack>
            </Container>
        </Box>
    );
}
