import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { ServiceCategoryInfoFragment } from '@generated/graphql/query';
import { cloneElement, type ReactElement } from 'react';
import { FormCategoryService } from './form.category.service';

interface Props {
    children: ReactElement;
    category?: ServiceCategoryInfoFragment;
}

export function EditCategoryService({ children, category }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal size="xl" title="Cập nhật" isOpen={isOpen} onClose={onClose}>
                <FormCategoryService category={category} />
            </Modal>
        </>
    );
}
