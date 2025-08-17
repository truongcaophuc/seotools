import { WarningModal } from '@components/ui';
import { useDeleteFolderImage } from '@share/hooks/image.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ReactElement } from 'react';

interface Props {
    children: ReactElement;
    folderId: string;
}

export function DeleteFolderImage({ children, folderId }: Props) {
    const { t } = useTranslate();
    const { isLoading, mutate, isSuccess } = useDeleteFolderImage();

    return (
        <WarningModal
            type="warning"
            title={t('upload.folder_image.delete.title')}
            content={t('upload.folder_image.delete.content')}
            isLoading={isLoading}
            isSuccess={isSuccess}
            okProps={{
                okText: t('commons.delete'),
                async onOk() {
                    mutate({
                        id: folderId,
                    });
                },
            }}
        >
            {children}
        </WarningModal>
    );
}
