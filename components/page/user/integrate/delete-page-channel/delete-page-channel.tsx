import { WarningModal } from '@components/ui';
import { useDeletePageChannel } from '@share/hooks/channel.hooks';
import { ReactElement } from 'react';

interface Props {
    children: ReactElement;
    pageId: string;
}
export function DeletePageChannel({ children, pageId }: Props) {
    const { isLoading, mutate, isSuccess } = useDeletePageChannel();

    return (
        <>
            <WarningModal
                isLoading={isLoading}
                isSuccess={isSuccess}
                content="Bạn chắc chắn muốn xoá trang này ra khỏi danh sách đồng bộ?"
                title="Xoá fanpage"
                type="warning"
                okProps={{
                    okText: 'Xoá',
                    async onOk() {
                        mutate({
                            id: pageId,
                        });
                    },
                }}
            >
                {children}
            </WarningModal>
        </>
    );
}
