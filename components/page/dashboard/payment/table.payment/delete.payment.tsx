import { WarningModal } from '@components/ui';
import { useDeletePayment } from '@share/hooks/payment.hooks';
import { ReactElement } from 'react';

interface Props {
    children: ReactElement;
    paymentHistoryId: string;
}

export function DeletePayment({ children, paymentHistoryId }: Props) {
    const { isLoading, mutate, isSuccess } = useDeletePayment();

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            okProps={{
                async onOk() {
                    mutate({
                        id: paymentHistoryId,
                    });
                },
            }}
            type="warning"
            content="Bạn muốn xoá thanh toán này?"
        >
            {children}
        </WarningModal>
    );
}
