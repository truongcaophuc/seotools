import {
    Center,
    useDisclosure,
    Button,
    Avatar,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { HeroIcon, Modal } from '@components/ui';
import { ExclamationCircleIcon } from '@heroicons/react/24/outline';
import { useDeleteImage } from '@share/hooks/image.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    imageId: string;
    imageKey: string;
}

export function DeleteImage({ children, imageKey, imageId }: Props) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { isLoading, mutate } = useDeleteImage();

    function handleDelete() {
        mutate(
            { imageKey, imageId },
            {
                onSuccess() {
                    onClose();
                },
            }
        );
    }

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal isOpen={isOpen} onClose={onToggle} title="Xác nhận">
                <VStack spacing="4">
                    <HeroIcon
                        as={ExclamationCircleIcon}
                        boxSize="12"
                        color="orange.600"
                    />
                    <Text color="gray.500">Bạn chắc chắn muốn xoá ảnh</Text>
                    <HStack>
                        <Button
                            variant="ghost"
                            isDisabled={isLoading}
                            onClick={onToggle}
                        >
                            Huỷ
                        </Button>
                        <Button
                            colorScheme="red"
                            onClick={handleDelete}
                            isLoading={isLoading}
                        >
                            Xoá ảnh
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
