import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { cloneElement, ReactElement } from 'react';
import { ListTeam } from './list.team';

interface Props {
    children: ReactElement;
}

export function SelectTeam({ children }: Props) {
    const { isOpen, onToggle } = useDisclosure();
    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal
                size="xl"
                title="Chọn team"
                isOpen={isOpen}
                onClose={onToggle}
            >
                <ListTeam />
            </Modal>
        </>
    );
}
