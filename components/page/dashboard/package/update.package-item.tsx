import {
    Button,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Select,
    Spacer,
    Text,
    Textarea,
    useDisclosure,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import { FormField, Loading, Modal } from '@components/ui';
import {
    PackageInfoFragment,
    PackageItemInfoFragment,
    PackagePeriodInfoFragment,
} from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    usePackagePeriods,
    usePackages,
    useUpdatePackageItem,
} from '@share/hooks/package.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface FormUpdatePackageItemProps {
    packageItem?: PackageItemInfoFragment;
    callback?: () => void;
    packages: Array<PackageInfoFragment>;
    packagePeriods: Array<PackagePeriodInfoFragment>;
}

const schema = z.object({
    packageParentId: z.string().optional(),
    packagePeriodId: z.string().optional(),
    content: z.string().optional(),
});

export function FormUpdatePackageItem({
    packageItem,
    callback,
    packages,
    packagePeriods = [],
}: FormUpdatePackageItemProps) {
    const { isLoading, mutate } = useUpdatePackageItem();

    const inputFreeTime = useNumberInput({
        defaultValue: packageItem?.freeTime,
        min: 0,
        step: 1,
    });

    const inputPrice = useNumberInput({
        min: 0,
        step: 1,
        defaultValue: packageItem?.price,
    });

    const inputNumberWord = useNumberInput({
        min: 1,
        step: 1,
        defaultValue: packageItem?.numberWord,
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            packageParentId: packageItem?.packageParentId,
            packagePeriodId: packageItem?.packagePeriodId,
            content: packageItem?.content,
        },
    });

    function handleClose() {
        if (isLoading) return;
        if (callback) callback();
    }

    const inputFreeTimeProps = inputFreeTime.getInputProps();
    const inputPriceProps = inputPrice.getInputProps();
    const inputNumberWordProps = inputNumberWord.getInputProps();

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    ...data,
                    id: packageItem?.id,
                    freeTime: +inputFreeTime.value,
                    price: +inputPrice.value,
                    numberWord: +inputNumberWord.value,
                },
            },
            {
                onSuccess() {
                    if (callback) callback();
                },
            }
        );
    });

    return (
        <VStack as="form" spacing="5" align="stretch" onSubmit={onSubmit}>
            <FormField label="Thời hạn" isRequired>
                <Select
                    placeholder="Chọn thời hạn"
                    {...register('packagePeriodId')}
                >
                    {packagePeriods.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                </Select>
            </FormField>
            <FormField label="Thời hạn miễn phí" isRequired>
                <InputGroup>
                    <Input
                        {...inputFreeTimeProps}
                        placeholder="Điền thời hạn miễn phí"
                    />
                    <InputRightAddon children={<Text as="span">ngày</Text>} />
                </InputGroup>
            </FormField>
            <FormField label="Giá" isRequired>
                <InputGroup>
                    <Input {...inputPriceProps} placeholder="Điền giá" />
                    <InputRightAddon children={<Text as="span">VND</Text>} />
                </InputGroup>
            </FormField>
            <FormField label="Giới hạn từ" isRequired>
                <InputGroup>
                    <Input
                        {...inputNumberWordProps}
                        placeholder="Điền giới hạn từ"
                    />
                    <InputRightAddon
                        children={<Text as="span">từ / tháng</Text>}
                    />
                </InputGroup>
            </FormField>
            <FormField
                isRequired
                label="Thuộc gói"
                error={errors?.packageParentId?.message}
            >
                <Select {...register('packageParentId')} placeholder="Chọn gói">
                    {packages.map((item) => (
                        <option value={item.id}>{item.name}</option>
                    ))}
                </Select>
            </FormField>
            <FormField label="Nội dung">
                <Textarea
                    placeholder="Điền nội dung"
                    {...register('content')}
                />
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
                <Button colorScheme="green" type="submit" isLoading={isLoading}>
                    Lưu
                </Button>
            </HStack>
        </VStack>
    );
}

interface Props {
    children: ReactElement;
    packageItem?: PackageItemInfoFragment;
}

export function UpdatePackageItem({ children, packageItem }: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { isLoading, data } = usePackages();
    const { isLoading: isLoadingPeriod, data: periodData } =
        usePackagePeriods();

    if (isLoading || isLoadingPeriod) {
        return <Loading />;
    }

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}

            <Modal
                title={packageItem ? 'Cập nhật' : 'Tạo mới'}
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormUpdatePackageItem
                    packagePeriods={periodData?.packagePeriods}
                    callback={onClose}
                    packages={data?.packages}
                    packageItem={packageItem}
                />
            </Modal>
        </>
    );
}
