import { useDeleteTeam } from '@share/hooks/team.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    id: string;
}

export function DeleteTeam({ children, id }: Props) {
    const { mutate, isLoading } = useDeleteTeam();
    function handleClick() {
        if (isLoading) return;
        mutate({ teamId: id });
    }

    return cloneElement(children, { onClick: handleClick, isLoading });
}
