import { useDeleteServiceCategory } from '@share/hooks/service.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    id: string;
}
export function DeleteCategoryService({ children, id }: Props) {
    const { isLoading, mutate } = useDeleteServiceCategory();
    const handleClick = () => {
        mutate({
            id,
        });
    };
    return cloneElement(children, { onClick: handleClick, isLoading });
}
