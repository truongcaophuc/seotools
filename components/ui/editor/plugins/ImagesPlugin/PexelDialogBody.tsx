import {
    Box,
    Button,
    Center,
    HStack,
    Image,
    Input,
    Spacer,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { SearchForm } from '@components/ui/form';
import { FormField } from '@components/ui/form-field';
import { Loading } from '@components/ui/loading';
import { Modal } from '@components/ui/modal';
import { PexelsInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { usePagination } from '@share/hooks/pagination.hooks';
import { usePexelsPhotos } from '@share/hooks/pexels.hook';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { InsertImagePayload } from '.';
import { Gallery } from '../../ui/Gallery';

const schema = z.object({
    src: z.string(),
    altText: z.string().min(1, 'Nội dung ảnh không được bỏ trống'),
});

type FormImageEditAltData = z.infer<typeof schema>;

function PexelsCardImage({
    image,
    onSelect,
}: {
    image: PexelsInfoFragment;
    onSelect: (image: PexelsInfoFragment) => void;
}) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormImageEditAltData>({
        resolver: zodResolver(schema),
        defaultValues: {
            src: image.src,
            altText: image.alt,
        },
    });

    function handleClick() {
        onOpen();
    }

    const onSubmit = handleSubmit((data) => {
        onSelect(data);
    });

    return (
        <>
            <Box borderWidth="1px" pos="relative" pb="90%">
                <Image
                    onClick={handleClick}
                    pos="absolute"
                    objectFit="contain"
                    src={image.src}
                    alt={image.alt}
                    h="full"
                    w="full"
                />
            </Box>
            <Modal
                size="sm"
                isCentered
                title="Chỉnh sửa nội dung"
                onClose={onClose}
                isOpen={isOpen}
            >
                <form noValidate onSubmit={onSubmit}>
                    <Input isDisabled hidden {...register('src')} isReadOnly />
                    <VStack spacing="5" align="stretch">
                        <FormField
                            isRequired
                            label="Nội dung ảnh"
                            error={errors?.altText?.message}
                        >
                            <Textarea
                                {...register('altText')}
                                placeholder="Chỉnh sửa nội dung ảnh"
                            />
                        </FormField>
                        <HStack>
                            <Spacer />
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={onClose}
                            >
                                Huỷ
                            </Button>
                            <Button type="submit" colorScheme="green">
                                Chèn
                            </Button>
                        </HStack>
                    </VStack>
                </form>
            </Modal>
        </>
    );
}

export function PexelDialogBody({
    onClick,
}: {
    onClick: (payload: InsertImagePayload) => void;
}) {
    const [search, setSearch] = useState<string>();
    const { page, perPage, setPage } = usePagination();
    const { isLoading, data } = usePexelsPhotos({
        search,
        page,
        perPage,
    });

    function handleSelectImage(image: PexelsInfoFragment) {
        onClick({
            src: image.src,
            altText: image?.alt,
        });
    }

    function renderContent() {
        if (isLoading && search && search.length > 0) {
            return (
                <Center minH="300px">
                    <Loading />
                </Center>
            );
        }

        const images = data?.pexelsPhotos?.data || [];

        if (images.length === 0) return <></>;

        return (
            <VStack align="stretch">
                <Gallery onSelectImage={handleSelectImage} images={images} />

                <Center>
                    <Button
                        size="sm"
                        colorScheme="green"
                        onClick={() => setPage(page + 1)}
                    >
                        Tải thêm
                    </Button>
                </Center>
            </VStack>
        );
    }

    return (
        <VStack align="stretch" maxW="1200px" minW="768px">
            <SearchForm onSearch={setSearch} />
            <Box flex="1" minH="300px">
                {renderContent()}
            </Box>
        </VStack>
    );
}
