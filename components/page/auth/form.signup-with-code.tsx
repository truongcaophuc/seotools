import { Button, Input, VStack } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignupWithCode } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

export function FormSignupWithCode() {
    const { t } = useTranslate();

    const schema = z.object({
        code: z.string().min(1, t('auth.form.code.error.required')),
        fullname: z
            .string()
            .min(6, t('auth.form.fullname.error.min'))
            .max(100, t('auth.form.fullname.error.max')),
        username: z
            .string()
            .min(6, t('auth.form.username.error.min'))
            .max(100, t('auth.form.username.error.max')),
        phoneNumber: z
            .string()
            .min(1, t('auth.form.phone_number.error.required')),
        password: z
            .string()
            .min(8, t('auth.form.password.error.min'))
            .max(75, t('auth.form.password.error.max')),
    });

    const { mutate, isLoading } = useSignupWithCode();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        if (data?.username.split(' ').length > 1) {
            setError('username', { type: 'customer', message: 'Not spacing' });
            return;
        }

        mutate({
            input: {
                code: data.code,
                password: data.password,
                username: data.username,
                fullname: data.fullname,
                phoneNumber: data.phoneNumber,
            },
        });
    });

    return (
        <VStack
            as="form"
            noValidate
            spacing="6"
            align="stretch"
            onSubmit={onSubmit}
        >
            <FormField
                label={t('auth.form.code.label')}
                isRequired
                error={errors?.code?.message}
            >
                <Input
                    {...register('code')}
                    placeholder={t('auth.form.code.placeholder')}
                />
            </FormField>
            <FormField
                label={t('auth.form.fullname.label')}
                isRequired
                error={errors?.fullname?.message}
            >
                <Input
                    {...register('fullname')}
                    placeholder={t('auth.form.fullname.placeholder')}
                />
            </FormField>
            <FormField
                label={t('auth.form.username.label')}
                isRequired
                error={errors?.username?.message}
            >
                <Input
                    {...register('username')}
                    placeholder={t('auth.form.username.placeholder')}
                />
            </FormField>
            <FormField
                label={t('auth.form.phone_number.label')}
                isRequired
                error={errors?.phoneNumber?.message}
            >
                <Input
                    {...register('phoneNumber')}
                    placeholder={t('auth.form.phone_number.placeholder')}
                />
            </FormField>
            <FormField
                label={t('auth.form.password.label')}
                isRequired
                error={errors?.password?.message}
            >
                <Password
                    placeholder={t('auth.form.password.placeholder')}
                    {...register('password')}
                />
            </FormField>

            <Button type="submit" isLoading={isLoading} colorScheme="green">
                {t('auth.commons.sign_up')}
            </Button>
        </VStack>
    );
}
