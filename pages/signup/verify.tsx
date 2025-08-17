import {
    AlertDescription,
    AlertIcon,
    Button,
    Center,
    Divider,
    Input,
    VStack,
} from '@chakra-ui/react';
import { AuthLayout } from '@components/layout/auth';
import { Alert, Captcha, FormField } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignupVerify } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import mailchecker from 'mailchecker';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export default function SignupVerifyPage() {
    const { t } = useTranslate();

    const schema = z
        .object({
            email: z
                .string()
                .min(1, t('auth.form.email.error.required'))
                .email(t('auth.form.email.error.format'))
                .refine(
                    (data) => mailchecker.isValid(data),
                    t('auth.form.email.error.valid')
                ),

            captcha: z.string(),
            reCaptcha: z.string().min(6, t('auth.form.captcha.error.required')),
        })
        .refine((data) => data.captcha === data.reCaptcha, {
            message: t('auth.form.captcha.error.match'),
            path: ['reCaptcha'],
        });

    const [isSuccess, setIsSuccess] = useState<boolean>(false);
    const { isLoading, mutate } = useSignupVerify();
    const {
        handleSubmit,
        register,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const handleSetCaptcha = (value: string) => {
        setValue('captcha', value);
    };

    const onSubmit = handleSubmit((values) => {
        mutate(
            {
                email: values.email,
            },
            {
                onSuccess(data) {
                    setIsSuccess(data?.signupVerify);
                },
            }
        );
    });

    if (isSuccess) {
        return (
            <AuthLayout
                title={t('commons.success')}
                description={t('auth.sign_up.success_message')}
                bottom={{
                    text: t('auth.commons.hasAccount'),
                    link: '/login',
                    label: t('auth.commons.login'),
                }}
            >
                <Center>
                    <Button
                        as={Link}
                        href="/signup/finish"
                        type="button"
                        colorScheme="green"
                    >
                        {t('auth.commons.complete_sign_up')}
                    </Button>
                </Center>
                <Divider />
            </AuthLayout>
        );
    }

    return (
        <AuthLayout
            title={t('auth.commons.sign_up')}
            description={t('auth.sign_up.description')}
            bottom={{
                text: t('auth.commons.hasAccount'),
                link: '/login',
                label: t('auth.commons.login'),
            }}
        >
            <VStack
                as="form"
                noValidate
                spacing="5"
                align="stretch"
                onSubmit={onSubmit}
            >
                <Alert status="info" variant="solid">
                    <AlertIcon />
                    <AlertDescription fontSize="sm">
                        {t('auth.sign_up.alert')}
                    </AlertDescription>
                </Alert>
                <FormField
                    isRequired
                    label={t('auth.form.email.label')}
                    error={errors?.email?.message}
                >
                    <Input
                        placeholder={t('auth.form.email.placeholder')}
                        type="email"
                        {...register('email')}
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

                <Button isLoading={isLoading} colorScheme="green" type="submit">
                    {t('auth.commons.sign_up')}
                </Button>
            </VStack>
        </AuthLayout>
    );
}
