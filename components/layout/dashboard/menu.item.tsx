import {
    Box,
    Center,
    Collapse,
    HStack,
    Link as LinkUi,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Spacer,
    StackProps,
    Text,
    Tooltip,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import { ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef, ReactElement, ReactNode } from 'react';
import { TType } from './dashboard.layout';
import { useDashboardStore } from './dashboard.store';

interface IMenu {
    label: string;
    href: string;
    icon?: any;
    children?: IMenu[];
}

interface MenuLinkProps extends StackProps {
    menu: IMenu;
    type?: TType;
    isLink?: boolean;
}

function MenuHasChilren({
    children,
    tringerNode,
}: {
    children: ReactNode;
    tringerNode: ReactElement;
}) {
    const { isOpen, onToggle } = useDisclosure();

    const icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

    return (
        <>
            <Box pos="relative" onClick={onToggle}>
                {tringerNode}
                <HeroIcon
                    pos="absolute"
                    right="4"
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.200"
                    boxSize="4"
                    as={icon}
                />
            </Box>
            <Collapse in={isOpen}>{children}</Collapse>
        </>
    );
}

function useMenuActive({ type, menu }: { type: TType; menu: IMenu }) {
    const router = useRouter();

    const getActiveMenu = () => {
        const rootPath = type === 'admin' ? '/dashboard' : '/user';
        if (router.pathname === rootPath) {
            if (menu.href == rootPath) {
                return true;
            }
            return false;
        }

        return menu.href !== rootPath && router.pathname.includes(menu.href);
    };

    const active = getActiveMenu();

    return active;
}

const MenuLink = forwardRef(function (
    { menu, type = 'customer', isLink, ...rest }: MenuLinkProps,
    ref: any
) {
    const isOpen = useDashboardStore((state) => state.isOpen);
    const active = useMenuActive({ type, menu });

    const bgColor = active ? 'blue.700' : 'blue.900';
    const color = active ? 'white' : 'gray.300';

    const menuChildren = menu?.children || [];

    const menuProps: StackProps = {
        bgColor,
        color,
        px: '4',
        py: '2',
        cursor: 'pointer',
        _hover: {
            bgColor: 'blue.600',
            textDecoration: 'none',
        },
        _focusVisible: {
            border: 'none',
            outline: 'none',
        },
    };

    if (isOpen) {
        if (menuChildren.length > 0) {
            return (
                <MenuHasChilren
                    tringerNode={
                        <HStack {...menuProps}>
                            <HeroIcon as={menu.icon} />
                            <Text as="span" fontSize="sm" fontWeight="medium">
                                {menu.label}
                            </Text>
                            <Spacer />
                        </HStack>
                    }
                >
                    <VStack spacing="0" align="stretch">
                        {menu?.children?.map((item) => (
                            <Text
                                py="2"
                                as={Link}
                                href={item.href}
                                pl="45px"
                                color="gray.300"
                                fontSize="sm"
                                key={item.href}
                                _hover={{
                                    bgColor: 'blue.800',
                                }}
                            >
                                {item.label}
                            </Text>
                        ))}
                    </VStack>
                </MenuHasChilren>
            );
        }

        return (
            <HStack
                as={isLink ? LinkUi : Link}
                target={isLink ? '_blank' : undefined}
                href={menu.href}
                {...menuProps}
                border="none"
                _after={{
                    border: 'none',
                }}
            >
                <HeroIcon as={menu.icon} />
                <Text as="span" fontSize="sm" fontWeight="medium">
                    {menu.label}
                </Text>
            </HStack>
        );
    }

    if (menu?.children?.length > 0) {
        return (
            <Popover placement="right" trigger="hover">
                <PopoverTrigger>
                    <Center {...menuProps}>
                        <HeroIcon as={menu.icon} />
                    </Center>
                </PopoverTrigger>
                <PopoverContent py="2" minW="0" w="180px">
                    {menu.children.map((item) => (
                        <Box
                            px="4"
                            py="1"
                            color="gray.500"
                            _hover={{
                                bgColor: 'gray.100',
                            }}
                            fontSize="sm"
                            fontWeight="medium"
                            as={Link}
                            href={item.href}
                        >
                            {item.label}
                        </Box>
                    ))}
                </PopoverContent>
            </Popover>
        );
    }

    return (
        <Tooltip label={menu.label} placement="right">
            <Center
                {...rest}
                ref={ref}
                as={isLink ? LinkUi : Link}
                target={isLink ? '_blank' : undefined}
                href={menu.href}
                {...menuProps}
            >
                <HeroIcon as={menu.icon} />
            </Center>
        </Tooltip>
    );
});

interface MenuItemProps {
    menu: IMenu;
    type?: TType;
    isLink?: boolean;
}

export function MenuItem({ menu, type, isLink }: MenuItemProps) {
    return <MenuLink isLink={isLink} menu={menu} type={type} />;
}
