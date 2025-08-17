import { DashboardLayout } from '@components/layout/dashboard';
import { ListCustomer } from '@components/page/customer';

export default function CustomerPage() {
    return (
        <DashboardLayout
            breadcrumb={[
                {
                    label: 'Khách hàng',
                },
            ]}
            title="Khách hàng"
        >
            <ListCustomer />
        </DashboardLayout>
    );
}
