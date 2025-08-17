import { Button } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { AddFolderImage, ListFolderImage } from '@components/page/image';
import { HeroIcon } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function FolderImagePage() {
    const { t } = useTranslate();

    const TITLE_PAGE = t('upload.images.folder');

    return (
        <DashboardLayout
            type="customer"
            title={TITLE_PAGE}
            breadcrumb={[
                {
                    label: TITLE_PAGE,
                },
            ]}
            extra={
                <AddFolderImage>
                    <Button
                        colorScheme="blue"
                        leftIcon={<HeroIcon as={PlusIcon} />}
                    >
                        {t('commons.add')}
                    </Button>
                </AddFolderImage>
            }
        >
            <ListFolderImage />
        </DashboardLayout>
    );
}
