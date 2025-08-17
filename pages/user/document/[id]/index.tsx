import { DashboardLayout } from '@components/layout/dashboard';
import { ErrorLayout } from '@components/layout/error';
import { FormDocument } from '@components/page/user/document';
import { Loading } from '@components/ui';
import { useDocument } from '@share/hooks/document.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useDocumentStore } from '@share/store/document.store';

export default function DocumentDetailPage() {
    const { t } = useTranslate();
    const setDocument = useDocumentStore((state) => state.setDocument);

    const { isLoading, data, isError, fetchStatus } = useDocument(setDocument);

    if (isLoading || fetchStatus === 'fetching') {
        return (
            <DashboardLayout type="customer" showHeading={false} title="">
                <Loading full />
            </DashboardLayout>
        );
    }

    if (isError || !data) {
        return (
            <ErrorLayout
                content={t('post.not_post.content')}
                description={t('post.not_post.description')}
            />
        );
    }

    const TITLE_PAGE = t('posts.title');

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
