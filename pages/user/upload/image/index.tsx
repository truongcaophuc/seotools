import { DashboardLayout } from '@components/layout/dashboard';
import { ListImage } from '@components/page/image';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function ImagePage() {
    const { t } = useTranslate();
    const TITLE_PAGE = t('upload.images.title');

    return (
        <DashboardLayout
            type="customer"
            title={TITLE_PAGE}
            breadcrumb={[
                {
                    label: TITLE_PAGE,
                },
            ]}
            showHeading={false}
        >
            <ListImage />
        </DashboardLayout>
    );
}
