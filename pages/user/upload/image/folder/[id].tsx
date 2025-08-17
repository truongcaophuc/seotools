import { Box } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { ListImage } from '@components/page/image';
import { Loading, NotFound } from '@components/ui';
import { TypeFile } from '@generated/graphql/query';
import { useFolderImage } from '@share/hooks/image.hooks';

export default function FolderDetail() {
    const { isLoading, data } = useFolderImage();

    function renderContent() {
        if (isLoading) {
            return <Loading />;
        }

        if (!data) {
            return <NotFound />;
        }

        const folder = data?.folderImage;

        return (
            <Box>
                <ListImage folder={folder} type={TypeFile.Image} />
            </Box>
        );
    }

    const title = data?.folderImage?.name;

    return (
        <DashboardLayout
            showHeading={false}
            type="customer"
            title={title}
            breadcrumb={[
                { label: 'Thư mục', href: '/user/upload/folder' },
                { label: title },
            ]}
        >
            {renderContent()}
        </DashboardLayout>
    );
}
