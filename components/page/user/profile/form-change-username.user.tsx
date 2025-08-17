import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
    password: z.string(),
    username: z.string().min(1, 'Tên đăng nhập không bỏ trống'),
    newUsername: z.string().min(1, 'Tên đăng nhập mới không bỏ trống'),
});

type FormChangePasswordUserData = z.infer<typeof schema>;

export function FormChangePasswordUser() {
    const { register, handleSubmit } = useForm<FormChangePasswordUserData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {});

    return (
        <VStack
            align="stretch"
            as="form"
            noValidate
            spacing="6"
            onSubmit={onSubmit}
        >
            <FormField label="Tên đăng nhập">
                <Input
                    {...register('username')}
                    placeholder="Điền tên đăng nhập khách hàng"
                />
            </FormField>
            <FormField label="Tên đăng nhập mới">
                <Input
                    {...register('username')}
                    placeholder="Điền tên đăng nhập mới khách hàng"
                />
            </FormField>

            <FormField label="Mật khẩu">
                <Password
                    {...register('password')}
                    placeholder="Điền mật khẩu khách hàng"
                />
            </FormField>

            <Box>
                <Button type="submit" colorScheme="green">
                    Lưu
                </Button>
            </Box>
        </VStack>
    );
}
