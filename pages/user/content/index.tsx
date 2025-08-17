import { DashboardLayout } from '@components/layout/dashboard';
import { ListContent } from '@components/page/content';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function ContentPage() {
    const { t } = useTranslate();

    const TITLE_PAGE = t('contents.title');

    return (
        <DashboardLayout
            breadcrumb={[{ label: TITLE_PAGE }]}
            type="customer"
            title={TITLE_PAGE}
        >
            <ListContent />
        </DashboardLayout>
    );
}
