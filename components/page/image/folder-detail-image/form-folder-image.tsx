import {
    Button,
    HStack,
    Input,
    Spacer,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { FolderImageInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateFolderImage } from '@share/hooks/image.hooks';
import { useQueryClient } from '@tanstack/react-query';
import { pick } from 'lodash';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    folder?: FolderImageInfoFragment;
}

const schema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
});

type FormFolderImageData = z.infer<typeof schema>;

export function FormFolderImage({ folder }: Props) {
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useUpdateFolderImage();
    const { handleSubmit, register } = useForm<FormFolderImageData>({
        resolver: zodResolver(schema),
        defaultValues: pick(folder, ['name', 'description']),
    });

    const onSubmit = handleSubmit((data) => {
        if (folder) {
            mutate(
                {
                    input: {
                        id: folder.id,
                        name: data.name,
                        description: data.description,
                    },
                },
                {
                    onSuccess() {
                        queryClient.invalidateQueries([
                            'FolderImage',
                            { id: folder.id },
                        ]);
                    },
                }
            );
        }
    });

    return (
        <VStack onSubmit={onSubmit} align="stretch" spacing="4" as="form">
            <FormField label="Tên">
                <Input
                    {...register('name')}
                    placeholder="Điền tên thư mực"
                    bgColor="white"
                />
            </FormField>
            <FormField label="Mô tả">
                <Textarea
                    {...register('description')}
                    placeholder="Điền mô tả thư mục"
                    bgColor="white"
                />
            </FormField>
            <HStack>
                <Spacer />
                <Button type="submit" isLoading={isLoading} colorScheme="green">
                    Lưu
                </Button>
            </HStack>
        </VStack>
    );
}
