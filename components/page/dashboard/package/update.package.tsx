import {
    Button,
    Checkbox,
    HStack,
    Input,
    Select,
    Spacer,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal } from '@components/ui';
import { PackageInfoFragment, PackageType } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePackage } from '@share/hooks/package.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
    package?: PackageInfoFragment;
}
const schema = z.object({
    name: z
        .string()
        .min(1, 'Tên gói không được bỏ trống')
        .max(50, 'Tên gói quá dài'),
    type: z.enum([PackageType.Trial, PackageType.Basic, PackageType.Premium]),
    isShow: z.boolean(),
});

export function UpdatePackage({ children, package: packageValue }: Props) {
    const { isLoading, mutate } = useUpdatePackage();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: packageValue?.name,
            type: packageValue?.type,
            isShow: packageValue?.isShow || true,
        },
    });

    function handleClose() {
        if (isLoading) return;
        onClose();
    }

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    id: packageValue?.id,
                    ...data,
                },
            },
            {
                onSuccess() {
                    handleClose();
                },
            }
        );
    });

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}

            <Modal
                title={packageValue ? 'Cập nhật' : 'Tạo gói'}
                isOpen={isOpen}
                onClose={handleClose}
            >
                <VStack
                    as="form"
                    spacing="5"
                    align="stretch"
                    onSubmit={onSubmit}
                >
                    <FormField label="Tên" error={errors?.name?.message}>
                        <Input
                            {...register('name')}
                            placeholder="Điền tên gói"
                        />
                    </FormField>
                    <FormField label="Loại" error={errors?.type?.message}>
                        <Select
                            placeholder="Chọn loại gói"
                            {...register('type')}
                        >
                            <option value={PackageType.Trial}>
                                {PackageType.Trial}
                            </option>
                            <option value={PackageType.Basic}>
                                {PackageType.Basic}
                            </option>
                            <option value={PackageType.Premium}>
                                {PackageType.Premium}
                            </option>
                        </Select>
                    </FormField>
                    <FormField>
                        <Checkbox {...register('isShow')}>
                            Hiển thị ở trang bảng giá
                        </Checkbox>
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            onClick={handleClose}
                            type="button"
                            variant="ghost"
                            isDisabled={isLoading}
                        >
                            Huỷ
                        </Button>
                        <Button
                            colorScheme="green"
                            type="submit"
                            isLoading={isLoading}
                        >
                            Lưu
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
