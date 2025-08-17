import {
    Button,
    HStack,
    Input,
    Select,
    Spacer,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { FormField } from '@components/ui';
import {
    ModelAi,
    ServiceDashboardInfoFragment,
} from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddService, useUpdateService } from '@share/hooks/service.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { CustomFieldTags } from './custom-field.tags';
import { SelectCategoryService } from './select.category.service';

const schema = z.object({
    title: z.string().min(1, 'Vui lòng điền Tên dịch vụ'),
    leadingSentence: z.string().min(1, 'Vui lòng điền Câu dẫn dắt'),
    // leadingStyleContent: z
    //     .string()
    //     .min(1, 'Vui lòng điền Câu dẫn dắt ngôn ngữ'),
    // leadingLanguage: z.string().min(1, 'Vui lòng điền Câu dẫn dắt phong cách'),
    systemMessage: z.string().optional(),
    description: z.string(),
    categoryId: z.string().optional(),
    model: z.enum([ModelAi.Davinci, ModelAi.Gpt, ModelAi.Gpt4], {
        errorMap(issue, ctx) {
            return { message: 'Chọn model Ai' };
        },
    }),
});

type FormServiceData = z.infer<typeof schema>;

interface Props {
    service?: ServiceDashboardInfoFragment;
    callback?: () => void;
}

export function FormService({ service, callback }: Props) {
    const mutationAddService = useAddService();
    const mutationUpdateService = useUpdateService();
    const {
        register,
        handleSubmit,
        setValue,
        getValues,
        getFieldState,
        watch,
        formState: { errors },
    } = useForm<FormServiceData>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: service?.title,
            leadingSentence: service?.leadingSentence || '',
            // leadingLanguage: service?.leadingLanguage || '',
            // leadingStyleContent: service?.leadingStyleContent || '',
            description: service?.description,
            systemMessage: service?.systemMessage,
            categoryId: service?.categoryId,
            model: service?.model,
        },
    });

    const leadingSentence = watch('leadingSentence');

    const handleAddCustomField = (
        value: string,
        field: keyof FormServiceData
    ) => {
        const valueField = getValues(field);
        const text = `${valueField} ${value}`;

        setValue(field, text);
    };

    const onSubmit = handleSubmit((data) => {
        if (!service) {
            mutationAddService.mutate(
                {
                    input: data,
                },
                {
                    onSuccess() {
                        if (callback) {
                            callback();
                        }
                    },
                }
            );
        } else {
            mutationUpdateService.mutate(
                {
                    input: {
                        id: service.id,
                        data,
                    },
                },
                {
                    onSuccess() {
                        if (callback) {
                            callback();
                        }
                    },
                }
            );
        }
    });

    const isLoading =
        mutationAddService.isLoading || mutationUpdateService.isLoading;

    return (
        <VStack
            align="stretch"
            as="form"
            spacing="5"
            noValidate
            onSubmit={onSubmit}
        >
            <FormField isRequired label="Tên" error={errors?.title?.message}>
                <Input {...register('title')} placeholder="Điền tên dịch vụ" />
            </FormField>

            <FormField label="Nhóm dịch vụ">
                <SelectCategoryService {...register('categoryId')} />
            </FormField>

            <FormField
                label="Model Ai"
                isRequired
                error={errors?.model?.message}
            >
                <Select {...register('model')} placeholder="Chọn model Ai">
                    <option value={ModelAi.Davinci}>{ModelAi.Davinci}</option>
                    <option value={ModelAi.Gpt}>{ModelAi.Gpt}</option>
                    <option value={ModelAi.Gpt4}>{ModelAi.Gpt4}</option>
                </Select>
            </FormField>

            <FormField
                isRequired
                label="Vai trò"
                helpText={
                    <CustomFieldTags
                        onClick={(value) =>
                            handleAddCustomField(value, 'systemMessage')
                        }
                    />
                }
                error={errors?.systemMessage?.message}
            >
                <Textarea
                    {...register('systemMessage')}
                    placeholder="Điền nội dung vai trò"
                />
            </FormField>

            <FormField
                isRequired
                label="Câu dẫn dắt"
                helpText={
                    <CustomFieldTags
                        onClick={(value) =>
                            handleAddCustomField(value, 'leadingSentence')
                        }
                    />
                }
                error={errors?.leadingSentence?.message}
            >
                <Textarea
                    {...register('leadingSentence')}
                    placeholder="Điền câu dẫn dắt"
                />
            </FormField>
            {
                // <FormField
                //     isRequired
                //     label="Câu dẫn dắt ngôn ngữ"
                //     error={errors?.leadingLanguage?.message}
                // >
                //     <Input
                //         {...register('leadingLanguage')}
                //         placeholder="Điền câu dẫn dắt ngôn ngữ"
                //     />
                // </FormField>
                // <FormField
                //     isRequired
                //     label="Câu dẫn dắt phong cách"
                //     error={errors?.leadingStyleContent?.message}
                // >
                //     <Input
                //         {...register('leadingStyleContent')}
                //         placeholder="Điền câu dẫn dắt phong cách"
                //     />
                // </FormField>
            }
            <FormField label="Mô tả" error={errors?.description?.message}>
                <Textarea
                    {...register('description')}
                    placeholder="Điền mô tả tên dịch vụ"
                />
            </FormField>

            <HStack>
                <Spacer />
                <Button isDisabled={isLoading} type="button">
                    Huỷ
                </Button>
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    {!!service ? 'Cập nhật' : 'Thêm'}
                </Button>
            </HStack>
        </VStack>
    );
}
