import {
    Avatar,
    Box,
    Button,
    Card,
    CardBody,
    HStack,
    Icon,
    Skeleton,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    ArrowPathRoundedSquareIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { useMe } from '@share/hooks/auth.hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

interface IMenu {
    href: string;
    label: string;
    icon: any;
}

const menus: Array<IMenu> = [
    {
        href: '/user',
        label: 'Cài đặt',
        icon: Cog6ToothIcon,
    },
    {
        href: '/user/history',
        label: 'Lịch sử',
        icon: ArrowPathRoundedSquareIcon,
    },
];

function LinkButton({ menu }: { menu: IMenu }) {
    const router = useRouter();
    const active = router.pathname === menu.href;
    return (
        <Button
            size="sm"
            colorScheme={active ? 'green' : 'gray'}
            color={active ? 'white' : 'gray.500'}
            variant={active ? 'solid' : 'ghost'}
            as={Link}
            href={menu.href}
            leftIcon={<Icon as={menu.icon} boxSize="5" />}
        >
            {menu.label}
        </Button>
    );
}

export function InforUser() {
    const { isLoading, data } = useMe();

    const renderContent = () => {
        if (!data) {
            return null;
        }

        return (
            <>
                <HStack>
                    <HStack spacing="4">
                        <Avatar name={data?.me?.fullname} size="lg" />
                        <VStack align="stretch">
                            <Box>
                                <Text
                                    fontSize="xl"
                                    mb="0"
                                    lineHeight="1"
                                    fontWeight="bold"
                                >
                                    {data?.me?.fullname}
                                </Text>
                                <Text fontSize="sm" color="gray" as="span">
                                    #{data?.me?.username}
                                </Text>
                            </Box>
                        </VStack>
                    </HStack>
                    <Spacer />
                </HStack>

                <HStack>
                    {menus.map((item) => (
                        <LinkButton menu={item} key={item.href} />
                    ))}
                </HStack>
            </>
        );
    };
    return (
        <Skeleton isLoaded={!isLoading}>
            <Card bgColor="white">
                <CardBody as={VStack} spacing="6" align="stretch">
                    {renderContent()}
                </CardBody>
            </Card>
        </Skeleton>
    );
}
