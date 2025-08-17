import { Box, HStack, MenuItem, Spacer, Text, VStack } from '@chakra-ui/react';
import { HeroIcon, MenuAction } from '@components/ui';
import { FolderImageInfoFragment, TypeFile } from '@generated/graphql/query';
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { DeleteFolderImage } from '../delete-folder-image';

interface Props {
    folderImage: FolderImageInfoFragment;
    type?: TypeFile;
}

export function CardFolderImage({ folderImage, type }: Props) {
    const { t } = useTranslate();

    const isDocument = type === TypeFile.Document;

    return (
        <Box borderWidth="1px" rounded="md">
            <VStack p="3" align="stretch">
                <Box>
                    <Text fontSize="sm" fontWeight="semibold" color="gray.500">
                        {folderImage.name}
                    </Text>

                    <Text as="span" fontSize="xs" color="gray.400">
                        {formatDate(folderImage.createdAt)}
                    </Text>
                </Box>

                <Text fontSize="sm" color="gray.500">
                    {folderImage.description}
                </Text>
            </VStack>

            <HStack bgColor="gray.100" p="3">
                <Text
                    as="span"
                    fontSize="sm"
                    color="gray.600"
                    fontWeight="medium"
                >
                    {folderImage.totalImage}{' '}
                    {isDocument
                        ? t('upload.folder_image.card.document')
                        : t('upload.folder_image.card.image')}
                </Text>
                <Spacer />

                <MenuAction>
                    <>
                        <MenuItem
                            as={Link}
                            href={`/user/upload/${
                                isDocument ? 'document' : 'image'
                            }/folder/${folderImage.id}`}
                            icon={
                                <HeroIcon
                                    transform="translateY(3px)"
                                    as={EyeIcon}
                                />
                            }
                        >
                            {t('commons.detail')}
                        </MenuItem>
                        <DeleteFolderImage folderId={folderImage.id}>
                            <MenuItem
                                icon={
                                    <HeroIcon
                                        transform="translateY(3px)"
                                        as={TrashIcon}
                                    />
                                }
                            >
                                {t('commons.delete')}
                            </MenuItem>
                        </DeleteFolderImage>
                    </>
                </MenuAction>
            </HStack>
        </Box>
    );
}
