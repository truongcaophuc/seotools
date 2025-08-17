import { TeamDashboardLayout } from '@components/layout/dashboard';
import { ListProject } from '@components/page/user/project';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function ProjectTeamPage() {
    const { t } = useTranslate();
    const title = t('team.project.title');
    return (
        <TeamDashboardLayout
            title={title}
            breadcrumb={[
                {
                    label: t('team.project.title'),
                },
            ]}
        >
            <ListProject />
        </TeamDashboardLayout>
    );
}
