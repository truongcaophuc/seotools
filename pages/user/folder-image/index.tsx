import { Button } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { ListFolderImage, AddFolderImage } from '@components/page/image';
import { HeroIcon } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';

const TITLE_PAGE = 'Folder ảnh';

export default function ImagePage() {
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
                        Thêm
                    </Button>
                </AddFolderImage>
            }
        >
            <ListFolderImage />
        </DashboardLayout>
    );
}
