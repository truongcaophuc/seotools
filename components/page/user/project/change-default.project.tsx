import { Switch } from '@chakra-ui/react';
import { ProjectInfoFragment } from '@generated/graphql/query';
import { useMe } from '@share/hooks/auth.hooks';
import { useChangeDefaultProjectUser } from '@share/hooks/project.hooks';

interface Props {
    project: ProjectInfoFragment;
}
export function ChangeDefaultProject({ project }: Props) {
    const { isLoading, data } = useMe();
    const mutation = useChangeDefaultProjectUser();

    function handleChange() {
        mutation.mutate({
            projectId: project.id,
        });
    }

    const isDefault = project.id === data?.me?.defaultProjectId;

    return (
        <Switch
            isChecked={isDefault}
            onChange={handleChange}
            isDisabled={isLoading || mutation.isLoading}
        />
    );
}
