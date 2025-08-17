import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement } from 'react';
import { FormTeam } from './form.team';

interface Props {
    children: ReactElement;
}

export function AddTeam({ children }: Props) {
    const { t } = useTranslate();
    const { onToggle, isOpen } = useDisclosure();

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}

            <Modal
                title={t('workspace.team.add_team')}
                isOpen={isOpen}
                onClose={onToggle}
            >
                <FormTeam callback={onToggle} />
            </Modal>
        </>
    );
}
