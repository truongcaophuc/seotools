import { Box, MenuItem, Tag, Text, VStack } from '@chakra-ui/react';
import { MenuAction, Table, TableProps, TColumn } from '@components/ui';
import {
    PackageItemInfoFragment,
    PackageType,
    PaymentHistoryInfoFragment,
} from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { formatMoney } from '@share/helps/format-number';

interface Props
    extends Omit<TableProps<PaymentHistoryInfoFragment>, 'columns'> {}

const columns: TColumn<PaymentHistoryInfoFragment> = [
    {
        label: 'Gói',
        dataIndex: 'packageItem',
        key: 'packageItem',
        render: (value: PackageItemInfoFragment) => {
            if (!value) return null;
            const colorScheme =
                value.packageParent?.type === PackageType.Premium
                    ? 'green'
                    : 'orange';
            return (
                <VStack align="stretch">
                    <Box>
                        <Tag size="sm" colorScheme={colorScheme}>
                            {value?.packageParent?.name}
                        </Tag>
                    </Box>
                    <Text as="span">{value.packagePeriod?.name}</Text>
                </VStack>
            );
        },
    },
    {
        label: 'Giá trị',
        dataIndex: 'amount',
        key: 'amount',
        render: (value) => formatMoney(value),
    },
    {
        label: 'Loại thanh toán',
        dataIndex: 'transactionType',
        key: 'transactionType',
        render: (value) => {
            return (
                <Tag size="sm" colorScheme="blue">
                    Chuyển khoản
                </Tag>
            );
        },
    },
    {
        label: 'Trạng thái',
        dataIndex: 'isConfirm',
        key: 'isConfirm',
        render: (value) => {
            if (value)
                return (
                    <Tag colorScheme="green" size="sm">
                        Đã xác nhận
                    </Tag>
                );
            return (
                <Tag colorScheme="red" size="sm">
                    Chưa xác nhận
                </Tag>
            );
        },
    },
    {
        label: 'Ngày tạo',
        dataIndex: 'createdAt',
        key: 'createdAt',
        render: formatDate,
    },
    {
        label: 'Ngày xác nhận',
        dataIndex: 'confirmAt',
        key: 'confirmAt',
        render: (value) => {
            if (!value)
                return (
                    <Text fontSize="sm" color="gray.400">
                        Chưa xác nhận
                    </Text>
                );
            return formatDate(value);
        },
    },
    {
        label: '',
        dataIndex: 'id',
        key: 'action',
        isNumberic: true,
        render: (_id, root) => {
            return (
                <MenuAction>
                    <>
                        <MenuItem isDisabled={root.isConfirm || root.isCancel}>
                            Huỷ
                        </MenuItem>
                    </>
                </MenuAction>
            );
        },
    },
    // {
    //     label: '',
    //     dataIndex: 'id',
    //     key: 'action',
    //     isNumberic: true,
    //     render: (value, root) => {
    //         return <MenuAction paymentHistory={root} />;
    //     },
    // },
];

export function TablePaymentHistory(props: Props) {
    return <Table columns={columns} {...props} />;
}
