import {
    Button,
    HStack,
    Input,
    Spacer,
    Textarea,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { ServiceCategoryInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    useAddServiceCategory,
    useUpdateServiceCategory,
} from '@share/hooks/service.hooks';
import { pick } from 'lodash';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    category?: ServiceCategoryInfoFragment;
    callback?: () => void;
}

const schema = z.object({
    title: z.string().min(1, 'Vui lòng điền Tên nhóm dịch vụ'),
    description: z.string(),
});

type FormNewCategoryServiceData = z.infer<typeof schema>;

export function FormCategoryService({ callback, category }: Props) {
    const mutationAdd = useAddServiceCategory();
    const mutationUpdate = useUpdateServiceCategory();
    const {
        handleSubmit,
        register,
        formState: { errors },
        reset,
    } = useForm<FormNewCategoryServiceData>({
        resolver: zodResolver(schema),
        defaultValues: pick(category, ['title', 'description']),
    });

    const { getInputProps } = useNumberInput({
        defaultValue: category?.order,
        step: 1,
    });

    function handleClose() {
        reset();

        if (callback) callback();
    }

    const input = getInputProps();

    const onSubmit = handleSubmit((data) => {
        if (!!category) {
            mutationUpdate.mutate(
                {
                    input: { id: category.id, data, order: +input.value },
                },
                {
                    onSuccess() {
                        handleClose();
                    },
                }
            );
        } else {
            mutationAdd.mutate(
                {
                    input: data,
                },
                {
                    onSuccess() {
                        handleClose();
                    },
                }
            );
        }
    });

    return (
        <VStack
            as="form"
            align="stretch"
            noValidate
            spacing="5"
            onSubmit={onSubmit}
        >
            <FormField
                isRequired
                label="Tên nhóm dịch vụ"
                error={errors?.title?.message}
            >
                <Input
                    {...register('title')}
                    placeholder="Điền tên nhóm dịch vụ"
                />
            </FormField>
            <FormField label="Mô tả" error={errors?.description?.message}>
                <Textarea
                    {...register('description')}
                    placeholder="Điền mô tả tên nhóm dịch vụ"
                />
            </FormField>
            <FormField label="Thứ tự sắp xếp">
                <Input {...input} placeholder="Điền thứ tự sắp xếp" />
            </FormField>
            <HStack>
                <Spacer />
                <Button
                    isLoading={
                        mutationAdd.isLoading || mutationUpdate.isLoading
                    }
                    colorScheme="green"
                    type="submit"
                >
                    {!!category ? 'Cập nhật' : 'Thêm'}
                </Button>
            </HStack>
        </VStack>
    );
}
