import { Button, HStack, Input, Spacer, VStack } from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddConversation } from '@share/hooks/chatbot.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    callback?: () => void;
    messages: Array<any>;
}

export function FormConversation({ callback, messages }: Props) {
    const { t } = useTranslate();
    const { mutate, isLoading } = useAddConversation();
    const router = useRouter();

    const schema = z.object({
        title: z.string().min(1, t('chatbot.form.title.error.required')),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    function handleCallback() {
        if (callback) {
            callback();
        }
    }

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    title: data.title,
                    items: messages.map((item) => ({
                        message: item.message,
                        createdById: item?.createdBy?.id,
                    })),
                },
            },
            {
                onSuccess(data) {
                    router.push(`/user/chatbot/${data?.addConversation?.id}`);
                    handleCallback();
                },
            }
        );
    });

    return (
        <VStack align="stretch" spacing="5" as="form" onSubmit={onSubmit}>
            <FormField
                label={t('chatbot.form.title.label')}
                error={errors?.title?.message}
                isRequired
            >
                <Input
                    {...register('title')}
                    placeholder={t('chatbot.form.title.placeholder')}
                />
            </FormField>
            <HStack>
                <Spacer />
                <Button
                    onClick={handleCallback}
                    type="button"
                    variant="ghost"
                    isDisabled={isLoading}
                >
                    {t('commons.cancel')}
                </Button>

                <Button type="submit" colorScheme="green" isLoading={isLoading}>
                    {t('commons.add')}
                </Button>
            </HStack>
        </VStack>
    );
}
