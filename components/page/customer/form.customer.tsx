import { Box, Button, Divider, Input, VStack } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCustomer } from '@share/hooks/customer.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
    email: z.string().email('Email không đúng định dạng'),
    password: z.string().min(8, 'Mật khẩu phải ít nhất 8 ký tự'),
    username: z.string().min(6, 'Tên đăng nhập phải ít nhất 6 ký tự'),
    phoneNumber: z.string().optional(),
    fullname: z.string().optional(),
});

type FormCustomerData = z.infer<typeof schema>;

export function FormCustomer() {
    const { isLoading, mutate } = useAddCustomer();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<FormCustomerData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: data,
        });
    });

    return (
        <VStack
            as="form"
            align="stretch"
            spacing="6"
            onSubmit={onSubmit}
            noValidate
        >
            <FormField label="Email" isRequired error={errors?.email?.message}>
                <Input
                    {...register('email')}
                    placeholder="Điền địa chỉ email"
                />
            </FormField>
            <FormField
                label="Tên đăng nhập"
                isRequired
                error={errors?.username?.message}
            >
                <Input
                    {...register('username')}
                    placeholder="Điền tên đăng nhập"
                />
            </FormField>
            <FormField
                label="Mật khẩu"
                isRequired
                error={errors?.password?.message}
            >
                <Password
                    {...register('password')}
                    placeholder="Điền mật khẩu"
                />
            </FormField>
            <Divider />

            <FormField label="Tên khách hàng" error={errors?.fullname?.message}>
                <Password
                    {...register('fullname')}
                    placeholder="Điền tên khách hàng"
                />
            </FormField>

            <FormField
                label="Số điện thoại"
                error={errors?.phoneNumber?.message}
            >
                <Password
                    {...register('phoneNumber')}
                    placeholder="Điền số điện thoại"
                />
            </FormField>
            <Box>
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    Thêm khách hàng
                </Button>
            </Box>
        </VStack>
    );
}
