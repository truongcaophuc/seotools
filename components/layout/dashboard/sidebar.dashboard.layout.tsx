import { Center, HStack, Icon, Spacer, VStack } from '@chakra-ui/react';
import { Logo } from '@components/ui';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { AdminNavigation } from './admin.navigation';
import { CustomerNavigation } from './customer.navigation';
import { type TType } from './dashboard.layout';
import { useDashboardStore } from './dashboard.store';
import { SupportDashboardLayout } from './support.dashboard.layout';

interface Props {
    type: TType;
    showCloseBtn?: boolean;
}

export function SidebarDashboardLayout({ type, showCloseBtn = true }: Props) {
    const isOpen = useDashboardStore((state) => state.isOpen);
    const onToggle = useDashboardStore((state) => state.onToggle);

    const icon = isOpen ? ChevronLeftIcon : ChevronRightIcon;

    return (
        <VStack
            align="stretch"
            h="full"
            bgColor="blue.900"
            maxW={isOpen ? '240px' : '60px'}
            w="full"
            spacing="0"
            pos="relative"
            zIndex="10"
        >
            {isOpen ? (
                <HStack flexShrink="0" px="4" h="60px">
                    <Logo />
                </HStack>
            ) : (
                <Center h="60px">
                    <Logo isSmall />
                </Center>
            )}

            <VStack spacing="1" overflowY="auto" flex="1" align="stretch">
                {type === 'admin' ? (
                    <AdminNavigation />
                ) : (
                    <>
                        <CustomerNavigation />

                        <Spacer />
                        {isOpen ? (
                            <VStack px="4" pb="3" align="stretch">
                                <SupportDashboardLayout />
                            </VStack>
                        ) : (
                            <Center h="50px" color="gray.400" cursor="pointer">
                                <SupportDashboardLayout
                                    isSmall
                                    placement="right"
                                />
                            </Center>
                        )}
                    </>
                )}
            </VStack>
            {showCloseBtn ? (
                <Center
                    h="50px"
                    borderTopWidth="1px"
                    borderTopColor="blue.800"
                    color="gray.400"
                    cursor="pointer"
                    onClick={onToggle}
                >
                    <Icon as={icon} boxSize="5" />
                </Center>
            ) : null}
        </VStack>
    );
}
