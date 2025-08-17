import { DashboardLayout } from '@components/layout/dashboard';
import { ListProject } from '@components/page/user/project';

export default function ProjectPage() {
    return (
        <DashboardLayout
            type="customer"
            title="Project"
            breadcrumb={[{ label: 'Project' }]}
        >
            <ListProject />
        </DashboardLayout>
    );
}
