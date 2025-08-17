import { useDeleteKeyword } from '@share/hooks/keyword.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    keywordId: string;
}

export function DeleteKeyword({ children, keywordId }: Props) {
    const { isLoading, mutate } = useDeleteKeyword();

    function handleClick() {
        mutate({
            id: keywordId,
        });
    }

    return <>{cloneElement(children, { onClick: handleClick, isLoading })}</>;
}
