import { Button, Input, VStack, Text, Box } from '@chakra-ui/react';
import { Captcha, FormField } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForgotPassword } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function FormForgotPassword() {
    const { t } = useTranslate();

    const schema = z
        .object({
            email: z.string().email(t('auth.form.email.error.format')),
            captcha: z.string(),
            reCaptcha: z.string().min(6, t('auth.form.captcha.error.required')),
        })
        .refine((data) => data.captcha === data.reCaptcha, {
            message: t('auth.captcha.error.match'),
            path: ['reCaptcha'],
        });
    const { isLoading, isSuccess, mutate } = useForgotPassword();
    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({ resolver: zodResolver(schema) });

    const handleSetCaptcha = (value: string) => {
        setValue('captcha', value);
    };

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: { email: data.email },
            },
            {
                onSuccess() {
                    reset();
                },
            }
        );
    });

    return (
        <VStack
            align="stretch"
            spacing="5"
            as="form"
            noValidate
            onSubmit={onSubmit}
        >
            {isSuccess ? (
                <Box
                    borderWidth="1px"
                    rounded="md"
                    p="4"
                    borderColor="green.600"
                    bgColor="green.50"
                >
                    <Text color="green.600" fontSize="sm" fontWeight="medium">
                        {t('auth.forgotPassword.message.success')}
                    </Text>
                </Box>
            ) : null}

            <FormField
                isRequired
                label={t('auth.form.email.label')}
                error={errors?.email?.message}
            >
                <Input
                    {...register('email')}
                    placeholder={t('auth.form.email.placeholder')}
                />
            </FormField>

            <Input hidden isReadOnly {...register('captcha')} />

            <FormField
                label={t('auth.form.captcha.label')}
                isRequired
                error={errors?.reCaptcha?.message}
            >
                <VStack align="stretch">
                    <Captcha onChangeCaptcha={handleSetCaptcha} />
                    <Input
                        placeholder={t('auth.form.captcha.placeholder')}
                        {...register('reCaptcha')}
                    />
                </VStack>
            </FormField>
            <Button colorScheme="green" isLoading={isLoading} type="submit">
                {t('auth.commons.send_request')}
            </Button>
        </VStack>
    );
}
