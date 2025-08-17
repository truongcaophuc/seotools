import { DashboardLayout } from '@components/layout/dashboard';
import { FormAi } from '@components/page/user/ai';
import { Loading, NotFound, NotPremium } from '@components/ui';
import { ModelAi } from '@generated/graphql/query';
import { useService } from '@share/hooks/service.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { usePremiumWorkspace } from '@share/hooks/workspace.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { get } from 'lodash';

export default function AiContentDetail() {
    const user = useAuthStore((state) => state.user);
    const { t } = useTranslate();
    const { isLoading, data, isError } = useService();
    const isPremium = usePremiumWorkspace();

    if (isLoading) {
        return (
            <DashboardLayout type="customer">
                <Loading full />
            </DashboardLayout>
        );
    }

    if (isError || !data) {
        return <NotFound />;
    }

    const service = data.service;

    const isGpt4 = service.model === ModelAi.Gpt4;

    function renderContent() {
        if (isGpt4) {
            const timeUseGpt4 = get(
                user,
                'workspace.wordspacePakage.timeUseGpt4'
            );

            if (isPremium && timeUseGpt4 && timeUseGpt4 > 0) {
                return <FormAi />;
            }
        }

        return <FormAi service={service} />;
    }

    return (
        <DashboardLayout
            breadcrumb={[
                {
                    label: 'AI Assistant Selection',
                    href: '/user/ai',
                },
                {
                    label: service?.title,
                },
            ]}
            type="customer"
            title={service?.title}
            layout="full"
            showHeading={false}
        >
            {renderContent()}
        </DashboardLayout>
    );
}
