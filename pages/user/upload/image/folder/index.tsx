import { Button } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { ListFolderImage, AddFolderImage } from '@components/page/image';
import { HeroIcon } from '@components/ui';
import { TypeFile } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';

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
                <>
                    <Button
                        size="sm"
                        variant="outline"
                        as={Link}
                        href="/user/upload/image"
                    >
                        {t('upload.images.title')}
                    </Button>

                    <AddFolderImage type={TypeFile.Image}>
                        <Button
                            size="sm"
                            colorScheme="blue"
                            leftIcon={<HeroIcon as={PlusIcon} />}
                        >
                            {t('commons.add')}
                        </Button>
                    </AddFolderImage>
                </>
            }
        >
            <ListFolderImage />
        </DashboardLayout>
    );
}
