import {
    Button,
    HStack,
    Input,
    Spacer,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal } from '@components/ui';
import { TypeFile } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddFolderImage } from '@share/hooks/image.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
    type?: TypeFile;
}

export function AddFolderImage({ children, type }: Props) {
    const { t } = useTranslate();
    const schema = z.object({
        name: z
            .string()
            .min(1, t('upload.folder_image.form.name.error.required')),
        description: z.string().optional(),
    });

    const { isLoading, mutate } = useAddFolderImage();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    function handleClose() {
        if (isLoading) return;
        reset();
        onClose();
    }

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    name: data?.name,
                    type,
                },
            },
            {
                onSuccess() {
                    handleClose();
                },
            }
        );
    });

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal
                title={t('upload.folder_image.title')}
                isOpen={isOpen}
                onClose={handleClose}
            >
                <VStack
                    align="stretch"
                    as="form"
                    spacing="5"
                    noValidate
                    onSubmit={onSubmit}
                >
                    <FormField
                        isRequired
                        label={t('upload.folder_image.form.name.label')}
                        error={errors?.name?.message}
                    >
                        <Input
                            placeholder={t(
                                'upload.folder_image.form.name.placeholder'
                            )}
                            {...register('name')}
                        />
                    </FormField>
                    <FormField
                        label={t('upload.folder_image.form.description.label')}
                        error={errors?.description?.message}
                    >
                        <Textarea
                            placeholder={t(
                                'upload.folder_image.form.description.placeholder'
                            )}
                            {...register('description')}
                        />
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            onClick={handleClose}
                            variant="ghost"
                            isDisabled={isLoading}
                            type="button"
                        >
                            {t('commons.cancel')}
                        </Button>
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            colorScheme="green"
                        >
                            {t('commons.add')}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
