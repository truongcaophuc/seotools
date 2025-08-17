import { DashboardLayout } from '@components/layout/dashboard';
import { FormDocument } from '@components/page/user/document';
import { Loading, NotFound } from '@components/ui';
import { useDocument } from '@share/hooks/document.hooks';
import { useDocumentStore } from '@share/store/document.store';

const TITLE_PAGE = 'Bài viết';

export default function DocumentDetailPage() {
    const setDocument = useDocumentStore((state) => state.setDocument);

    const { isLoading, data, isError, fetchStatus } = useDocument(
        setDocument,
        true
    );

    if (isLoading || fetchStatus === 'fetching') {
        return (
            <DashboardLayout type="customer" showHeading={false} title="">
                <Loading full />
            </DashboardLayout>
        );
    }

    if (isError || !data) {
        return (
            <DashboardLayout type="customer" showHeading={false}>
                <NotFound
                    content="Không tìm thấy bài viết"
                    backLink="/user/document"
                />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            title={TITLE_PAGE}
            breadcrumb={[
                {
                    label: TITLE_PAGE,
                    href: '/user/document',
                },
            ]}
            showHeading={false}
            type="customer"
            layout="full"
        >
            <FormDocument />
        </DashboardLayout>
    );
}
