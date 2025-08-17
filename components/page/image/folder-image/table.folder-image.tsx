import { HStack } from '@chakra-ui/react';
import { EditBtn, Table, TableProps, TColumn } from '@components/ui';
import { type FolderImageInfoFragment } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import Link from 'next/link';

export const columnsFolder: TColumn<FolderImageInfoFragment> = [
    {
        key: 'name',
        dataIndex: 'name',
        label: 'Tên',
        render: (name, root) => (
            <Link href={`/user/folder-image/${root.id}`}>{name}</Link>
        ),
    },

    {
        key: 'totalImage',
        dataIndex: 'totalImage',
        label: 'Số lượng ảnh',
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
        render: (id) => {
            return (
                <HStack justify="flex-end">
                    <EditBtn href={`/user/folder-image/${id}`} />
                </HStack>
            );
        },
    },
];

type Props = Omit<TableProps<FolderImageInfoFragment>, 'columns'>;

export function TableFolderImage(props: Props) {
    return <Table {...props} columns={columnsFolder} />;
}
