import {
    Button,
    HStack,
    Input,
    Spacer,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal } from '@components/ui';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useUpdateContent } from '@share/hooks/content.hooks';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';

export function NewContentFormAi({ children }: { children: ReactElement }) {
    const router = useRouter();
    const { isOpen, onToggle, onClose } = useDisclosure();
    const [editor] = useLexicalComposerContext();
    const { isLoading, mutate } = useUpdateContent();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<{ title: string }>();

    const onSubmit = handleSubmit((data) => {
        const content = JSON.stringify(editor.getEditorState());
        const serviceId = router.query.id ? router.query.id.toString() : null;

        if (serviceId) {
            mutate(
                {
                    input: {
                        serviceId,
                        title: data.title,
                        content,
                    },
                },
                {
                    onSuccess() {
                        onClose();
                        router.push('/user/ai');
                    },
                }
            );
        }
    });

    function handleClose() {
        if (isLoading) return;
        onClose();
    }

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal title="Thêm nội dung" isOpen={isOpen} onClose={handleClose}>
                <VStack
                    spacing="4"
                    as="form"
                    align="stretch"
                    onSubmit={onSubmit}
                >
                    <FormField
                        isRequired
                        label="Tên nội dung"
                        error={errors?.title?.message}
                    >
                        <Input
                            placeholder="Điền tên nội dung"
                            {...register('title')}
                        />
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            isDisabled={isLoading}
                            variant="ghost"
                            type="button"
                        >
                            Huỷ
                        </Button>
                        <Button
                            colorScheme="green"
                            isLoading={isLoading}
                            type="submit"
                        >
                            Lưu
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
