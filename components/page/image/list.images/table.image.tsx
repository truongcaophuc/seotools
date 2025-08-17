import { Avatar, Box, HStack, Text } from '@chakra-ui/react';
import {
    CopyBtn,
    DeleteBtn,
    EditBtn,
    Table,
    TableProps,
    TColumn,
} from '@components/ui';
import {
    FolderImageInfoFragment,
    ImageInfoFragment,
} from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { formatUrlImage } from '@share/helps/format-url-image';
import { ReviewImage } from '../review.image';
import { ModalUploadImage } from '../upload.image/modal.upload.image';
import { DeleteImage } from './delete.image';
import { TFunction, useTranslate } from '@share/hooks/translate.hooks';

type Props = Omit<TableProps<ImageInfoFragment>, 'columns'>;

export function createColumnsImage(t: TFunction): TColumn<ImageInfoFragment> {
    return [
        {
            key: 'name',
            dataIndex: 'url',
            label: t('upload.images.table.image'),
            render: (url, root) => {
                return (
                    <ReviewImage imageId={root.id}>
                        <HStack
                            cursor="pointer"
                            whiteSpace="normal"
                            spacing="4"
                        >
                            <Avatar
                                borderRadius="md"
                                src={formatUrlImage(url)}
                            />
                            <Box>
                                <Text
                                    noOfLines={1}
                                    fontSize="sm"
                                    fontWeight="semibold"
                                    color="gray.500"
                                >
                                    {url}
                                </Text>

                                <Text
                                    as="span"
                                    noOfLines={1}
                                    fontSize="sm"
                                    color="gray.400"
                                >
                                    {root.description}
                                </Text>
                            </Box>
                        </HStack>
                    </ReviewImage>
                );
            },
        },
        {
            key: 'folder',
            dataIndex: 'folder',
            label: t('upload.images.table.folder'),
            render: (folder?: FolderImageInfoFragment) => folder?.name,
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
            render: (id, root) => {
                return (
                    <HStack justify="flex-end">
                        <ModalUploadImage type="copy" image={root}>
                            <CopyBtn />
                        </ModalUploadImage>

                        <DeleteImage imageId={id} imageKey={root.url}>
                            <DeleteBtn />
                        </DeleteImage>

                        <ModalUploadImage image={root}>
                            <EditBtn />
                        </ModalUploadImage>
                    </HStack>
                );
            },
        },
    ];
}

export function TableImage(props: Props) {
    const { t } = useTranslate();
    const columns = createColumnsImage(t);

    return <Table {...props} isNo columns={columns} />;
}
