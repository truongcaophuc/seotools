import { TeamDashboardLayout } from '@components/layout/dashboard';
import { FormTeam } from '@components/page/user/team';
import { Card, Loading, NotFound } from '@components/ui';
import { useTeamDefault } from '@share/hooks/team.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function TeamDetailPage() {
    const { t } = useTranslate();
    const { isLoading, data, isError } = useTeamDefault();
    if (isLoading) {
        return <Loading full />;
    }
    if (isError || !data) {
        return <NotFound />;
    }

    const team = data?.teamDefault;

    return (
        <TeamDashboardLayout
            title={t('team.detail.title')}
            breadcrumb={[
                {
                    label: team.name,
                },
            ]}
        >
            <Card>
                <FormTeam team={team} />
            </Card>
        </TeamDashboardLayout>
    );
}
