import { Button, Input, VStack } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignup } from '@share/hooks/auth.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
    fullname: z
        .string()
        .min(6, 'Tên phải lớn hơn 6 ký tự')
        .max(100, 'Tên quá dài'),
    username: z
        .string()
        .min(6, 'Tên đăng nhập phải lớn hơn 6 ký tự')
        .max(100, 'Tên đăng nhập quá dài'),
    email: z
        .string()
        .min(1, 'Email không được bỏ trống')
        .email('Địa chỉ email không đúng'),
    phoneNumber: z.string().min(1, 'Số điện thoại không được bỏ trống'),
    password: z
        .string()
        .min(8, 'Mật khẩu phải lớn hơn 7 ký tự')
        .max(75, 'Mật khẩu quá dài'),
});

type FormLoginData = z.infer<typeof schema>;

interface Props {
    email: string;
}

export function FormSignup({ email }: Props) {
    const { mutate, isLoading } = useSignup();
    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<FormLoginData>({
        resolver: zodResolver(schema),
        defaultValues: {
            email,
        },
    });

    const onSubmit = handleSubmit((data) => {
        console.log("data", data)
        if (data?.username.split(' ').length > 1) {
            setError('username', { type: 'customer', message: 'Not spacing' });
            return;
        }

        mutate({
            input: {
                email: data.email,
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
                label="Họ tên"
                isRequired
                error={errors?.fullname?.message}
            >
                <Input {...register('fullname')} placeholder="Điền Họ Tên" />
            </FormField>
            <Input hidden {...register('email')} />
            <FormField
                label="Tên đăng nhập"
                isRequired
                error={errors?.username?.message}
            >
                <Input
                    {...register('username')}
                    placeholder="Điền Tên đăng nhập "
                />
            </FormField>
            <FormField
                label="Số điện thoại"
                isRequired
                error={errors?.phoneNumber?.message}
            >
                <Input
                    {...register('phoneNumber')}
                    placeholder="Điền Số điện thoại"
                />
            </FormField>
            <FormField
                label="Mật khẩu"
                isRequired
                error={errors?.password?.message}
            >
                <Password
                    placeholder="Điền mật khẩu"
                    {...register('password')}
                />
            </FormField>

            <Button type="submit" isLoading={isLoading} colorScheme="green">
                Đăng ký
            </Button>
        </VStack>
    );
}
