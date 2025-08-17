import { HeroIcon, WarningModal } from '@components/ui';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useDeleteConversation } from '@share/hooks/chatbot.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ReactElement } from 'react';

interface Props {
    children?: ReactElement;
    conversationId: string;
}

export function RemoveConversation({ children, conversationId }: Props) {
    const { t } = useTranslate();
    const { isLoading, mutate } = useDeleteConversation();

    return (
        <WarningModal
            isLoading={isLoading}
            type="warning"
            content={t('chatbot.remove_conversation.content')}
            okProps={{
                okText: t('commons.delete'),
                btnProps: {
                    isLoading,
                },
                async onOk() {
                    mutate({
                        conversationId,
                    });
                },
            }}
        >
            {children || <HeroIcon as={XMarkIcon} />}
        </WarningModal>
    );
}
