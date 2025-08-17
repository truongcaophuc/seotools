import {
    Button,
    Center,
    HStack,
    Input,
    InputGroup,
    InputRightAddon,
    Spacer,
    Text,
    VStack,
    useDisclosure,
    useNumberInput,
    Select,
} from '@chakra-ui/react';
import { FormField, Heading, Modal } from '@components/ui';
import { TransactionType } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { formatNumber } from '@share/helps/format-number';
import { useRequestBuyWord } from '@share/hooks/buy-word.hooks';
import { ReactElement, cloneElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
}

const schema = z.object({
    transactionType: z.enum([TransactionType.TransferPayment], {
        errorMap: (issue, ctx) => {
            return { message: 'Chọn hình thức thanh toán' };
        },
    }),
});

export function BuyWordWorkspace({ children }: Props) {
    const { isLoading, mutate, isSuccess } = useRequestBuyWord();

    const { isOpen, onOpen, onClose } = useDisclosure();
    const numberWordInput = useNumberInput({
        defaultValue: 1,
        step: 1,
        min: 1,
    });

    function handleClose() {
        if (isLoading) return;
        onClose();
    }

    const numberWordInputProps = numberWordInput.getInputProps();

    const priceInput = useNumberInput({
        value: +numberWordInput?.value * 10000,
        step: 1,
        min: 1,
    });

    const priceInputProps = priceInput.getInputProps();

    const { handleSubmit, register } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            transactionType: TransactionType.TransferPayment,
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                numberWord: +numberWordInput.value * 10000,
                price: +priceInput.value,
                transactionType: data.transactionType,
            },
        });
    });

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal title="Mua thêm từ" isOpen={isOpen} onClose={handleClose}>
                {isSuccess ? (
                    <VStack as={Center} minH="250px" textAlign="center">
                        <Heading>Thành công</Heading>
                        <Text>
                            Yêu cầu mua thêm từ để sử dụng của bạn đã được
                            chuyển đến quản trị.
                        </Text>
                        <Button colorScheme="blue" onClick={handleClose}>
                            Quay lại
                        </Button>
                    </VStack>
                ) : (
                    <VStack
                        spacing="5"
                        align="stretch"
                        as="form"
                        onSubmit={onSubmit}
                    >
                        <FormField label="Số lượng từ" isRequired>
                            <InputGroup>
                                <Input {...numberWordInputProps} />
                                <InputRightAddon
                                    children={
                                        <Text>x {formatNumber(10000)} từ</Text>
                                    }
                                />
                            </InputGroup>
                        </FormField>
                        <FormField label="Số tiền cần trả" isRequired>
                            <InputGroup>
                                <Input {...priceInputProps} />
                                <InputRightAddon
                                    children={<Text as="span">VND</Text>}
                                />
                            </InputGroup>
                        </FormField>
                        <FormField label="Hình thức thanh toán">
                            <Select
                                {...register('transactionType')}
                                placeholder="Chọn hình thức thanh toán"
                            >
                                <option value={TransactionType.TransferPayment}>
                                    Chuyển khoản
                                </option>
                            </Select>
                        </FormField>
                        <HStack>
                            <Spacer />
                            <Button
                                onClick={handleClose}
                                isDisabled={isLoading}
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
                                Mua
                            </Button>
                        </HStack>
                    </VStack>
                )}
            </Modal>
        </>
    );
}
