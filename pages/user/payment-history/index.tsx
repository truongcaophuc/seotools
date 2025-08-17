import { DashboardLayout } from '@components/layout/dashboard';
import { ListPaymentHistory } from '@components/page/user/payment-history';

const TITLE_PAGE = 'Lịch sử thanh toán';

export default function PaymentHistoryPage() {
    return (
        <DashboardLayout
            type="customer"
            title={TITLE_PAGE}
            breadcrumb={[
                {
                    label: 'Workspace',
                    href: '/user/workspace',
                },
                {
                    label: TITLE_PAGE,
                },
            ]}
        >
            <ListPaymentHistory />
        </DashboardLayout>
    );
}
