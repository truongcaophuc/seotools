import {
    Box,
    Button,
    HStack,
    Input,
    Spacer,
    Text,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import { FormField, Loading } from '@components/ui';
import { SettingInfoFragment } from '@generated/graphql/query';
import { useSetting, useUpdateSetting } from '@share/hooks/setting.hooks';

interface Props {
    setting?: SettingInfoFragment;
}

function PaySettingForm({ setting }: Props) {
    const { mutate, isLoading } = useUpdateSetting();

    // const defaultValuePriceToken = setting?.priceToken || 0;
    const defaultValueBalance = setting?.bonusBalanceSignup || 0;
    const defaultValueTime = setting?.timeTrial || 0;
    const defaultValueTimeUseGpt4 = setting?.numberOfTimeUseGpt4 || 0;

    const timeUseGpt4Input = useNumberInput({
        min: 0,
        defaultValue: defaultValueTimeUseGpt4,
    });

    const balanceInput = useNumberInput({
        min: 0,
        defaultValue: defaultValueBalance,
    });

    const timeInput = useNumberInput({
        min: 0,
        defaultValue: defaultValueTime,
    });

    // const priceTokenInputProps = priceTokenInput.getInputProps();
    const balanceInputProps = balanceInput.getInputProps();
    const timeInputProps = timeInput.getInputProps();
    const timeUseInputProps = timeUseGpt4Input.getInputProps();

    function onSubmit() {
        mutate({
            input: {
                // priceToken: +priceTokenInputProps.value,
                bonusBalanceSignup: +balanceInputProps.value,
                timeTrial: +timeInputProps.value,
                numberOfTimeUseGpt4: +timeUseInputProps.value,
            },
        });
    }

    return (
        <VStack align="stretch" spacing="4">
            {
                // <FormField isRequired label="Số tiền phải trả cho 1 token (vnd)">
                //     <Input {...priceTokenInputProps} />
                // </FormField>
                //
            }

            <FormField isRequired label="Số tiền bonus cho tài khoản mới">
                <Input {...balanceInputProps} />
            </FormField>

            <FormField isRequired label="Thời gian dùng thử">
                <HStack>
                    <Input {...timeInputProps} />
                    <Text as="span">ngày</Text>
                </HStack>
            </FormField>

            <FormField isRequired label="Số lần sử dụng GPT4">
                <HStack>
                    <Input {...timeUseInputProps} />
                    <Text as="span">lần</Text>
                </HStack>
            </FormField>

            <HStack>
                <Spacer />
                <Button
                    isLoading={isLoading}
                    onClick={onSubmit}
                    colorScheme="green"
                >
                    Lưu
                </Button>
            </HStack>
        </VStack>
    );
}

export function PaySetting() {
    const { isLoading, data } = useSetting();

    if (isLoading) {
        return <Loading />;
    }

    const setting = data?.setting;

    return <PaySettingForm setting={setting} />;
}
