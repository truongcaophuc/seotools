import {
    Box,
    Button,
    HStack,
    Image,
    Input,
    Spacer,
    Textarea,
    VStack,
    useDisclosure,
    MenuIcon,
    MenuItem,
} from '@chakra-ui/react';
import { FormField } from '@components/ui/form-field';
import { MenuAction } from '@components/ui/menu-action';
import { Modal } from '@components/ui/modal';
import { PexelsInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    src: z.string(),
    altText: z.string().min(1, 'Nội dung ảnh không được bỏ trống'),
});

type FormImageEditAltData = z.infer<typeof schema>;

interface Props {
    image: PexelsInfoFragment;
    onSelect: (image: PexelsInfoFragment) => void;
    isEdit?: boolean;
}

export function ImageCard({ image, onSelect, isEdit }: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const [isHover, setIsHover] = useState<boolean>(false);

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

    const onMouseEnter = useCallback(() => {
        setIsHover(true);
    }, []);

    const onMouseLeave = useCallback(() => {
        setIsHover(false);
    }, []);

    return (
        <>
            <Box
                pos="relative"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                rounded="md"
                borderWidth="1px"
                pb="90%"
            >
                <Image
                    onClick={handleClick}
                    pos="absolute"
                    cursor="pointer"
                    objectFit="contain"
                    src={image.src}
                    alt={image.alt}
                    h="full"
                    w="full"
                />

                {isHover && isEdit ? (
                    <Box pos="absolute" right="1" top="1">
                        <MenuAction>
                            <>
                                <MenuItem>dasd</MenuItem>
                            </>
                        </MenuAction>
                    </Box>
                ) : null}
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
