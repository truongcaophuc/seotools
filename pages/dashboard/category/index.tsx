import { DashboardLayout } from '@components/layout/dashboard';
import { CategoriesService } from '@components/page/dashboard/service';

export default function CategoryServicePage() {
    return (
        <DashboardLayout
            breadcrumb={[{ label: 'Nhóm dịch vụ' }]}
            title="Nhóm dịch vụ"
        >
            <CategoriesService />
        </DashboardLayout>
    );
}
