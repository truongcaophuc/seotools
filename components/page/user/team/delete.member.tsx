import { ReactElement } from 'react';
import { WarningModal } from '@components/ui';
import { useDeleteMember } from '@share/hooks/customer.hooks';

interface Props {
    children: ReactElement;
    memberId: string;
}

export function DeleteMember({ children, memberId }: Props) {
    const { isLoading, mutate, isSuccess } = useDeleteMember();

    return (
        <WarningModal
            type="warning"
            content="Bạn muốn xoá thành viên?"
            okProps={{
                async onOk() {
                    mutate({ memberId });
                },
            }}
            isSuccess={isSuccess}
            isLoading={isLoading}
        >
            {children}
        </WarningModal>
    );
}
