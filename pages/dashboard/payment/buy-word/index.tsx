import { DashboardLayout } from '@components/layout/dashboard';
import { ListBuyWord } from '@components/page/user/buy-word';

const TITLE_PAGE = 'Mua từ';

export default function BuyWordPage() {
    return (
        <DashboardLayout
            breadcrumb={[
                { label: 'Thanh toán', href: '/dashboard/payment' },
                { label: TITLE_PAGE },
            ]}
            type="admin"
            title={TITLE_PAGE}
        >
            <ListBuyWord />
        </DashboardLayout>
    );
}
