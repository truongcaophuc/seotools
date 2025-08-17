import { DashboardLayout } from '@components/layout/dashboard';
import { ListCustomField } from '@components/page/dashboard/custom-field';

export default function CustomFieldsPage() {
    return (
        <DashboardLayout
            breadcrumb={[
                {
                    label: 'Custom field',
                },
            ]}
            title="Custom field"
        >
            <ListCustomField />
        </DashboardLayout>
    );
}
