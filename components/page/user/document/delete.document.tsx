import { WarningModal } from '@components/ui';
import { useDeleteDocument } from '@share/hooks/document.hooks';
import { ReactElement } from 'react';

interface Props {
    id: string;
    children: ReactElement;
    callback?: () => void;
}

export function DeleteDocument({ children, id, callback }: Props) {
    const { isLoading, mutate, isSuccess } = useDeleteDocument();

    const handleClick = () => {
        mutate({
            id,
        });
    };

    return (
        <WarningModal
            content="Bạn chắc chắn muốn xoá bài viết?"
            isLoading={isLoading}
            isSuccess={isSuccess}
            type="warning"
            okProps={{
                onOk: async () => {
                    handleClick();
                },
            }}
            callback={callback}
        >
            {children}
        </WarningModal>
    );
}
