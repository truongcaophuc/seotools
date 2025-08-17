import { DashboardLayout } from '@components/layout/dashboard';
import { FormContent } from '@components/page/content';
import { Loading } from '@components/ui';
import { useContent } from '@share/hooks/content.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useRouter } from 'next/router';
import NotFoundPage from 'pages/404';

export default function DetailContentPage() {
    const { t } = useTranslate();
    const router = useRouter();
    const contentId = router.query.id ? router.query.id.toString() : '';

    const { isLoading, data } = useContent(contentId);

    if (isLoading) {
        return (
            <DashboardLayout type="customer">
                <Loading />
            </DashboardLayout>
        );
    }

    if (!data) {
        return <NotFoundPage />;
    }

    const content = data?.content;

    return (
        <DashboardLayout
            showHeading={false}
            title={content?.title}
            breadcrumb={[
                {
                    label: t('contents.title'),
                    href: '/user/content',
                },
                {
                    label: content?.title,
                },
            ]}
            type="customer"
            layout="full"
        >
            <FormContent content={content} />
        </DashboardLayout>
    );
}
