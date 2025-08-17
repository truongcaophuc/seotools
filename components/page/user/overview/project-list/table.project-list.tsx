import { Card } from '@components/ui';
import { PaginationProps } from '@components/ui/pagination';
import { ProjectInfoFragment } from '@generated/graphql/query';
import { TableProject } from '../../project/table.project';

interface Props {
    projects: Array<ProjectInfoFragment>;
    pagination: PaginationProps;
    isLoading: boolean;
}

export function TableProjectList({ projects, pagination, isLoading }: Props) {
    return (
        <Card
            bodyProps={{
                p: 0,
            }}
        >
            <TableProject
                isLoading={isLoading}
                pagination={pagination}
                data={projects}
            />
        </Card>
    );
}
