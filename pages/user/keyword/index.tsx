import { DashboardLayout } from '@components/layout/dashboard';
import { ListKeyword } from '@components/page/user/keyword';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function KeywordPage() {
    const { t } = useTranslate();
    const TITLE_PAGE = t('keywords.title');

    return (
        <DashboardLayout
            type="customer"
            title={TITLE_PAGE}
            breadcrumb={[{ label: TITLE_PAGE }]}
        >
            <ListKeyword />
        </DashboardLayout>
    );
}
