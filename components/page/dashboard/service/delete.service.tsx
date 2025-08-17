import { WarningModal } from '@components/ui';
import { useDeleteService } from '@share/hooks/service.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    id: string;
}

export function DeleteService({ children, id }: Props) {
    const { mutate, isLoading, isSuccess } = useDeleteService();

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            type="warning"
            title="Xoá dịch vụ"
            content="Bạn chắc chắn muốn xoá dịch vụ?"
            okProps={{
                okText: 'Xoá',
                async onOk() {
                    mutate({
                        id,
                    });
                },
            }}
        >
            {children}
        </WarningModal>
    );
}
