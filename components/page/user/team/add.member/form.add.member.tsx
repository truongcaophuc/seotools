import { HStack, Input, VStack, Button, Spacer } from '@chakra-ui/react';
import { FormField, Password } from '@components/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddMember } from '@share/hooks/customer.hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    email: z.string().email('Email không đúng định dạng'),
    password: z.string().min(8, 'Mật khẩu phải lớn hơn 7 ký tự'),
    fullname: z.string().optional(),
});

type FormAddMemberData = z.infer<typeof schema>;

interface Props {
    callback?: () => void;
}

export function FormAddMember({ callback }: Props) {
    const { isLoading, mutate } = useAddMember();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormAddMemberData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: data,
            },
            {
                onSuccess() {
                    if (callback) {
                        callback();
                    }
                },
            }
        );
    });

    return (
        <VStack
            as="form"
            align="stretch"
            spacing="4"
            onSubmit={onSubmit}
            noValidate
        >
            <FormField label="Email" error={errors?.email?.message} isRequired>
                <Input
                    {...register('email')}
                    placeholder="Điền email thành viên"
                />
            </FormField>
            <FormField label="Mật khẩu" error={errors?.password?.message}>
                <Password
                    {...register('password')}
                    placeholder="Điền mật khẩu thành viên"
                />
            </FormField>
            <FormField label="Tên" error={errors?.fullname?.message}>
                <Input
                    {...register('fullname')}
                    placeholder="Điền tên thành viên"
                />
            </FormField>
            <HStack>
                <Spacer />
                <Button isDisabled={isLoading} type="button">
                    Thêm
                </Button>
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    Thêm
                </Button>
            </HStack>
        </VStack>
    );
}
