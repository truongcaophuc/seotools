import { DashboardLayout } from '@components/layout/dashboard';
import { ListPayment } from '@components/page/dashboard/payment';

const TITLE_PAGE = 'Thanh toán';

export default function PaymentDashboardPage() {
    return (
        <DashboardLayout
            title={TITLE_PAGE}
            breadcrumb={[
                {
                    label: TITLE_PAGE,
                },
            ]}
            type="admin"
        >
            <ListPayment />
        </DashboardLayout>
    );
}
