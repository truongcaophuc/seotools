import { Card, Table, TColumn } from '@components/ui';
import { RequestHistoryInfoFragment } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { formatMoney } from '@share/helps/format-number';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useRequestHistories } from '@share/hooks/request-history.hooks';

const columns: TColumn<RequestHistoryInfoFragment> = [
    {
        label: 'Ngày tạo',
        key: 'createdAt',
        dataIndex: 'createdAt',
        render: formatDate,
    },
    {
        label: 'Người tạo',
        key: 'fullname',
        dataIndex: 'user',
        render: (user) => user?.fullname,
    },
    {
        label: 'Token',
        key: 'tokens',
        dataIndex: 'tokens',
    },
    {
        label: 'Số tiền',
        key: 'tokens',
        dataIndex: 'price',
        render: (value) => formatMoney(value),
    },
];

export function ListRequestHistoryWorkspace() {
    const { page, perPage, setPerPage, setPage } = usePagination();
    const { isLoading, data } = useRequestHistories({ page, perPage });

    return (
        <Card bodyProps={{ p: 0 }}>
            <Table
                isNo
                columns={columns}
                isLoading={isLoading}
                data={data?.requestHistories?.data}
                pagination={{
                    values: data?.requestHistories?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
