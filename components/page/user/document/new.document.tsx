import { Button, HStack, Input, useDisclosure, VStack } from '@chakra-ui/react';
import { AddButton, AiButton, FormField, Modal } from '@components/ui';
import {
    KeywordInfoFragment,
    TypeAiSettingApp,
} from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateDocument } from '@share/hooks/document.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { SelectKeyword } from '../keyword';
import { AddKeyword } from '../keyword/add.keyword';
import { AIGenerateDocument } from './form.document/ai-generate.document';

interface Props {
    children: ReactElement;
}

export function NewDocument({ children }: Props) {
    const { t } = useTranslate();

    const schema = z.object({
        keywordId: z.string().min(1, t('posts.form.title.error.required')),
        title: z.string().min(1, t('posts.form.keyword.error.required')),
    });

    const [keyword, setKeyword] = useState<KeywordInfoFragment>();
    const router = useRouter();
    const { isOpen, onToggle } = useDisclosure();
    const { mutate, isLoading } = useCreateDocument();
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        watch,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    keywordId: data.keywordId,
                    title: data.title,
                },
            },
            {
                onSuccess(data) {
                    reset();
                    router.push(`/user/document/${data?.createDocument.id}`);
                },
            }
        );
    });

    function handleAddKeyword(value: KeywordInfoFragment) {
        setValue('keywordId', value.id);
        setKeyword(value);
    }

    const keywordId = watch('keywordId');

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}

            <Modal
                title={t('posts.add_post')}
                isOpen={isOpen}
                onClose={onToggle}
            >
                <VStack spacing="6" as="form" onSubmit={onSubmit} noValidate>
                    <FormField label={t('posts.form.keyword.label')} isRequired>
                        <HStack>
                            <SelectKeyword onSelect={handleAddKeyword}>
                                <Input
                                    placeholder={t(
                                        'posts.form.keyword.placeholder'
                                    )}
                                    readOnly
                                    value={keyword?.value}
                                />
                            </SelectKeyword>
                            <AddKeyword callback={handleAddKeyword}>
                                <AddButton
                                    tooltip={t('posts.add_keyword')}
                                    type="button"
                                    aria-label="Add keyword"
                                />
                            </AddKeyword>
                        </HStack>
                        <Input {...register('keywordId')} readOnly hidden />
                    </FormField>

                    <FormField
                        isRequired
                        label={t('posts.form.title.label')}
                        error={errors?.title?.message}
                    >
                        <HStack>
                            <Input
                                {...register('title')}
                                placeholder={t('posts.form.title.placeholder')}
                            />
                            <AIGenerateDocument
                                keyword={keyword?.value}
                                type={TypeAiSettingApp.Title}
                            >
                                <AiButton
                                    isDisabled={!keywordId}
                                    aria-label="Ai"
                                />
                            </AIGenerateDocument>
                        </HStack>
                    </FormField>
                    <Button
                        colorScheme="green"
                        type="submit"
                        isLoading={isLoading}
                    >
                        {t('commons.add')}
                    </Button>
                </VStack>
            </Modal>
        </>
    );
}
