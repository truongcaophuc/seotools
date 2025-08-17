import { Button, HStack, Input, useDisclosure, VStack } from '@chakra-ui/react';
import { AddButton, FormField, Modal } from '@components/ui';
import { KeywordInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddKeyword } from '@share/hooks/keyword.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    keywordId?: string;
    children?: ReactElement;
    callback?: (value: KeywordInfoFragment) => void;
}

export function AddKeyword({
    children = <AddButton aria-label="Add keyword" />,
    keywordId,
    callback,
}: Props) {
    const { isLoading, mutate } = useAddKeyword();
    const { isOpen, onToggle } = useDisclosure();

    const { t } = useTranslate();

    const schema = z.object({
        value: z.string().min(1, t('keywords.form.value.error.required')),
    });

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit(function (data) {
        mutate(
            {
                input: {
                    value: data.value,
                    parentId: keywordId,
                },
            },
            {
                onSuccess(data) {
                    if (callback) {
                        callback(data?.addKeyword);
                    }
                    onToggle();
                },
            }
        );
    });

    function handleToggle() {
        reset();
        onToggle();
    }

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}

            <Modal
                title={t('keywords.form.title')}
                isOpen={isOpen}
                onClose={handleToggle}
            >
                <VStack as="form" spacing="5" noValidate onSubmit={onSubmit}>
                    <FormField
                        isRequired
                        label={t('keywords.form.value.label')}
                        error={errors?.value?.message}
                    >
                        <Input
                            placeholder={t('keywords.form.value.placeholder')}
                            {...register('value')}
                        />
                    </FormField>

                    <HStack>
                        <Button
                            variant="ghost"
                            type="button"
                            onClick={onToggle}
                            isDisabled={isLoading}
                        >
                            {t('commons.cancel')}
                        </Button>

                        <Button
                            isLoading={isLoading}
                            colorScheme="green"
                            type="submit"
                        >
                            {t('commons.add')}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
