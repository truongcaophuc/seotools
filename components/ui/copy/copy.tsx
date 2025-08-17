import { useToast } from '@share/hooks/useToast';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    content: string;
}

export function Copy({ children, content }: Props) {
    const { toastSuccess } = useToast();

    const onClick = () => {
        navigator.clipboard.writeText(content);
        toastSuccess('Sao chép thành công');
    };

    return cloneElement(children, { onClick });
}
