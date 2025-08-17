import { DashboardLayout } from '@components/layout/dashboard';
import { ListDocument } from '@components/page/user/document';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function DocumentPage() {
    const { t } = useTranslate();
    return (
        <DashboardLayout
            breadcrumb={[
                {
                    label: t('posts.title'),
                },
            ]}
            type="customer"
            title={t('posts.title')}
        >
            <ListDocument />
        </DashboardLayout>
    );
}
