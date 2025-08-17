import { DashboardLayout } from '@components/layout/dashboard';
import { ListTeam } from '@components/page/user/team/list.team';

export default function TeamPage() {
    return (
        <DashboardLayout
            type="customer"
            title="Team"
            breadcrumb={[{ label: 'Team' }]}
        >
            <ListTeam />
        </DashboardLayout>
    );
}
