import { Checkbox, MenuDivider, Text } from '@chakra-ui/react';
import { MenuAction, MenuItem, Table, TColumn } from '@components/ui';
import { ImageInfoFragment, TypeFile } from '@generated/graphql/query';
import {
    CloudArrowUpIcon,
    EyeIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useImages } from '@share/hooks/image.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { EmbeddingDocument } from '../embedding.document';

export function TableEmbeddingDocument() {
    const { t } = useTranslate();
    const { isLoading, data } = useImages({ type: TypeFile.Document });

    const documents = data?.images?.data || [];
    const pagination = data?.images?.pagination;

    const columns: TColumn<ImageInfoFragment> = [
        {
            key: 'name',
            dataIndex: 'name',
            label: t('commons.table.title'),
            render: (_value, root) => (
                <Text w="250px" whiteSpace="normal" noOfLines={2}>
                    {root.name || root.url}
                </Text>
            ),
        },
        {
            key: 'isEmbedded',
            dataIndex: 'isEmbedded',
            label: t('commons.table.status'),
            render: (value) => <Checkbox size="lg" isChecked={!!value} />,
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
            render: (_, root) => {
                return (
                    <MenuAction>
                        <>
                            <MenuItem icon={EyeIcon}>
                                {t('commons.detail')}
                            </MenuItem>
                            <EmbeddingDocument doc={root}>
                                <MenuItem
                                    icon={CloudArrowUpIcon}
                                    isDisabled={root.isEmbedded}
                                >
                                    {t('commons.sync')}
                                </MenuItem>
                            </EmbeddingDocument>
                            <MenuDivider />
                            <MenuItem icon={TrashIcon}>
                                {t('commons.delete')}
                            </MenuItem>
                        </>
                    </MenuAction>
                );
            },
        },
    ];

    return (
        <Table
            data={documents}
            isLoading={isLoading}
            columns={columns}
            isNo
            pagination={{
                values: pagination,
            }}
        />
    );
}
