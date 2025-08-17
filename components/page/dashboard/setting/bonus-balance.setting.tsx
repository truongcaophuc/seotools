import {
    Button,
    HStack,
    Input,
    Spacer,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import { FormField, Loading } from '@components/ui';
import { SettingInfoFragment } from '@generated/graphql/query';
import { useSetting, useUpdateSetting } from '@share/hooks/setting.hooks';

interface Props {
    setting?: SettingInfoFragment;
}

function BonusBalanceSettingForm({ setting }: Props) {
    const { mutate, isLoading } = useUpdateSetting();

    const defaultValue = setting?.priceToken || 0;

    const { getInputProps } = useNumberInput({
        min: 0,
        defaultValue,
    });

    const input = getInputProps();

    function onSubmit() {
        mutate({
            input: {
                priceToken: +input.value,
            },
        });
    }

    return (
        <VStack align="stretch" spacing="4">
            <FormField isRequired label="Số tiền cho mỗi tài khoản mới">
                <Input {...input} />
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

export function BonusBalanceSetting() {
    const { isLoading, data } = useSetting();

    if (isLoading) {
        return <Loading />;
    }

    const setting = data?.setting;

    return <BonusBalanceSettingForm setting={setting} />;
}
