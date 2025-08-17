import { WarningModal } from '@components/ui';
import { useConfirmRequestBuyWord } from '@share/hooks/buy-word.hooks';
import { ReactElement } from 'react';

interface Props {
    buyWordId: string;
    children: ReactElement;
    isConfirm: boolean;
}

export function ConfirmBuyWord({ buyWordId, children, isConfirm }: Props) {
    const { isLoading, mutate, isSuccess } = useConfirmRequestBuyWord();
    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            type="warning"
            title="Xác nhận mua từ"
            content="Bạn muốn xác nhận tài khoản mua từ"
            okProps={{
                async onOk() {
                    mutate({
                        input: {
                            isConfirm,
                            buyWordId,
                        },
                    });
                },
            }}
        >
            {children}
        </WarningModal>
    );
}
