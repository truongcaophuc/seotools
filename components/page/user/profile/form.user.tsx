import { Box, Button, Input, VStack } from '@chakra-ui/react';
import { FormField } from '@components/ui';
import type { UserInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateUser } from '@share/hooks/auth.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const schema = z.object({
    fullname: z.string().optional(),
    phoneNumber: z.string().optional(),
});

type FormUserData = z.infer<typeof schema>;

interface Props {
    user?: UserInfoFragment;
}

export function FormUser({ user }: Props) {
    const { register, handleSubmit } = useForm<FormUserData>({
        resolver: zodResolver(schema),
        defaultValues: {
            fullname: user?.fullname,
            phoneNumber: user?.phoneNumber,
        },
    });

    const { isLoading, mutate } = useUpdateUser();

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                data,
            },
        });
    });

    return (
        <VStack
            as="form"
            noValidate
            align="stretch"
            spacing="4"
            onSubmit={onSubmit}
        >
            <FormField label="Tên khách hàng">
                <Input
                    {...register('fullname')}
                    placeholder="Điền tên khách hàng"
                />
            </FormField>
            <FormField label="Số điện thoại">
                <Input
                    {...register('phoneNumber')}
                    placeholder="Điền số điện thoại khách hàng"
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
