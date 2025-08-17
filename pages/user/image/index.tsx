import { DashboardLayout } from '@components/layout/dashboard';
import { ListImage } from '@components/page/image';

const TITLE_PAGE = 'Hình ảnh';

export default function ImagePage() {
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
