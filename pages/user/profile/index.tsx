import { DashboardLayout } from '@components/layout/dashboard';
import { ContentProfile } from '@components/page/user/profile';

export default function ProfilePage() {
    return (
        <DashboardLayout
            type="customer"
            title="Trang cá nhân"
            breadcrumb={[{ label: 'Trang cá nhân' }]}
        >
            <ContentProfile />
        </DashboardLayout>
    );
}
