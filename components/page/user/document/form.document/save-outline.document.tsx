import { useUpdateDocument } from '@share/hooks/document.hooks';
import { useRouter } from 'next/router';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    outline: string;
    keywordId: string; // TODO: fix in feature after
}

export function SaveOutlineDocument({ children, outline, keywordId }: Props) {
    const router = useRouter();
    const { isLoading, mutate } = useUpdateDocument();

    const id = router.query.id ? router.query.id.toString() : '';

    function handleSaveOutline() {
        mutate({
            input: {
                id,
                data: {
                    keywordId,
                    outline,
                },
            },
        });
    }

    return cloneElement(children, { onClick: handleSaveOutline, isLoading });
}
