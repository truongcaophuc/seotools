import {
    Box,
    Button,
    HStack,
    Input,
    Select,
    Spacer,
    Text,
    useDisclosure,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import { FormField, Heading, Modal } from '@components/ui';
import { TransactionType } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePaymentHistory } from '@share/hooks/payment.hooks';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { UpgradeWorkspace } from './upgrade.workspace';

interface Props {
    children: ReactElement;
    isUpgrade?: boolean;
}

const schema = z.object({
    // amount: z.number(),
    transactionType: z.enum([TransactionType.TransferPayment], {
        errorMap: (issue, ctx) => {
            return { message: 'Chọn hình thức thanh toán' };
        },
    }),
});

//TODO: delete

type FormPaymentData = z.infer<typeof schema>;

export function PaymentWorkspace({ children, isUpgrade }: Props) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const { isLoading, mutate } = useCreatePaymentHistory();

    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm<FormPaymentData>({
        resolver: zodResolver(schema),
        defaultValues: {
            transactionType: TransactionType.TransferPayment,
        },
    });

    const handleClose = () => {
        if (isLoading) return;
        reset();
        onClose();
    };

    const { getInputProps } = useNumberInput({
        step: 1,
        defaultValue: 0,
        min: 0,
    });

    const input = getInputProps();

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    transactionType: data.transactionType,
                    packageItemId: 'dsa',
                    // amount: +input.value,
                },
            },
            {
                onSuccess() {
                    handleClose();
                },
            }
        );
    });

    const type = watch('transactionType');
    const title = isUpgrade ? 'Nâng cấp tài khoản' : 'Nạp thêm';

    function renderContent() {
        if (isUpgrade) {
            return <UpgradeWorkspace />;
        }
        return (
            <VStack
                as="form"
                align="stretch"
                noValidate
                onSubmit={onSubmit}
                spacing="5"
            >
                <FormField isRequired label="Giá trị">
                    <Input placeholder="Điền số tiền thanh toán" {...input} />
                </FormField>
                <FormField
                    label="Hình thức"
                    error={errors?.transactionType?.message}
                >
                    <Select
                        placeholder="Chọn hình thức thanh toán"
                        {...register('transactionType')}
                    >
                        <option value={TransactionType.TransferPayment}>
                            Chuyển khoản
                        </option>
                    </Select>
                </FormField>
                <VStack spacing="4" align="stretch">
                    <Heading fontSize="sm">Số tài khoản:</Heading>
                    <Box
                        bgColor="gray.100"
                        rounded="md"
                        textAlign="center"
                        p="4"
                    >
                        <Text fontSize="sm" fontWeight="medium" mb="2">
                            1. Ngân hàng ACB - chi nhánh Đà Nẵng
                        </Text>
                        <Text fontSize="md" color="gray.500">
                            206908888 - Trần Hoàng Hiệp
                        </Text>
                    </Box>
                </VStack>
                <HStack>
                    <Spacer />
                    <Button
                        type="button"
                        onClick={handleClose}
                        variant="ghost"
                        isDisabled={isLoading}
                    >
                        Huỷ
                    </Button>
                    <Button
                        isLoading={isLoading}
                        colorScheme="green"
                        type="submit"
                    >
                        Thanh toán
                    </Button>
                </HStack>
            </VStack>
        );
    }

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}

            <Modal title={title} isOpen={isOpen} onClose={handleClose}>
                {renderContent()}
            </Modal>
        </>
    );
}
