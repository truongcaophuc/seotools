import { useDisclosure } from '@chakra-ui/react';
import { cloneElement } from 'react';
import { Modal } from './modal';

export function ActionModal({ modalAction, children }) {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <>
            {cloneElement(modalAction, { onClick: onToggle })}

            <Modal isOpen={isOpen} onClose={onToggle}>
                {children}
            </Modal>
        </>
    );
}
