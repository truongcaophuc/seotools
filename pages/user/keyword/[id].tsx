import { HStack, Spacer, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { EditKeyword, SubKeyword } from '@components/page/user/keyword';
import { AddKeyword } from '@components/page/user/keyword/add.keyword';
import { AddButton, Heading, Loading, NotFound } from '@components/ui';
import { useKeyword } from '@share/hooks/keyword.hooks';
import { useRouter } from 'next/router';

export default function KeywordDetailPage() {
    const router = useRouter();
    const keywordId = router.query.id ? router.query.id.toString() : '';
    const { isLoading, data, isError } = useKeyword(keywordId);

    if (isLoading) {
        return (
            <DashboardLayout
                breadcrumb={[
                    { label: 'Từ khoá', href: 'user/keyword' },
                    { label: '' },
                ]}
                type="customer"
            >
                <Loading />
            </DashboardLayout>
        );
    }

    if (!data || isError) {
        return (
            <DashboardLayout
                title="Không tìm thấy từ khoá"
                breadcrumb={[
                    { label: 'Từ khoá', href: 'user/keyword' },
                    { label: 'Not found' },
                ]}
                type="customer"
            >
                <NotFound content="Không tìm thấy từ khoá" />
            </DashboardLayout>
        );
    }

    const keyword = data?.keyword;

    return (
        <DashboardLayout
            type="customer"
            title={keyword.value}
            breadcrumb={[
                { label: 'Từ khoá', href: '/user/keyword' },
                { label: keyword.value },
            ]}
        >
            <EditKeyword keyword={keyword} />

            <VStack align="stretch" spacing="3">
                <HStack>
                    <Heading>Từ khoá phụ</Heading>
                    <Spacer />
                    <AddKeyword keywordId={keyword.id}>
                        <AddButton
                            colorScheme="blue"
                            aria-label="Add keyword"
                        />
                    </AddKeyword>
                </HStack>
                <SubKeyword keywordId={keyword.id} />
            </VStack>
        </DashboardLayout>
    );
}
