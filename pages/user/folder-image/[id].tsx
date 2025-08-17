import { DashboardLayout } from '@components/layout/dashboard';
import { FolderImageDetail } from '@components/page/image/folder-detail-image';
import { Loading, NotFound } from '@components/ui';
import { useFolderImage } from '@share/hooks/image.hooks';

export default function FolderImageDetailPage() {
    const { isLoading, data } = useFolderImage();

    if (isLoading) {
        return (
            <DashboardLayout
                title=""
                breadcrumb={[]}
                type="customer"
                layout="full"
            >
                <Loading />
            </DashboardLayout>
        );
    }

    if (!data) {
        return (
            <DashboardLayout
                title=""
                breadcrumb={[]}
                type="customer"
                layout="full"
            >
                <NotFound />
            </DashboardLayout>
        );
    }

    const folder = data?.folderImage;

    return (
        <DashboardLayout
            showHeading={false}
            title={folder?.name}
            breadcrumb={[
                { label: 'Thư mục ảnh', href: '/user/folder-image' },
                { label: data?.folderImage?.name },
            ]}
            type="customer"
            layout="full"
        >
            <FolderImageDetail folder={folder} />
        </DashboardLayout>
    );
}
