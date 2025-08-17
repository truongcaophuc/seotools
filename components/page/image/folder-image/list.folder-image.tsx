import { HStack, Spacer, VStack } from '@chakra-ui/react';
import {
    EditBtn,
    RenderListData,
    SearchForm,
    TColumn,
    ViewType,
} from '@components/ui';
import { FolderImageInfoFragment, TypeFile } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { useFolderImages } from '@share/hooks/image.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useViewType } from '@share/hooks/use.view-type';
import Link from 'next/link';
import { useState } from 'react';
import { CardFolderImage } from './card.folder-image';

interface Props {
    type?: TypeFile;
}

export function ListFolderImage({ type }: Props) {
    const { t } = useTranslate();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const [search, setSearch] = useState<string>();
    const { viewType, setViewType } = useViewType();
    const { isLoading, data } = useFolderImages({
        page,
        perPage,
        search,
        type,
    });

    const folders = data?.folderImages?.data || [];
    const pagination = data?.folderImages?.pagination;

    const columnsFolder: TColumn<FolderImageInfoFragment> = [
        {
            key: 'name',
            dataIndex: 'name',
            label: t('upload.folder_image.table.name'),
            render: (name, root) => (
                <Link href={`/user/folder-image/${root.id}`}>{name}</Link>
            ),
        },

        {
            key: 'totalImage',
            dataIndex: 'totalImage',
            label: t('upload.folder_image.table.quantity_image'),
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
            render: (id) => {
                return (
                    <HStack justify="flex-end">
                        <EditBtn href={`/user/folder-image/${id}`} />
                    </HStack>
                );
            },
        },
    ];

    return (
        <VStack spacing="4" align="stretch">
            <HStack>
                <SearchForm onSearch={setSearch} />
                <Spacer />
                <ViewType type={viewType} onChange={setViewType} />
            </HStack>
            <RenderListData
                renderItems={() =>
                    folders.map((item) => (
                        <CardFolderImage
                            type={type}
                            key={item.id}
                            folderImage={item}
                        />
                    ))
                }
                columns={columnsFolder}
                data={folders}
                isLoading={isLoading}
                pagination={{
                    values: pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
                viewType={viewType}
            />
        </VStack>
    );
}
