import {
    Button,
    Input,
    VStack,
    Textarea,
    InputGroup,
    InputLeftAddon,
    HStack,
    Spacer,
} from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { ProjectInfoFragment } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAddProject, useUpdateProject } from '@share/hooks/project.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface Props {
    project?: ProjectInfoFragment;
    callback?: () => void;
}

export function FormProject({ callback, project }: Props) {
    const { t } = useTranslate();

    const mutationAddProject = useAddProject();
    const mutationUpdateProject = useUpdateProject();

    const schema = z.object({
        name: z
            .string()
            .min(1, t('team.project.add_project.form.name.error.required')),
        url: z.string().optional(),
        description: z.string().optional(),
    });

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            name: project?.name,
            url: project?.url,
            description: project?.description,
        },
    });

    function handleSuccess() {
        if (callback) callback();
        reset();
    }

    const onSubmit = handleSubmit((data) => {
        if (project) {
            mutationUpdateProject.mutate(
                {
                    input: {
                        id: project.id,
                        data: {
                            name: data.name,
                            url: data.url,
                            description: data.description,
                        },
                    },
                },
                {
                    onSuccess() {
                        handleSuccess();
                    },
                }
            );
        } else {
            mutationAddProject.mutate(
                {
                    input: {
                        name: data.name,
                        url: data.url,
                        description: data.description,
                    },
                },
                {
                    onSuccess() {
                        handleSuccess();
                    },
                }
            );
        }
    });

    const isLoading =
        mutationUpdateProject.isLoading || mutationAddProject.isLoading;

    return (
        <VStack
            align="stretch"
            as="form"
            spacing="5"
            noValidate
            onSubmit={onSubmit}
        >
            <FormField label={t('team.project.add_project.form.name.label')}>
                <Input
                    {...register('name')}
                    placeholder={t(
                        'team.project.add_project.form.name.placeholder'
                    )}
                />
            </FormField>
            <FormField label={t('team.project.add_project.form.url.label')}>
                <InputGroup>
                    <InputLeftAddon children="https://" />
                    <Input
                        {...register('url')}
                        placeholder={t(
                            'team.project.add_project.form.url.placeholder'
                        )}
                    />
                </InputGroup>
            </FormField>

            <FormField
                label={t('team.project.add_project.form.description.label')}
            >
                <Textarea
                    {...register('description')}
                    placeholder={t(
                        'team.project.add_project.form.description.placeholder'
                    )}
                />
            </FormField>
            <HStack>
                <Spacer />
                <Button type="button" variant="ghost" isDisabled={isLoading}>
                    {t('commons.cancel')}
                </Button>
                <Button isLoading={isLoading} type="submit" colorScheme="green">
                    {project ? t('commons.save') : t('commons.add')}
                </Button>
            </HStack>
        </VStack>
    );
}
