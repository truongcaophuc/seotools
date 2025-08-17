import { HStack, Input, Spinner } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateProject } from '@share/hooks/project.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    title: string;
    id: string;
}

const schema = z.object({
    name: z.string().min(1, ''),
});

type FormDataType = z.infer<typeof schema>;

export function TitleCardProjectList({ title, id }: Props) {
    const { isLoading, mutate } = useUpdateProject();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormDataType>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: title,
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (isLoading) return;
        mutate({
            input: {
                id,
                data: {
                    name: data.name,
                },
            },
        });
    });

    const isError = errors?.name;

    return (
        <HStack as="form" onSubmit={onSubmit}>
            <Input
                fontWeight="semibold"
                {...register('name')}
                p="0"
                minH="0"
                h="auto"
                borderWidth={isError ? '1px' : '0px'}
                borderColor={isError ? 'red.500' : 'transparent'}
            />
            {isLoading ? <Spinner size="sm" color="gray.400" /> : null}
        </HStack>
    );
}
