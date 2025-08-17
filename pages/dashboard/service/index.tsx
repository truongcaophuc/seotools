import { DashboardLayout } from '@components/layout/dashboard';
import { ListService } from '@components/page/dashboard/service';

export default function CategoryServicePage() {
    return (
        <DashboardLayout
            type="admin"
            breadcrumb={[{ label: 'Dịch vụ' }]}
            title="Dịch vụ"
        >
            <ListService />
        </DashboardLayout>
    );
}
