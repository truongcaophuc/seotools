import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { cloneElement, ReactElement } from 'react';
import { FormAddMember } from './form.add.member';

interface Props {
    children: ReactElement;
}
export function AddMember({ children }: Props) {
    const { onToggle, isOpen, onClose } = useDisclosure();

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal title="Thêm thành viên" isOpen={isOpen} onClose={onClose}>
                <FormAddMember callback={() => onClose()} />
            </Modal>
        </>
    );
}
