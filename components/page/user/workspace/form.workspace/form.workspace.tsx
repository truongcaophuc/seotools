import {
    Button,
    HStack,
    Input,
    Spacer,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { FormField, Heading, Loading } from '@components/ui';
import { WorkspaceInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMe } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useUpdateWorkspace } from '@share/hooks/workspace.hooks';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

interface Props {
    workspace?: WorkspaceInfoFragment;
}

export function FormWorkspaceComp({ workspace }: Props) {
    const { t } = useTranslate();
    const { isLoading, mutate } = useUpdateWorkspace();
    const schema = z.object({
        name: z.string().min(1, t('workspace.edit.form.name.error.required')),
        description: z.string().optional(),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: workspace?.name,
            description: workspace?.description,
        },
    });

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                id: workspace?.id,
                ...data,
            },
        });
    });

    return (
        <VStack
            as="form"
            onSubmit={onSubmit}
            noValidate
            align="stretch"
            spacing="5"
        >
            <Heading>{t('workspace.edit.title')}</Heading>

            <FormField
                label={t('workspace.edit.form.name.label')}
                isRequired
                error={errors?.name?.message}
            >
                <Input
                    placeholder={t('workspace.edit.form.name.placeholder')}
                    {...register('name')}
                />
            </FormField>

            <FormField
                label={t('workspace.edit.form.description.label')}
                error={errors?.description?.message}
            >
                <Textarea
                    placeholder={t(
                        'workspace.edit.form.description.placeholder'
                    )}
                    {...register('description')}
                />
            </FormField>
            <HStack>
                <Spacer />
                <Button isLoading={isLoading} colorScheme="green" type="submit">
                    {t('commons.save')}
                </Button>
            </HStack>
        </VStack>
    );
}
export function FormWorkspace() {
    const { isLoading, data } = useMe();

    function renderContent() {
        if (isLoading) {
            return <Loading />;
        }

        const workspace = data?.me?.workspace;

        return <FormWorkspaceComp workspace={workspace} />;
    }

    return <>{renderContent()}</>;
}
