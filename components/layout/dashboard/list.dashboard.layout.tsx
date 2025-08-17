import { HStack, Spacer, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { ReactNode } from 'react';
import { DashboardLayout, DashboardLayoutProps } from './dashboard.layout';

interface Props extends DashboardLayoutProps {
    extra?: ReactNode;
}

export function ListDashboardLayout({
    children,
    title,
    extra,
    ...props
}: Props) {
    function renderHeading() {
        if (!title && !extra) return null;
        return (
            <HStack>
                {title ? <Heading>{title}</Heading> : null}
                <Spacer />
                {extra}
            </HStack>
        );
    }

    return (
        <DashboardLayout {...props} title={title}>
            <VStack align="stretch" spacing="5">
                {renderHeading()}
                {children}
            </VStack>
        </DashboardLayout>
    );
}
