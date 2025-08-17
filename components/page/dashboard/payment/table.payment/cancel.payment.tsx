import { WarningModal } from '@components/ui';
import { useCancelPayment } from '@share/hooks/payment.hooks';
import { ReactElement } from 'react';

interface Props {
    children: ReactElement;
    paymentHistoryId: string;
}

export function CancelPayment({ children, paymentHistoryId }: Props) {
    const { isLoading, mutate, isSuccess } = useCancelPayment();
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
            content="Bạn muốn huỷ thanh toán này?"
        >
            {children}
        </WarningModal>
    );
}
