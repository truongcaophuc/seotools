import { WarningModal } from '@components/ui';
import { PaymentHistoryInfoFragment } from '@generated/graphql/query';
import { useConfirmPayment } from '@share/hooks/payment.hooks';
import { ReactElement } from 'react';

interface Props {
    children: ReactElement;
    payment: PaymentHistoryInfoFragment;
}

export function ConfirmPayment({ children, payment }: Props) {
    const { isLoading, mutate, isSuccess } = useConfirmPayment();

    const content = `Xác nhận đã nhận ${payment.amount} từ khách hàng ${payment.createdBy.fullname}`;

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            okProps={{
                async onOk() {
                    mutate({
                        id: payment.id,
                    });
                },
            }}
            type="warning"
            content={content}
        >
            {children}
        </WarningModal>
    );
}
