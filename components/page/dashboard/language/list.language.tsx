import { MenuItem, Switch } from '@chakra-ui/react';
import { Card, MenuAction, Table, TColumn, WarningModal } from '@components/ui';
import { LanguageInfoFragment } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { useDeleteLanguage, useLanguages } from '@share/hooks/language.hooks';
import { ReactElement } from 'react';
import { UpdateLanguage } from './update.language';

function DeleteLanguage({
    children,
    id,
}: {
    id: string;
    children: ReactElement;
}) {
    const { isLoading, mutate, isSuccess } = useDeleteLanguage();

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            content="Bạn chắc chắn muốn xoá ngôn ngữ này?"
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

const columns: TColumn<LanguageInfoFragment> = [
    {
        key: 'label',
        dataIndex: 'label',
        label: 'Tên',
    },
    {
        key: 'value',
        dataIndex: 'value',
        label: 'Giá trị',
    },
    {
        key: 'isDefault',
        dataIndex: 'isDefault',
        label: 'Mặc định',
        render: (value) => <Switch isChecked={value} />,
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
                        <UpdateLanguage language={root}>
                            <MenuItem>Chỉnh sửa</MenuItem>
                        </UpdateLanguage>
                        <DeleteLanguage id={id}>
                            <MenuItem>Xoá</MenuItem>
                        </DeleteLanguage>
                    </>
                </MenuAction>
            );
        },
    },
];

export function ListLanguage() {
    const { isLoading, data } = useLanguages();
    const listLanguage = data?.languages || [];

    return (
        <Card bodyProps={{ p: 0 }}>
            <Table
                columns={columns}
                data={listLanguage}
                isLoading={isLoading}
            />
        </Card>
    );
}
