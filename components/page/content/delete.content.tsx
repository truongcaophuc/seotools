import { WarningModal } from '@components/ui';
import { useDeleteContent } from '@share/hooks/content.hooks';
import { ReactElement } from 'react';

interface Props {
    children: ReactElement;
    contentId: string;
}

export function DeleteContent({ children, contentId }: Props) {
    const { isLoading, isSuccess, mutate } = useDeleteContent();

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            okProps={{
                okText: 'Xoá',
                async onOk() {
                    mutate({ id: contentId });
                },
            }}
            title="Xoá nội dung"
            content="Bạn chắc chắn muốn xoá nội dung này?"
            type="warning"
        >
            {children}
        </WarningModal>
    );
}
