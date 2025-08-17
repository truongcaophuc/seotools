import { UserRole } from '@generated/graphql/query';
import { useMe } from '@share/hooks/auth.hooks';
import { useDeleteProject } from '@share/hooks/project.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    projectId: string;
}

export function DeleteProject({ children, projectId }: Props) {
    const { isLoading: isLoadingMe, data } = useMe();
    const { isLoading, mutate } = useDeleteProject();

    const isDisabled = data?.me.role === UserRole.Staff;

    function handleClick() {
        if (isDisabled) return;
        mutate({ id: projectId });
    }

    return (
        <>
            {cloneElement(children, {
                isLoading: isLoadingMe || isLoading,
                onClick: handleClick,
                isDisabled,
            })}
        </>
    );
}
