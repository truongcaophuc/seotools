import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { ServiceInfoFragment } from '@generated/graphql/query';
import { cloneElement, ReactElement } from 'react';
import { FormService } from './form.service';

interface Props {
    children: ReactElement;
    service: ServiceInfoFragment;
}

export function EditService({ service, children }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal
                size="xl"
                title="Cập nhật dịch vụ"
                isOpen={isOpen}
                onClose={onClose}
            >
                <FormService service={service} />
            </Modal>
        </>
    );
}
