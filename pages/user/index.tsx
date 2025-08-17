import { DashboardLayout } from '@components/layout/dashboard';
import { ProjectList } from '@components/page/user/overview';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function UserPage() {
    const { t } = useTranslate();
    return (
        <DashboardLayout
            breadcrumb={[{ label: t('overview.title') }]}
            type="customer"
            title={t('overview.title')}
            showHeading={false}
        >
            <ProjectList />
        </DashboardLayout>
    );
}
