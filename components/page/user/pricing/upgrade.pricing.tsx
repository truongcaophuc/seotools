import {
    Box,
    Button,
    Center,
    HStack,
    Select,
    Spacer,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Heading, Modal } from '@components/ui';
import { PackageInfoFragment, TransactionType } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreatePaymentHistory } from '@share/hooks/payment.hooks';
import Link from 'next/link';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
    package: PackageInfoFragment;
}

const schema = z.object({
    packageItemId: z.string().min(1, 'Vui lòng chọn thời hạn'),
    transactionType: z.enum([TransactionType.TransferPayment], {
        errorMap: (issue, ctx) => {
            return { message: 'Chọn hình thức thanh toán' };
        },
    }),
});

export function UpgradePricing({ children, package: packageValue }: Props) {
    const { isLoading, mutate, isSuccess } = useCreatePaymentHistory();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            transactionType: TransactionType.TransferPayment,
        },
    });

    function handleClose() {
        if (isLoading) return;
        reset();
        onClose();
    }

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                transactionType: data.transactionType,
                packageItemId: data.packageItemId,
            },
        });
    });

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}

            <Modal
                title="Nâng cấp tài khoản"
                isOpen={isOpen}
                onClose={handleClose}
            >
                {isSuccess ? (
                    <VStack as={Center} minH="250px" p="10" textAlign="center">
                        <Heading color="green">Thành công</Heading>
                        <Text color="gray.500" fontSize="sm">
                            Yêu cầu nâng cấp tài khoản của bạn đang chờ được xét
                            duyệt
                        </Text>
                        <Button
                            as={Link}
                            href="/user/workspace"
                            colorScheme="blue"
                        >
                            Quay lại
                        </Button>
                    </VStack>
                ) : (
                    <VStack
                        as="form"
                        spacing="5"
                        align="stretch"
                        onSubmit={onSubmit}
                        noValidate
                    >
                        <VStack>
                            <Heading>Gói {packageValue.name}</Heading>
                            <Text color="gray.500" fontSize="sm">
                                Vui lòng chọn thời hạn để nâng cấp tài khoản
                            </Text>
                        </VStack>

                        <FormField
                            label="Thời hạn"
                            error={errors?.packageItemId?.message}
                            isRequired
                        >
                            <Select
                                placeholder="Chọn thời hạn"
                                {...register('packageItemId')}
                            >
                                {packageValue.packageItems?.map((item) => (
                                    <option value={item.id} key={item.id}>
                                        {item.packagePeriod?.name}
                                    </option>
                                ))}
                            </Select>
                        </FormField>

                        <FormField
                            label="Hình thức thanh toán"
                            isRequired
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

                        <VStack spacing="3" align="stretch">
                            <Heading fontSize="sm">Số tài khoản:</Heading>
                            <Box
                                bgColor="gray.100"
                                rounded="md"
                                textAlign="center"
                                p="4"
                            >
                                <Text fontSize="sm" fontWeight="medium" mb="2">
                                    Ngân hàng ACB - chi nhánh Đà Nẵng
                                </Text>
                                <Text fontSize="md" color="gray.500">
                                    206908888 - Trần Hoàng Hiệp
                                </Text>
                            </Box>
                        </VStack>

                        <HStack>
                            <Spacer />
                            <Button
                                isDisabled={isLoading}
                                type="button"
                                onClick={handleClose}
                                variant="ghost"
                            >
                                Huỷ
                            </Button>
                            <Button
                                isLoading={isLoading}
                                type="submit"
                                colorScheme="green"
                            >
                                Nâng cấp
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </Modal>
        </>
    );
}
