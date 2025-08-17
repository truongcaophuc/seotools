import { Avatar, HStack, MenuItem, Text } from '@chakra-ui/react';
import { Card, MenuAction, TColumn, Table } from '@components/ui';
import {
    BuyWordInfoFragment,
    WorkspaceInfoFragment,
} from '@generated/graphql/query';
import { formatMoney, formatNumber } from '@share/helps/format-number';
import { useListBuyWord } from '@share/hooks/buy-word.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { ConfirmBuyWord } from './confirm.buy-word';

const columns: TColumn<BuyWordInfoFragment> = [
    {
        dataIndex: 'workspace',
        label: 'Workspace',
        key: 'workspace',
        render: (workspace: WorkspaceInfoFragment) => {
            return (
                <HStack>
                    <Avatar size="sm" name={workspace.name} />
                    <Text>{workspace.name}</Text>
                </HStack>
            );
        },
    },
    {
        dataIndex: 'numberWord',
        key: 'numberWord',
        label: 'Số từ',
        render: (value) => formatNumber(value),
    },
    {
        dataIndex: 'price',
        key: 'price',
        label: 'Số tiền',
        render: (value) => formatMoney(value),
    },
    {
        dataIndex: 'createdBy',
        key: 'createdBy',
        label: 'Người tạo',
        render: (value) => value.fullname,
    },
    {
        dataIndex: 'isConfirm',
        key: 'isConfirm',
        label: 'Xác nhận',
        render: (value, root) =>
            value ? 'Đã xác nhận' : root.isCancel ? 'Đã huỷ' : null,
    },
    {
        dataIndex: 'confirmBy',
        key: 'confirmBy',
        label: 'Bởi',
        render: (value) => (value ? value?.fullname : null),
    },
    {
        dataIndex: 'id',
        key: 'action',
        label: '',
        isNumberic: true,
        render: (value) => {
            return (
                <MenuAction>
                    <>
                        <ConfirmBuyWord isConfirm={true} buyWordId={value}>
                            <MenuItem>Xác nhận</MenuItem>
                        </ConfirmBuyWord>
                        <ConfirmBuyWord isConfirm={false} buyWordId={value}>
                            <MenuItem>Huỷ</MenuItem>
                        </ConfirmBuyWord>
                        <MenuItem>Xoá</MenuItem>
                    </>
                </MenuAction>
            );
        },
    },
];

export function ListBuyWord() {
    const { page, perPage, setPage, setPerPage } = usePagination();
    const { isLoading, data } = useListBuyWord({
        page,
        perPage,
    });

    return (
        <Card bodyProps={{ p: 0 }}>
            <Table
                data={data?.listBuyWordAdmin?.data}
                isLoading={isLoading}
                columns={columns}
                pagination={{
                    values: data?.listBuyWordAdmin?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
