import { Button, HStack, Input, Spacer, VStack } from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { TeamInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddTeam, useUpdateTeam } from '@share/hooks/team.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    callback?: () => void;
    team?: TeamInfoFragment;
}

export function FormTeam({ callback, team }: Props) {
    const { t } = useTranslate();

    const schema = z.object({
        name: z.string().min(1, t('workspace.team.form.name.error.required')),
    });
    const mutationAdd = useAddTeam();
    const mutationUpdate = useUpdateTeam();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: team?.name,
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (!!team) {
            mutationUpdate.mutate(
                {
                    input: {
                        id: team.id,
                        data,
                    },
                },
                {
                    onSuccess() {
                        if (callback) callback();
                    },
                }
            );
            return;
        }
        mutationAdd.mutate(
            {
                input: data,
            },
            {
                onSuccess() {
                    if (callback) callback();
                },
            }
        );
    });

    const isLoading = mutationAdd.isLoading || mutationUpdate.isLoading;

    return (
        <VStack
            align="stretch"
            spacing="4"
            as="form"
            noValidate
            onSubmit={onSubmit}
        >
            <FormField
                label={t('workspace.team.form.name.label')}
                isRequired
                error={errors?.name?.message}
            >
                <Input
                    {...register('name')}
                    placeholder={t('workspace.team.form.name.placeholder')}
                />
            </FormField>
            <HStack>
                <Spacer />
                <Button isDisabled={isLoading} type="button" variant="ghost">
                    {t('commons.cancel')}
                </Button>
                <Button colorScheme="green" isLoading={isLoading} type="submit">
                    {!!team ? t('commons.save') : t('commons.add')}
                </Button>
            </HStack>
        </VStack>
    );
}
