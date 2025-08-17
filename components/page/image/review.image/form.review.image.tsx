import {
    Input,
    Textarea,
    Button,
    VStack,
    HStack,
    Spacer,
} from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { type ImageInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateImage } from '@share/hooks/image.hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    image?: ImageInfoFragment;
}

const schema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
});

type FormReviewImageData = z.infer<typeof schema>;

export function FormReviewImage({ image }: Props) {
    const { isLoading, mutate } = useUpdateImage();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormReviewImageData>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: image?.name,
            description: image?.description,
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                ...data,
                id: image.id,
            },
        });
    });

    return (
        <VStack
            as="form"
            align="stretch"
            spacing="3"
            onSubmit={onSubmit}
            noValidate
        >
            <FormField label="Tên" error={errors?.name?.message}>
                <Input {...register('name')} />
            </FormField>
            <FormField label="Mô tả" error={errors?.description?.message}>
                <Textarea {...register('description')} />
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
