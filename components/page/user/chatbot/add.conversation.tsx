import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement } from 'react';
import { FormConversation } from './form.conversation';

interface Props {
    children: ReactElement;
    messages?: Array<any>;
}

export function AddConversation({ children, messages = [] }: Props) {
    const { t } = useTranslate();
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal
                title={t('chatbot.new_conversation')}
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormConversation
                    messages={messages}
                    callback={() => onClose()}
                />
            </Modal>
        </>
    );
}
