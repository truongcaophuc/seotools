import { MenuItem, Text } from '@chakra-ui/react';
import { MenuAction, TColumn, Table, TableProps } from '@components/ui';
import { ServiceDashboardInfoFragment } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { useTranslate } from '@share/hooks/translate.hooks';
import { DeleteService } from './delete.service';
import { EditService } from './edit.service';

interface Props
    extends Omit<TableProps<ServiceDashboardInfoFragment>, 'columns'> {}

export function TableService({ data = [], ...props }: Props) {
    const { t } = useTranslate();

    const columns: TColumn<ServiceDashboardInfoFragment> = [
        { key: 'title', dataIndex: 'title', label: 'Tên' },
        {
            key: 'category',
            dataIndex: 'category',
            label: 'Nhóm dịch vụ',
            render: (data) => data?.title,
        },
        {
            key: 'leadingSentence',
            dataIndex: 'leadingSentence',
            label: 'Câu dẫn dắt',
            render: (data) => (
                <Text maxWidth="250px" whiteSpace="initial" noOfLines={1}>
                    {data}
                </Text>
            ),
        },

        {
            key: 'customFields',
            dataIndex: 'customFields',
            label: 'Custom Field',
            render: (data) => (
                <Text maxWidth="250px" whiteSpace="initial">
                    {data.map((item) => item.title).join(', ')}
                </Text>
            ),
        },
        { key: 'model', dataIndex: 'model', label: 'Model' },
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
            isNumberic: true,
            render: (id, root) => (
                <MenuAction>
                    <EditService service={root}>
                        <MenuItem>{t('commons.edit')}</MenuItem>
                    </EditService>
                    <DeleteService id={id}>
                        <MenuItem>{t('commons.delete')}</MenuItem>
                    </DeleteService>
                </MenuAction>
            ),
        },
    ];
    return <Table isNo {...props} columns={columns} data={data} />;
}
