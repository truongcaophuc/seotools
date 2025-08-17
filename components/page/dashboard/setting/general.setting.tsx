import { Textarea, VStack, Button, HStack, Spacer } from '@chakra-ui/react';
import { FormField, Loading } from '@components/ui';
import { SettingInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSetting, useUpdateSetting } from '@share/hooks/setting.hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    documentLink: z
        .string()
        .min(1, 'Đường dẫn không được bỏ trống')
        .url('Đường dẫn không hợp lệ'),
});

type FormGeneralSettingData = z.infer<typeof schema>;

function FormGeneralSetting({ setting }: { setting: SettingInfoFragment }) {
    const { isLoading, mutate } = useUpdateSetting();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormGeneralSettingData>({
        resolver: zodResolver(schema),
        defaultValues: {
            documentLink: setting?.documentLink,
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                id: setting.id,
                documentLink: data.documentLink,
            },
        });
    });

    return (
        <VStack as="form" align="stretch" spacing="5" onSubmit={onSubmit}>
            <FormField
                isRequired
                label="Hướng dẫn sử dụng"
                error={errors?.documentLink?.message}
            >
                <Textarea
                    {...register('documentLink')}
                    placeholder="Điền link hướng dẫn sử dụng"
                />
            </FormField>
            <HStack>
                <Spacer />
                <Button isLoading={isLoading} colorScheme="green" type="submit">
                    Lưu
                </Button>
            </HStack>
        </VStack>
    );
}

export function GeneralSetting() {
    const { isLoading, data } = useSetting();

    if (isLoading) return <Loading />;

    if (!data) {
        return null;
    }

    return <FormGeneralSetting setting={data?.setting} />;
}
