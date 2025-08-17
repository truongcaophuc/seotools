import {
    Button,
    HStack,
    Input,
    Spacer,
    useDisclosure,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal } from '@components/ui';
import { PackagePeriodInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdatePackagePeriod } from '@share/hooks/package.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
    packagePeriod?: PackagePeriodInfoFragment;
}

const schema = z.object({
    name: z.string().min(1, 'Tên thời hạn không được bỏ trống'),
});

export function UpdatePeriodPackage({ children, packagePeriod }: Props) {
    const { isLoading, mutate } = useUpdatePackagePeriod();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: packagePeriod?.name,
        },
    });

    const { getInputProps: getInputTimeProps } = useNumberInput({
        defaultValue: packagePeriod?.time,
        min: 1,
        step: 1,
    });
    const { getInputProps: getInputOrderProps } = useNumberInput({
        defaultValue: packagePeriod?.order,
        min: 1,
        step: 1,
    });

    function handleClose() {
        if (isLoading) return;
        onClose();
    }

    const inputTime = getInputTimeProps();
    const inputOrder = getInputOrderProps();

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    id: packagePeriod?.id,
                    name: data.name,
                    time: +inputTime.value,
                    order: +inputOrder.value,
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
                title={packagePeriod ? 'Cập nhật' : 'Thêm mới'}
                isOpen={isOpen}
                onClose={handleClose}
            >
                <VStack
                    spacing="5"
                    align="stretch"
                    as="form"
                    onSubmit={onSubmit}
                >
                    <FormField
                        isRequired
                        label="Tên"
                        error={errors?.name?.message}
                    >
                        <Input {...register('name')} placeholder="Điền tên" />
                    </FormField>
                    <FormField isRequired label="Thời hạn">
                        <Input {...inputTime} placeholder="Điền thời hạn" />
                    </FormField>
                    <FormField isRequired label="Thứ tự">
                        <Input
                            {...inputOrder}
                            placeholder="Điền thứ tự sắp xếp"
                        />
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            isDisabled={isLoading}
                            type="button"
                            variant="ghost"
                            onClick={handleClose}
                        >
                            Huỷ
                        </Button>
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            colorScheme="green"
                        >
                            {packagePeriod ? 'Cập nhật' : 'Thêm mới'}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
