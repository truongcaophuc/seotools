import { Box, Flex, HStack, Spacer, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { DashboardLayout, DashboardLayoutProps } from '../dashboard.layout';
import { SidebarTeamDashboard } from './sidebar.team.dashboard';

interface Props extends DashboardLayoutProps {}

export function TeamDashboardLayout({ children, extra, ...props }: Props) {
    return (
        <DashboardLayout
            showHeading={false}
            type="customer"
            {...props}
            layout="full"
        >
            <Flex h="calc(100vh - 60px)">
                <SidebarTeamDashboard />
                <VStack align="stretch" spacing="5" flex="1" p="6">
                    <HStack>
                        <Heading>{props.title}</Heading>
                        <Spacer />
                        {extra}
                    </HStack>
                    {children}
                </VStack>
            </Flex>
        </DashboardLayout>
    );
}
