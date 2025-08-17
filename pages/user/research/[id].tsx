import { Box, Flex } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import QuestionResearch from '@components/page/user/research/question.research/question.research';
import { Loading, NotFound, NotPremium } from '@components/ui';
import { formatUrlImage } from '@share/helps/format-url-image';
import { useConversation } from '@share/hooks/chatbot.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { usePremiumWorkspace } from '@share/hooks/workspace.hooks';
import { useRouter } from 'next/router';
import { Suspense, lazy } from 'react';

const PDFViewer = lazy(() => import('@components/ui/pdf-view/pdf-view'));

export default function ResearchDetail() {
    const { t } = useTranslate();
    const router = useRouter();

    let conversationId = router.query.id ? router.query.id.toString() : '';

    const { isLoading, data: conversationData } =
        useConversation(conversationId);
    const isPremium = usePremiumWorkspace();

    if (!isPremium) {
        return (
            <DashboardLayout
                showHeading={false}
                type="customer"
                title={t('research.research')}
                breadcrumb={[
                    { label: t('research.title'), href: '/user/research' },
                ]}
            >
                <NotPremium />
            </DashboardLayout>
        );
    }

    function renderContent() {
        if (isLoading) {
            return <Loading />;
        }

        if (!conversationData) {
            return <NotFound />;
        }

        const pdfUrl = formatUrlImage(conversationData?.conversation?.doc?.src);

        return (
            <Flex overflowY="hidden" h="full">
                <Box flex="2">
                    <Suspense fallback={<Loading />}>
                        <PDFViewer url={pdfUrl} />
                    </Suspense>
                </Box>

                <QuestionResearch conversationId={conversationId} />
            </Flex>
        );
    }

    const TITLE_PAGE = t('research.detail.title');

    return (
        <DashboardLayout
            title={TITLE_PAGE}
            showHeading={false}
            layout="full"
            type="customer"
            breadcrumb={[
                { label: t('research.title'), href: '/user/research' },
                { label: TITLE_PAGE },
            ]}
        >
            {renderContent()}
        </DashboardLayout>
    );
}
