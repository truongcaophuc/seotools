import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { cloneElement, ReactElement } from 'react';
import { FormService } from './form.service';

interface Props {
    children: ReactElement;
}

export function NewService({ children }: Props) {
    const { onOpen, isOpen, onClose } = useDisclosure();
    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal
                size="2xl"
                title="Thêm dịch vụ"
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormService callback={onClose} />
            </Modal>
        </>
    );
}
