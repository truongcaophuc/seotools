import { Box, Center, Image, MenuItem, Text, VStack } from '@chakra-ui/react';
import { HeroIcon, MenuAction } from '@components/ui';
import { ImageInfoFragment, TypeFile } from '@generated/graphql/query';
import {
    DocumentDuplicateIcon,
    DocumentTextIcon,
    FolderIcon,
    PencilSquareIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import { formatUrlImage } from '@share/helps/format-url-image';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ModalUploadImage } from '../upload.image/modal.upload.image';
import { DeleteImage } from './delete.image';

interface Props {
    image: ImageInfoFragment;
    onSelect?: (image: ImageInfoFragment) => void;
    type?: TypeFile;
}

export function CardImage({ image, onSelect, type }: Props) {
    const { t } = useTranslate();

    function handleImageClick() {
        if (onSelect) {
            onSelect(image);
        }
    }

    function renderThumbnail() {
        if (type === TypeFile.Document) {
            return (
                <Box
                    borderWidth="1px"
                    pos="relative"
                    pb="90%"
                    rounded="md"
                    overflow="hidden"
                >
                    <Center pos="absolute" top="0" left="0" h="full" w="full">
                        <HeroIcon as={DocumentTextIcon} boxSize="10" />
                    </Center>
                </Box>
            );
        }
        return (
            <Box
                onClick={handleImageClick}
                cursor="pointer"
                borderWidth="1px"
                pos="relative"
                pb="90%"
                rounded="md"
                overflow="hidden"
            >
                <Image
                    objectFit="contain"
                    pos="absolute"
                    top="0"
                    left="0"
                    h="full"
                    w="full"
                    src={formatUrlImage(image.src)}
                />
            </Box>
        );
    }

    return (
        <VStack align="stretch" pos="relative">
            {renderThumbnail()}
            <Text noOfLines={2} fontSize="sm" color="gray.500">
                {image.name || image.url}
            </Text>

            <Box pos="absolute" right="10px" top="0">
                <MenuAction>
                    <>
                        {type !== TypeFile.Document ? (
                            <>
                                <ModalUploadImage type="update" image={image}>
                                    <MenuItem
                                        fontSize="sm"
                                        icon={
                                            <HeroIcon as={PencilSquareIcon} />
                                        }
                                    >
                                        {t('commons.edit')}
                                    </MenuItem>
                                </ModalUploadImage>
                                <ModalUploadImage type="copy" image={image}>
                                    <MenuItem
                                        fontSize="sm"
                                        icon={
                                            <HeroIcon
                                                as={DocumentDuplicateIcon}
                                            />
                                        }
                                    >
                                        {t('commons.copy')}
                                    </MenuItem>
                                </ModalUploadImage>
                            </>
                        ) : (
                            <>
                                {!image?.folder ? (
                                    <MenuItem
                                        fontSize="sm"
                                        icon={<HeroIcon as={FolderIcon} />}
                                    >
                                        {t('upload.commons.folder')}
                                    </MenuItem>
                                ) : null}
                            </>
                        )}

                        <DeleteImage imageId={image.id} imageKey={image.url}>
                            <MenuItem
                                fontSize="sm"
                                icon={<HeroIcon as={TrashIcon} />}
                            >
                                {t('commons.delete')}
                            </MenuItem>
                        </DeleteImage>
                    </>
                </MenuAction>
            </Box>
        </VStack>
    );
}
