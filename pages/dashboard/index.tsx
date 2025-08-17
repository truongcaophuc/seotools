import { DashboardLayout } from '@components/layout/dashboard';

export default function DashboardPage() {
    return (
        <DashboardLayout
            breadcrumb={[
                {
                    label: 'Tổng quan',
                },
            ]}
            title="Tổng quan"
        >
            <div>Updating</div>
        </DashboardLayout>
    );
}
