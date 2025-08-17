import { Container, Divider, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import {
    BalanceWorkspace,
    FormWorkspace,
    TeamWorkspace,
} from '@components/page/user/workspace';
import { WarningWorkspace } from '@components/page/user/workspace/warning.workspace';
import { Loading } from '@components/ui';
import { useMe } from '@share/hooks/auth.hooks';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const TITLE_PAGE = 'Workspace';

export default function WorkspacePage() {
    const router = useRouter();
    const { isLoading, data } = useMe();

    useEffect(() => {
        if (!isLoading) {
            const isOwner = data?.me?.workspace?.isOwner;

            if (!isOwner) {
                router.push('/');
            }
        }
    }, [data]);

    function renderContent() {
        if (isLoading) return <Loading />;

        return (
            <>
                <WarningWorkspace />
                <BalanceWorkspace />
                <FormWorkspace />
                <Divider />
                <TeamWorkspace />
                {
                    //TODO: need data
                    // <Divider />
                    // <RequestHistoryWorkspace />
                }
            </>
        );
    }

    return (
        <DashboardLayout
            title={TITLE_PAGE}
            type="customer"
            showHeading={false}
            breadcrumb={[
                {
                    label: TITLE_PAGE,
                },
            ]}
        >
            <Container
                as={VStack}
                spacing="8"
                maxW="2xl"
                py="5"
                align="stretch"
            >
                {renderContent()}
            </Container>
        </DashboardLayout>
    );
}
