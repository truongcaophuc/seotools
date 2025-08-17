import {
    Box,
    Button,
    Collapse,
    HStack,
    Spacer,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {
    Heading,
    HeroIcon,
    RenderListData,
    SearchForm,
    ViewType,
} from '@components/ui';
import { FolderImageInfoFragment, TypeFile } from '@generated/graphql/query';
import { PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useImages } from '@share/hooks/image.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useViewType } from '@share/hooks/use.view-type';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SelectFolderImage } from '../select-folder-image';
import { UploadImage } from '../upload.image';
import { CardImage } from './card.image';
import { createColumnsImage } from './table.image';

interface Props {
    type?: TypeFile;
    folder?: FolderImageInfoFragment;
}

export function ListImage({ type, folder }: Props) {
    const { t } = useTranslate();
    const { viewType, setViewType } = useViewType();
    const { isOpen, onToggle } = useDisclosure();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const [search, setSearch] = useState<string>();

    const [folderId, setFolderId] = useState<string>();

    const { data, isLoading } = useImages({
        page,
        perPage,
        search,
        folderId,
        type,
    });

    useEffect(() => {
        if (folder) {
            setFolderId(folder.id);
        }
    }, [folder]);

    const images = data?.images?.data || [];
    const pagination = data?.images?.pagination;

    const heading =
        type === TypeFile.Document
            ? t('upload.document.folder')
            : t('upload.images.folder');
    const btnText =
        type === TypeFile.Document
            ? t('upload.document.folder')
            : t('upload.images.folder');
    const btnLink =
        type === TypeFile.Document
            ? '/user/upload/document/folder'
            : '/user/upload/image/folder';

    const columns = createColumnsImage(t);

    return (
        <VStack align="stretch" spacing="4">
            <HStack>
                <Heading>{heading}</Heading>
                <Spacer />
                <Button as={Link} href={btnLink} size="sm" variant="outline">
                    {btnText}
                </Button>
                <Button
                    size="sm"
                    onClick={onToggle}
                    colorScheme={isOpen ? 'red' : 'green'}
                    leftIcon={<HeroIcon as={isOpen ? XMarkIcon : PlusIcon} />}
                >
                    {isOpen ? t('commons.exit') : 'Upload'}
                </Button>
            </HStack>
            <Box>
                <Collapse in={isOpen}>
                    <UploadImage
                        isEdit={type !== TypeFile.Document}
                        type={type}
                        folderId={folderId}
                    />
                </Collapse>
            </Box>
            <HStack>
                <SearchForm onSearch={setSearch} />
                {!folder ? (
                    <Box>
                        <SelectFolderImage type={type} onSelect={setFolderId} />
                    </Box>
                ) : null}
                <Spacer />
                <ViewType type={viewType} onChange={setViewType} />
            </HStack>

            <RenderListData
                renderItems={() =>
                    images.map((item) => (
                        <CardImage type={type} key={item.id} image={item} />
                    ))
                }
                columns={columns}
                data={data?.images?.data}
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
