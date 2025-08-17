import {
    Badge,
    Box,
    Button,
    Input,
    Textarea,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import { FormField } from '@components/ui';
import {
    AiSettingAppInfoFragment,
    TypeAiSettingApp,
} from '@generated/graphql/query';
import {
    useAddOrEditAiSettingApp,
    useSetting,
} from '@share/hooks/setting.hooks';
import { useForm } from 'react-hook-form';
import pick from 'lodash/pick';

interface Props {
    type: TypeAiSettingApp;
    setting?: AiSettingAppInfoFragment;
}

function Fields({ onClick }: { onClick: (text: string) => void }) {
    const { data } = useSetting();

    const fields = pick(data?.setting, [
        'fieldTitle',
        'fieldDescription',
        'fieldMainKeyword',
        'fieldSubKeyword',
        'fieldParagraph',
        'fieldLanguage',
        'fieldStyleContent',
    ]);

    return (
        <Box whiteSpace="pre-wrap">
            {Object.keys(fields).map((key) => {
                const value = fields[key];
                return (
                    <Badge
                        mr="2"
                        mb="2"
                        textTransform="initial"
                        fontWeight="medium"
                        cursor="pointer"
                        onClick={() => onClick(value)}
                        key={key}
                    >
                        {value}
                    </Badge>
                );
            })}
        </Box>
    );
}

export function FormAiSettingApp({ setting, type }: Props) {
    const { isLoading, mutate } = useAddOrEditAiSettingApp();
    const {
        handleSubmit,
        register,
        watch,
        setValue,
        formState: { errors },
    } = useForm<{ leadingSentence: string; max_tokens: number }>({
        defaultValues: {
            leadingSentence: setting?.leadingSentence,
            max_tokens: setting?.max_tokens,
        },
    });
    const { getInputProps } = useNumberInput({
        step: 10,
        defaultValue: setting?.max_tokens,
        min: 1,
        max: 2000,
        precision: 0,
    });

    const input = getInputProps();

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                ...data,
                id: setting?.id,
                type,
                max_tokens: input['aria-valuenow'],
            },
        });
    });

    const leadingSentence = watch('leadingSentence');

    function handleAddCustomField(value: string) {
        const text = `${leadingSentence} ${value}`;
        setValue('leadingSentence', text);
    }

    return (
        <VStack
            onSubmit={onSubmit}
            as="form"
            noValidate
            align="stretch"
            spacing="4"
        >
            <FormField
                isRequired
                label="Câu dẫn dắt"
                error={errors?.leadingSentence?.message}
                helpText={<Fields onClick={handleAddCustomField} />}
            >
                <Textarea
                    placeholder="Điền câu dẫn dắt"
                    {...register('leadingSentence', {
                        required: {
                            value: true,
                            message: 'Câu dẫn dắt không được bỏ trống',
                        },
                    })}
                />
            </FormField>
            <FormField label="Max tokens">
                <Input {...input} />
            </FormField>
            <Box>
                <Button isLoading={isLoading} colorScheme="green" type="submit">
                    Lưu
                </Button>
            </Box>
        </VStack>
    );
}
