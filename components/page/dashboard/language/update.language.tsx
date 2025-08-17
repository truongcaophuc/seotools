import {
    Button,
    Checkbox,
    HStack,
    Input,
    Spacer,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal } from '@components/ui';
import {
    LanguageInfoFragment,
    UpdateLanguageInputType,
} from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateLanguage } from '@share/hooks/language.hooks';
import { lang } from 'moment';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    children: ReactElement;
    language?: LanguageInfoFragment;
}

const schema = z.object({
    label: z
        .string()
        .min(1, 'Tên ngôn ngữ không được bỏ trống')
        .max(80, 'Tên ngôn ngữ quá dài'),
    value: z
        .string()
        .min(1, 'Giá trị ngôn ngữ không được bỏ trống')
        .max(80, 'Giá trị ngôn ngữ quá dài'),
    isDefault: z.boolean(),
});

export function UpdateLanguage({ children, language }: Props) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            label: language?.label,
            value: language?.value,
            isDefault: language?.isDefault,
        },
    });

    const { isLoading, mutate } = useUpdateLanguage();

    const onSubmit = handleSubmit((data) => {
        let input: UpdateLanguageInputType = {
            id: language?.id,
            label: data.label,
            value: data.value,
            isDefault: data.isDefault,
        };

        if (language) {
            input.id = language.id;
        }

        mutate(
            { input },
            {
                onSuccess() {
                    onClose();
                },
            }
        );
    });

    const title = language ? 'Cập nhật' : 'Thêm';

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal
                title={`${title} phong cách`}
                isOpen={isOpen}
                onClose={onClose}
            >
                <VStack
                    align="stretch"
                    as="form"
                    onSubmit={onSubmit}
                    noValidate
                >
                    <FormField
                        label="Tên"
                        error={errors?.label?.message}
                        isRequired
                    >
                        <Input
                            {...register('label')}
                            placeholder="Điền tên ngôn ngữ"
                        />
                    </FormField>
                    <FormField
                        label="Giá trị"
                        error={errors?.value?.message}
                        isRequired
                    >
                        <Input
                            {...register('value')}
                            placeholder="Điền tên ngôn ngữ"
                        />
                    </FormField>
                    <FormField>
                        <Checkbox {...register('isDefault')}>Mặc định</Checkbox>
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            type="button"
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
                            {language ? 'Lưu' : 'Thêm'}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
