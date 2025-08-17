import {
    Box,
    Button,
    Center,
    Flex,
    HStack,
    IconButton,
    Image,
    SimpleGrid,
    Skeleton,
    Spinner,
    Text,
    TextProps,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { CardImage } from '@components/page/image/list.images/card.image';
import { UploadImage } from '@components/page/image/upload.image';
import { ModalUploadImage } from '@components/page/image/upload.image/modal.upload.image';
import { AddButton } from '@components/ui/button';
import { SearchForm } from '@components/ui/form';
import { HeroIcon } from '@components/ui/icon';
import { Modal } from '@components/ui/modal';
import { ImageInfoFragment } from '@generated/graphql/query';
import { PencilIcon } from '@heroicons/react/24/solid';
import { formatUrlImage } from '@share/helps/format-url-image';
import { useFolderImages, useImages } from '@share/hooks/image.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { debounce } from 'lodash';
import { cloneElement, ReactElement, useState } from 'react';
import { InsertImagePayload } from '.';

// function ImageCard({
//     image,
//     onSelect,
// }: {
//     image: ImageInfoFragment;
//     onSelect: (image: ImageInfoFragment) => void;
// }) {
//     const handleClick = () => {
//         onSelect(image);
//     };
//
//     function handleEditImage() {}
//
//     const src = formatUrlImage(image.url);
//
//     return (
//         <Box
//             pb="100%"
//             rounded="md"
//             borderWidth="1px"
//             pos="relative"
//             cursor="pointer"
//             overflow="hidden"
//         >
//             <Image
//                 rounded="md"
//                 pos="absolute"
//                 objectFit="cover"
//                 w="full"
//                 h="full"
//                 alt=""
//                 src={src}
//                 onClick={handleClick}
//             />
//
//             <ModalUploadImage image={image}>
//                 <IconButton
//                     onClick={handleEditImage}
//                     pos="absolute"
//                     right="0"
//                     variant="ghost"
//                     size="sm"
//                     aria-label="Edit image"
//                     icon={
//                         <HeroIcon color="green" boxSize="4" as={PencilIcon} />
//                     }
//                 />
//             </ModalUploadImage>
//
//             <Box
//                 pos="absolute"
//                 bottom="0"
//                 left="0"
//                 right="0"
//                 zIndex="100"
//                 bgColor="gray.100"
//                 px="2"
//                 textAlign="center"
//                 fontWeight="medium"
//             >
//                 <Text as="small" noOfLines={1}>
//                     {image.name || image.description}
//                 </Text>
//             </Box>
//         </Box>
//     );
// }

function FolderImage({
    label,
    id,
    onSelect,
    active,
}: {
    label: string;
    id: string;
    active: boolean;
    onSelect: (id: string) => void;
}) {
    const props: TextProps = {
        fontWeight: active ? 'medium' : 'normal',
        fontSize: 'sm',
        color: active ? 'gray.600' : 'gray.400',
    };

    const handleSelect = () => {
        onSelect(id);
    };

    return (
        <Text {...props} noOfLines={1} onClick={handleSelect} cursor="pointer">
            {label}
        </Text>
    );
}

function FolderImages({
    folderId,
    onSelect,
}: {
    folderId: string;
    onSelect: (id: string) => void;
}) {
    const { isLoading, data } = useFolderImages({ perPage: 100 });

    return (
        <Box borderRightWidth="1px" w="150px" flexShrink="0" pr="15px">
            <Skeleton isLoaded={!isLoading}>
                <VStack align="stretch">
                    <FolderImage
                        onSelect={onSelect}
                        label="Tất cả"
                        id="all"
                        active={folderId === 'all'}
                    />
                    {data?.folderImages?.data.map((item) => (
                        <FolderImage
                            label={item.name}
                            id={item.id}
                            active={folderId === item.id}
                            onSelect={onSelect}
                        />
                    ))}
                </VStack>
            </Skeleton>
        </Box>
    );
}

function UploadNewImage({ children }: { children: ReactElement }) {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal title="Thêm hình ảnh" isOpen={isOpen} onClose={onToggle}>
                <UploadImage callback={onToggle} />
            </Modal>
        </>
    );
}

export function GalleryDialogBody({
    onClick,
}: {
    onClick: (payload: InsertImagePayload) => void;
}) {
    const { page, setPage, perPage } = usePagination();
    const [folderId, setFolderId] = useState<string>('all');
    const [search, setSearch] = useState<string | undefined>();

    const { isLoading, data } = useImages({
        search,
        page,
        perPage,
        folderId: folderId === 'all' ? undefined : folderId,
    });

    const handleSearch = debounce((value) => {
        setSearch(value);
    }, 500);

    const handleSelectImage = (image: ImageInfoFragment) => {
        onClick({
            src: formatUrlImage(image.src),
            altText: image?.description || '',
        });
    };

    const handleNext = () => {
        setPage(page - 1);
    };

    const renderContent = () => {
        const images = data?.images?.data || [];
        if (images.length === 0) {
            return (
                <Box>
                    <Text fontSize="sm" color="gray.500">
                        Không có hình ảnh
                    </Text>
                </Box>
            );
        }

        const pagination = data?.images?.pagination;
        const totalPage = Math.ceil(pagination?.total / perPage);

        return (
            <VStack align="stretch" spacing="6">
                <SimpleGrid columns={7} gap="3">
                    {images.map((item) => (
                        <CardImage
                            key={item.id}
                            image={item}
                            onSelect={handleSelectImage}
                        />
                    ))}
                </SimpleGrid>
                {isLoading && <Spinner />}
                {totalPage > 1 && (
                    <Center>
                        <HStack>
                            <Button
                                disabled={pagination?.page === 1}
                                onClick={handleNext}
                            >
                                Trở lại
                            </Button>
                            <Button
                                disabled={pagination?.page === totalPage}
                                onClick={handleNext}
                            >
                                Tiếp
                            </Button>
                        </HStack>
                    </Center>
                )}
            </VStack>
        );
    };
    return (
        <Flex gap="10">
            <FolderImages folderId={folderId} onSelect={setFolderId} />
            <VStack align="stretch" spacing="4" maxW="1200px" minW="768px">
                <HStack>
                    <SearchForm onSearch={handleSearch} />

                    <UploadNewImage>
                        <AddButton aria-label="Add image" />
                    </UploadNewImage>
                </HStack>
                {renderContent()}
            </VStack>
        </Flex>
    );
}
