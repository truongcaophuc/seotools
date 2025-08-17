import { Button, HStack, Input, Spacer, Text, VStack } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useLogin } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

export function FormLogin() {
    const { t } = useTranslate();

    const schema = z.object({
        username: z.string().min(6, t('auth.form.username.error.min')),
        password: z.string().min(8, t('auth.form.password.error.min')),
    });

    const { mutate, isLoading } = useLogin();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                username: data.username,
                password: data.password,
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
                label={t('auth.form.password.label')}
                isRequired
                error={errors?.password?.message}
            >
                <>
                    <Password
                        placeholder={t('auth.form.password.placeholder')}
                        {...register('password')}
                    />
                </>
            </FormField>
            <HStack>
                <Spacer />
                <Text
                    color="blue.600 "
                    fontWeight="medium"
                    fontSize="sm"
                    as={Link}
                    href="/forgot-password"
                    _hover={{
                        color: 'blue.40',
                        textDecoration: 'underline',
                    }}
                >
                    {t('auth.commons.forgotPassword')}
                </Text>
            </HStack>
            <Button type="submit" isLoading={isLoading} colorScheme="green">
                {t('auth.commons.login')}
            </Button>
        </VStack>
    );
}
