import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement } from 'react';
import { FormProject } from './form.project';

interface Props {
    children: ReactElement;
}

export function AddProject({ children }: Props) {
    const { t } = useTranslate();
    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal
                title={t('team.project.add_project.title')}
                onClose={onToggle}
                isOpen={isOpen}
            >
                <FormProject callback={onToggle} />
            </Modal>
        </>
    );
}
