import { HStack, MenuItem, Tag, Text, VStack } from '@chakra-ui/react';
import { MenuAction, Table, TableProps, TColumn } from '@components/ui';
import {
    PackageItemInfoFragment,
    PackageType,
    PaymentHistoryInfoFragment,
    UserInfoFragment,
} from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { formatMoney } from '@share/helps/format-number';
import { ConfirmPayment } from '../confirm.payment';
import { CancelPayment } from './cancel.payment';
import { DeletePayment } from './delete.payment';

interface Props
    extends Omit<TableProps<PaymentHistoryInfoFragment>, 'columns'> {}

const columns: TColumn<PaymentHistoryInfoFragment> = [
    {
        key: 'createdBy',
        dataIndex: 'createdBy',
        label: 'Người dùng',
        render: (value: UserInfoFragment) => {
            return (
                <HStack>
                    <Text>{value.fullname}</Text>
                </HStack>
            );
        },
    },
    {
        key: 'packageType',
        dataIndex: 'packageItem',
        label: 'Gói',
        render: (value: PackageItemInfoFragment) => {
            if (!value) return null;
            const colorScheme =
                value.packageParent?.type === PackageType.Premium
                    ? 'green'
                    : 'orange';
            return (
                <VStack align="stretch">
                    <Tag colorScheme={colorScheme} size="sm">
                        {value.packageParent?.name}
                    </Tag>
                    <Text>{value.packagePeriod?.name}</Text>
                </VStack>
            );
        },
    },
    {
        key: 'amount',
        dataIndex: 'amount',
        label: 'Giá trị (vnd)',
        render: (value) => formatMoney(value, ''),
    },
    {
        key: 'isConfirm',
        dataIndex: 'isConfirm',
        label: 'Trạng thái',
        render: (value, { isCancel }) => {
            const label = value
                ? 'Đã xác nhận'
                : isCancel
                ? 'Đã huỷ'
                : 'Chưa xác nhận';
            const colorScheme = value ? 'green' : isCancel ? 'red' : 'orange';

            return (
                <Tag size="sm" colorScheme={colorScheme}>
                    {label}
                </Tag>
            );
        },
    },
    {
        key: 'transactionType',
        dataIndex: 'transactionType',
        label: 'Hình thức t/t',
    },
    {
        key: 'createdAt',
        dataIndex: 'createdAt',
        label: 'Ngày tạo',
        render: formatDate,
    },
    {
        key: 'confirmAt',
        dataIndex: 'confirmAt',
        label: 'Ngày xác nhận',
        render: (value) => (value ? formatDate(value) : null),
    },
    {
        key: 'confirmBy',
        dataIndex: 'confirmBy',
        label: 'Nhân viên xác nhận',
        render: (value) => {
            return value?.fullname;
        },
    },
    {
        key: 'action',
        dataIndex: 'id',
        label: '',
        isNumberic: true,
        render: (_, root) => {
            const isShowAction = root.isConfirm || root.isCancel;
            return (
                <>
                    <MenuAction>
                        <>
                            {isShowAction ? null : (
                                <>
                                    <ConfirmPayment payment={root}>
                                        <MenuItem>Xác nhận</MenuItem>
                                    </ConfirmPayment>
                                    <CancelPayment paymentHistoryId={root.id}>
                                        <MenuItem>Huỷ</MenuItem>
                                    </CancelPayment>
                                </>
                            )}
                            <DeletePayment paymentHistoryId={root.id}>
                                <MenuItem>Xoá</MenuItem>
                            </DeletePayment>
                        </>
                    </MenuAction>
                </>
            );
        },
    },
];

export function TablePayment(props: Props) {
    return <Table {...props} columns={columns} />;
}
