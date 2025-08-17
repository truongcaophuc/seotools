import { MenuItem } from '@chakra-ui/react';
import { Card, MenuAction, Table, TableProps, TColumn } from '@components/ui';
import { PageChannelInfoFragment } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { useTranslate } from '@share/hooks/translate.hooks';
import { DeletePageChannel } from '../delete-page-channel';
import { PageChannelStatus } from '../page-channel-status';
import { UpdatePageWordpress } from './upadte-page.wordpress';

interface Props extends Omit<TableProps<PageChannelInfoFragment>, 'columns'> {}

export function ListPageWordpress(props: Props) {
    const { t } = useTranslate();

    const columns: TColumn<PageChannelInfoFragment> = [
        {
            key: 'name',
            dataIndex: 'name',
            label: t('utilities.table.name'),
        },
        {
            key: 'username',
            dataIndex: 'username',
            label: t('utilities.table.username'),
        },
        {
            key: 'url',
            dataIndex: 'url',
            label: t('utilities.table.url'),
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            label: t('utilities.table.status'),
            render: (isActive, root) => {
                return <PageChannelStatus pageId={root.id} status={isActive} />;
            },
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            label: t('commons.table.createdAt'),
            render: formatDate,
        },
        {
            key: 'action',
            dataIndex: 'id',
            label: '',
            isNumberic: true,
            render: (value, root) => {
                return (
                    <MenuAction>
                        <>
                            <UpdatePageWordpress page={root}>
                                <MenuItem>{t('commons.edit')}</MenuItem>
                            </UpdatePageWordpress>

                            <DeletePageChannel pageId={value}>
                                <MenuItem>{t('commons.delete')}</MenuItem>
                            </DeletePageChannel>
                        </>
                    </MenuAction>
                );
            },
        },
    ];

    return (
        <Card bodyProps={{ p: 0 }}>
            <Table {...props} columns={columns} />
        </Card>
    );
}
