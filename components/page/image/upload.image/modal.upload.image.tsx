import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { ImageInfoFragment } from '@generated/graphql/query';
import { formatUrlImage } from '@share/helps/format-url-image';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement } from 'react';
import { UploadImage } from './upload.image';

interface Props {
    image: ImageInfoFragment;
    children: ReactElement;
    type?: 'update' | 'copy';
}

export function ModalUploadImage({ image, children, type = 'update' }: Props) {
    const { t } = useTranslate();
    const { isOpen, onToggle, onClose } = useDisclosure();

    const title = type === 'copy' ? t('commons.copy') : t('commons.edit');

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal size="full" title={title} isOpen={isOpen} onClose={onToggle}>
                <UploadImage
                    isEdit
                    defaultSource={formatUrlImage(image.src)}
                    callback={onClose}
                />
            </Modal>
        </>
    );
}
