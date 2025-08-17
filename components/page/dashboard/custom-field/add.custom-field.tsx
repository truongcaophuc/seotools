import {
    Button,
    Input,
    Select,
    Textarea,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Modal } from '@components/ui';
import {
    CustomFieldInfoFragment,
    CustomFieldInputType,
} from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddCustomField } from '@share/hooks/custom-field.hooks';
import { pick } from 'lodash';
import { cloneElement, ReactElement } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    children: ReactElement;
    customField?: CustomFieldInfoFragment;
}

const schema = z.object({
    title: z.string().min(1),
    field: z.string().min(1),
    inputType: z.enum([
        CustomFieldInputType.Input,
        CustomFieldInputType.Textarea,
        CustomFieldInputType.StyleContent,
        CustomFieldInputType.Language,
    ]),
    description: z.string().optional(),
});

type AddCustomFieldData = z.infer<typeof schema>;

export function AddCustomField({ children, customField }: Props) {
    const { isLoading, mutate } = useAddCustomField();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<AddCustomFieldData>({
        resolver: zodResolver(schema),
        defaultValues: pick(customField, [
            'title',
            'field',
            'inputType',
            'description',
        ]),
    });

    const onSubmit = handleSubmit((data) => {
        mutate(
            {
                input: {
                    id: customField?.id,
                    title: data.title,
                    field: data.field,
                    description: data.description,
                    inputType: data.inputType,
                },
            },
            {
                onSuccess: () => {
                    reset();
                    onClose();
                },
            }
        );
    });

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal title="Thêm custom field" isOpen={isOpen} onClose={onClose}>
                <VStack as="form" spacing="6" noValidate onSubmit={onSubmit}>
                    <FormField
                        label="Tên"
                        isRequired
                        error={errors?.title?.message}
                    >
                        <Input {...register('title')} />
                    </FormField>
                    <FormField
                        label="Nội dung"
                        isRequired
                        helpText="Bắt đầu bằng $"
                        error={errors?.field?.message}
                    >
                        <Input {...register('field')} />
                    </FormField>
                    <FormField
                        label="Loại input"
                        isRequired
                        error={errors?.inputType?.message}
                    >
                        <Select
                            {...register('inputType')}
                            placeholder="Chọn loại input"
                        >
                            <option value={CustomFieldInputType.Input}>
                                Input
                            </option>
                            <option value={CustomFieldInputType.Textarea}>
                                Textarea
                            </option>
                            <option value={CustomFieldInputType.Language}>
                                Ngôn ngữ
                            </option>
                            <option value={CustomFieldInputType.StyleContent}>
                                Phong cách
                            </option>
                        </Select>
                    </FormField>
                    <FormField
                        label="Mô tả"
                        error={errors?.description?.message}
                    >
                        <Textarea {...register('description')} />
                    </FormField>
                    <Button
                        isLoading={isLoading}
                        colorScheme="green"
                        type="submit"
                    >
                        {customField ? 'Lưu' : 'Thêm'}
                    </Button>
                </VStack>
            </Modal>
        </>
    );
}
