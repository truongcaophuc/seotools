import { HStack, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { Card, DeleteBtn, SearchForm, Table, TColumn } from '@components/ui';
import { TeamInfoFragment } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useTeams } from '@share/hooks/team.hooks';
import { AddTeam } from './add.team';
import { DefaultTeam } from './default.team';
import { DeleteTeam } from './delete.team';

const columns: TColumn<TeamInfoFragment> = [
    {
        key: 'name',
        dataIndex: 'name',
        label: 'Tên',
    },
    {
        key: 'default',
        dataIndex: 'id',
        label: 'Mặc định',
        render: (_, root) => <DefaultTeam team={root} />,
    },
    {
        key: 'createdAt',
        dataIndex: 'createdAt',
        label: 'Ngày tạo',
        render: formatDate,
    },
    {
        key: 'action',
        dataIndex: 'id',
        label: '',
        render: (id) => (
            <HStack justify="end">
                <DeleteTeam id={id}>
                    <DeleteBtn />
                </DeleteTeam>
            </HStack>
        ),
    },
];

export function ListTeam() {
    const { isLoading, data } = useTeams();
    return (
        <Card
            bodyProps={{ p: 0 }}
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={() => {}} />
                        <Spacer />
                        <AddTeam>
                            <IconButton
                                icon={<Icon as={PlusIcon} />}
                                aria-label="Add"
                            />
                        </AddTeam>
                    </HStack>
                ),
            }}
        >
            <Table
                columns={columns}
                isLoading={isLoading}
                data={data?.teams}
                isNo
                pagination={{
                    values: {
                        total: data?.teams.length,
                        page: 1,
                        perPage: 20,
                    },
                }}
            />
        </Card>
    );
}
