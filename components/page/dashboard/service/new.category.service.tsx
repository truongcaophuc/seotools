import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { cloneElement, ReactElement } from 'react';
import { FormCategoryService } from './form.category.service';

interface Props {
    children: ReactElement;
}

export function NewCategoryService({ children }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    async function handleClose() {
        onClose();
    }

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}

            <Modal title="Thêm mới" isOpen={isOpen} onClose={handleClose}>
                <FormCategoryService callback={handleClose} />
            </Modal>
        </>
    );
}
