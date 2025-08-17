import { MenuItem } from '@chakra-ui/react';
import { Card, MenuAction, Table, TColumn, WarningModal } from '@components/ui';
import { StyleContentInfoFragment } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import {
    useDeleteStyleContent,
    useStyleContents,
} from '@share/hooks/style-content.hooks';
import { ReactElement } from 'react';
import { UpdateStyleContent } from './update.style-content';

function DeleteStyleContent({
    children,
    id,
}: {
    id: string;
    children: ReactElement;
}) {
    const { isLoading, mutate, isSuccess } = useDeleteStyleContent();

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            content="Bạn chắc chắn muốn xoá phong cách này?"
            type="warning"
            okProps={{
                async onOk() {
                    mutate({
                        id,
                    });
                },
            }}
        >
            {children}
        </WarningModal>
    );
}

const columns: TColumn<StyleContentInfoFragment> = [
    {
        dataIndex: 'label',
        key: 'label',
        label: 'Tên',
    },
    {
        dataIndex: 'value',
        key: 'value',
        label: 'Giá trị',
    },
    {
        dataIndex: 'createdAt',
        key: 'createdAt',
        label: 'Ngày tạo',
        render: formatDate,
    },
    {
        dataIndex: 'id',
        key: 'action',
        label: '',
        isNumberic: true,
        render: (id, root) => {
            return (
                <MenuAction>
                    <>
                        <UpdateStyleContent styleContent={root}>
                            <MenuItem>Chỉnh sửa</MenuItem>
                        </UpdateStyleContent>
                        <DeleteStyleContent id={id}>
                            <MenuItem>Xoá</MenuItem>
                        </DeleteStyleContent>
                    </>
                </MenuAction>
            );
        },
    },
];

export function ListStyleContent() {
    const { isLoading, data } = useStyleContents();

    const styleContents = data?.styleContents;

    return (
        <Card bodyProps={{ p: 0 }}>
            <Table
                isLoading={isLoading}
                columns={columns}
                data={styleContents}
            />
        </Card>
    );
}
