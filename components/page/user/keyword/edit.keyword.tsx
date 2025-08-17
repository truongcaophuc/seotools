import { Button, HStack, Input } from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { KeywordInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateKeyword } from '@share/hooks/keyword.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { MenuActionKeyword } from './menu-action.keyword';

const schema = z.object({
    value: z.string().min(1, 'Từ khoá không được bỏ trống'),
});

type EditKeywordData = z.infer<typeof schema>;

interface Props {
    keyword: KeywordInfoFragment;
}

export function EditKeyword({ keyword }: Props) {
    const { isLoading, mutate } = useUpdateKeyword();

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<EditKeywordData>({
        resolver: zodResolver(schema),
        defaultValues: {
            value: keyword.value,
        },
    });

    const onSubmit = handleSubmit((values) => {
        mutate({
            input: {
                id: keyword.id,
                data: {
                    value: values.value,
                },
            },
        });
    });

    return (
        <form onSubmit={onSubmit}>
            <HStack>
                <FormField error={errors?.value?.message}>
                    <Input
                        bgColor="white"
                        placeholder="Điền từ khoá"
                        {...register('value')}
                    />
                </FormField>
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    Lưu
                </Button>
                <MenuActionKeyword keyword={keyword} />
            </HStack>
        </form>
    );
}
