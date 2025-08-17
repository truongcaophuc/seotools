import {
    Button,
    HStack,
    Input,
    Spacer,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal, Password } from '@components/ui';
import { ChannelType, PageChannelInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePageChannel } from '@share/hooks/channel.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
    page?: PageChannelInfoFragment;
}

const schema = z.object({
    name: z.string().min(1, 'Tên trang không được bỏ trống'),
    username: z.string().min(1, 'Tên đăng nhập trang không được bỏ trống'),
    password: z.string().min(1, 'Mật khẩu ứng dụng không được bỏ trống'),
    url: z.string().url('Url không hợp lệ'),
});

export function UpdatePageWordpress({ children, page }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isLoading, mutate } = useUpdatePageChannel();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: page?.name,
            password: page?.password,
            username: page?.username,
            url: page?.url,
        },
    });

    function handleClose() {
        reset();
        onClose();
    }

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                id: page?.id,
                ...data,
                type: ChannelType.Wordpress,
            },
        });
    });

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal
                title={!!page ? 'Cập nhật' : 'Thêm mới'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack
                    align="stretch"
                    spacing="5"
                    as="form"
                    noValidate
                    onSubmit={onSubmit}
                >
                    <FormField
                        isRequired
                        label="Tên trang"
                        error={errors?.name?.message}
                    >
                        <Input
                            {...register('name')}
                            placeholder="Điền tên trang"
                        />
                    </FormField>
                    <FormField
                        isRequired
                        label="Tên đăng nhập trang"
                        error={errors?.username?.message}
                    >
                        <Input
                            {...register('username')}
                            placeholder="Điền tên đăng nhập trang"
                        />
                    </FormField>
                    <FormField
                        isRequired
                        label="Url trang"
                        error={errors?.url?.message}
                    >
                        <Input
                            {...register('url')}
                            placeholder="Điền url trang"
                        />
                    </FormField>
                    <FormField
                        isRequired
                        label="Mật khẩu ứng dụng"
                        error={errors?.password?.message}
                    >
                        <Password
                            {...register('password')}
                            placeholder="Điền mật khẩu ứng dụng"
                        />
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            isDisabled={isLoading}
                            onClick={handleClose}
                            type="button"
                            variant="ghost"
                        >
                            Huỷ
                        </Button>
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            colorScheme="green"
                        >
                            {!!page ? 'Cập nhật' : 'Thêm'}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
