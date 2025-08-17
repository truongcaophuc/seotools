import { Switch } from '@chakra-ui/react';
import { DeleteBtn, Table, TColumn, type TableProps } from '@components/ui';
import { ProjectInfoFragment } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { TFunction, useTranslate } from '@share/hooks/translate.hooks';
import { ChangeDefaultProject } from './change-default.project';
import { DeleteProject } from './delete.project';

interface Props extends Omit<TableProps<ProjectInfoFragment>, 'columns'> {
    isShort?: boolean;
}

export function getColumnProject(t: TFunction): TColumn<ProjectInfoFragment> {
    return [
        { key: 'name', dataIndex: 'name', label: t('team.project.table.name') },
        {
            key: 'default',
            dataIndex: 'default',
            label: t('commons.default'),
            render: (_data, root) => <ChangeDefaultProject project={root} />,
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            label: t('commons.table.createdAt'),
            isNumberic: true,
            render: formatDate,
        },
        {
            key: 'action',
            dataIndex: 'id',
            label: '',
            isNumberic: true,
            render: (value) => {
                return (
                    <DeleteProject projectId={value}>
                        <DeleteBtn />
                    </DeleteProject>
                );
            },
        },
    ];
}

export function TableProject({ isShort, ...props }: Props) {
    const { t } = useTranslate();

    const columnShort: TColumn<ProjectInfoFragment> = [
        { key: 'name', dataIndex: 'name', label: t('team.project.table.name') },
        {
            key: 'default',
            dataIndex: 'default',
            label: t('commons.default'),
            render: (data) => <Switch isChecked={data} />,
        },
    ];

    const columnProjectLong = getColumnProject(t);

    const columns = isShort ? columnShort : columnProjectLong;
    return <Table {...props} columns={columns} />;
}
