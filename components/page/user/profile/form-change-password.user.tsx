import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import { UserInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useChangePassword } from '@share/hooks/auth.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
    email: z.string().email('Email không đúng định dạng'),
    password: z.string().min(8, 'Mật khẩu phải lớn hơn 7 ký tự'),
    newPassword: z.string().min(8, 'Mật khẩu mới phải lớn hơn 7 ký tự'),
});

type FormChangePasswordUserData = z.infer<typeof schema>;

interface Props {
    user?: UserInfoFragment;
}

export function FormChangePasswordUser({ user }: Props) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormChangePasswordUserData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email: user?.email,
        },
    });

    const { isLoading, mutate } = useChangePassword();

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: data,
        });
    });

    return (
        <VStack
            align="stretch"
            as="form"
            noValidate
            spacing="6"
            onSubmit={onSubmit}
        >
            <FormField label="Email" error={errors?.email?.message}>
                <Input
                    {...register('email')}
                    placeholder="Điền email khách hàng"
                />
            </FormField>
            <FormField label="Mật khẩu" error={errors?.password?.message}>
                <Password
                    {...register('password')}
                    placeholder="Điền mật khẩu khách hàng"
                />
            </FormField>

            <FormField
                label="Mật khẩu mới"
                error={errors?.newPassword?.message}
            >
                <Password
                    {...register('newPassword')}
                    placeholder="Điền mật khẩu mới khách hàng"
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
