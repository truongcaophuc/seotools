import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import type { UserInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangeEmail } from '@share/hooks/auth.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
    email: z.string().email('Email không đúng định dạng'),
    newEmail: z.string().email('Email mới không đúng định dạng'),
    password: z.string().min(8, 'Mật khẩu phải lớn hơn 7 ký tự'),
});

type FormChangeEmailUserData = z.infer<typeof schema>;

interface Props {
    user?: UserInfoFragment;
}

export function FormChangeEmailUser({ user }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormChangeEmailUserData>({
        resolver: zodResolver(schema),
        defaultValues: { email: user?.email },
    });

    const { isLoading, mutate } = useChangeEmail();

    const onSubmit = handleSubmit((data) => {
        mutate({ input: data });
    });

    return (
        <VStack
            align="stretch"
            as="form"
            spacing="4"
            noValidate
            onSubmit={onSubmit}
        >
            <FormField label="Email" error={errors?.email?.message}>
                <Input
                    {...register('email')}
                    placeholder="Điền email khách hàng"
                />
            </FormField>
            <FormField label="Email mới" error={errors?.newEmail?.message}>
                <Input
                    {...register('newEmail')}
                    placeholder="Điền email mới khách hàng"
                />
            </FormField>

            <FormField label="Mật khẩu" error={errors?.password?.message}>
                <Password
                    {...register('password')}
                    placeholder="Điền mật khẩu  khách hàng"
                />
            </FormField>

            <Box>
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    Lưu
                </Button>
            </Box>
        </VStack>
    );
}
