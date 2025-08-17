import { DashboardLayout } from '@components/layout/dashboard';
import { ListImage } from '@components/page/image';
import { TypeFile } from '@generated/graphql/query';

const TITLE_PAGE = 'Tài liệu';

export default function ImagesPage() {
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
            <ListImage type={TypeFile.Document} />
        </DashboardLayout>
    );
}
