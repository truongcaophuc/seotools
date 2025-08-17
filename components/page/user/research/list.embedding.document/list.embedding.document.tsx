import { useDisclosure } from '@chakra-ui/react';
import { Modal, NotPremium } from '@components/ui';
import { useTranslate } from '@share/hooks/translate.hooks';
import { usePremiumWorkspace } from '@share/hooks/workspace.hooks';
import { cloneElement, ReactElement } from 'react';
import { TableEmbeddingDocument } from './table.embedding.document';

interface Props {
    children: ReactElement;
}

export function ListEmbeddingDocument({ children }: Props) {
    const { t } = useTranslate();
    const { isOpen, onToggle } = useDisclosure();
    const isPremium = usePremiumWorkspace();

    function renderContent() {
        if (isPremium) {
            return <TableEmbeddingDocument />;
        }

        return <NotPremium />;
    }

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}

            <Modal
                size="4xl"
                isOpen={isOpen}
                onClose={onToggle}
                title={t('upload.document.title')}
                bodyProps={{ p: 0 }}
            >
                {renderContent()}
            </Modal>
        </>
    );
}
