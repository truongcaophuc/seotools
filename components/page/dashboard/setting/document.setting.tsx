import { Input, VStack, Button, HStack, Spacer } from '@chakra-ui/react';
import { FormField, Loading } from '@components/ui';
import { SettingInfoFragment } from '@generated/graphql/query';
import { useSetting, useUpdateSetting } from '@share/hooks/setting.hooks';
import { pick } from 'lodash';
import { useForm } from 'react-hook-form';

type TFieldIds =
    | 'fieldTitle'
    | 'fieldDescription'
    | 'fieldMainKeyword'
    | 'fieldSubKeyword'
    | 'fieldParagraph'
    | 'fieldLanguage'
    | 'fieldStyleContent';

const fields: Array<{ id: TFieldIds; label: string; placeholder: string }> = [
    {
        id: 'fieldTitle',
        label: 'Tiêu đề',
        placeholder: 'Điền field tiêu đề',
    },
    {
        id: 'fieldDescription',
        label: 'Mô tả',
        placeholder: 'Điền field mô tả',
    },
    {
        id: 'fieldMainKeyword',
        label: 'Từ khoá chính',
        placeholder: 'Điền field từ khoá chính',
    },
    {
        id: 'fieldSubKeyword',
        label: 'Từ khoá phụ',
        placeholder: 'Điền field từ khoá phụ',
    },
    {
        id: 'fieldParagraph',
        label: 'Đoạn văn',
        placeholder: 'Điền field đoạn văn',
    },
    {
        id: 'fieldLanguage',
        label: 'Ngôn ngữ',
        placeholder: 'Điền field ngôn ngữ',
    },
    {
        id: 'fieldStyleContent',
        label: 'Phong cách',
        placeholder: 'Điền field phong cách',
    },
];

type FormDocumentSettingData = {
    fieldTitle: string;
    fieldDescription: string;
    fieldMainKeyword: string;
    fieldSubKeyword: string;
    fieldParagraph: string;
    fieldLanguage: string;
    fieldStyleContent: string;
};

function FormDocumentSetting({ setting }: { setting: SettingInfoFragment }) {
    const { isLoading, mutate } = useUpdateSetting();
    const { register, handleSubmit } = useForm<FormDocumentSettingData>({
        defaultValues: pick(setting, [
            'fieldTitle',
            'fieldDescription',
            'fieldMainKeyword',
            'fieldSubKeyword',
            'fieldParagraph',
            'fieldLanguage',
            'fieldStyleContent',
        ]),
    });

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                id: setting.id,
                ...data,
            },
        });
    });

    return (
        <VStack align="stretch" as="form" spacing="5" onSubmit={onSubmit}>
            {...fields.map((item) => (
                <FormField key={item.id} label={item.label}>
                    <Input
                        {...register(item.id)}
                        placeholder={item.placeholder}
                    />
                </FormField>
            ))}
            <HStack>
                <Spacer />
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    Cập nhật
                </Button>
            </HStack>
        </VStack>
    );
}

export function DocumentSetting() {
    const { isLoading, data } = useSetting();
    if (isLoading) return <Loading />;

    return <FormDocumentSetting setting={data?.setting} />;
}
