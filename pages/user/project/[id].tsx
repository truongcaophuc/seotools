import { Center, Heading, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { ListDocument } from '@components/page/user/document';
import { Loading, NotFound } from '@components/ui';
import { useProject } from '@share/hooks/project.hooks';

export default function ProjectDetailPage() {
    const { isLoading, data } = useProject();

    if (isLoading) {
        return (
            <DashboardLayout
                breadcrumb={[
                    {
                        label: 'Dự án',
                        href: '/user/project',
                    },
                ]}
                type="customer"
            >
                <Center>
                    <Loading />
                </Center>
            </DashboardLayout>
        );
    }

    if (!data) {
        return (
            <DashboardLayout
                title="Not found"
                breadcrumb={[
                    { label: 'Dự án', href: '/user/project' },
                    { label: 'Not found' },
                ]}
                type="customer"
            >
                <Center>
                    <NotFound
                        content="Dự án không tồn tại"
                        backLink="/user/project"
                    />
                </Center>
            </DashboardLayout>
        );
    }

    const project = data.project;

    return (
        <DashboardLayout
            title={project?.name}
            showHeading={false}
            type="customer"
            breadcrumb={[
                { label: 'Dự án', href: '/user/project' },
                { label: project?.name },
            ]}
        >
            <VStack align="stretch" spacing="4">
                <Heading size="md">Danh sách bài viết</Heading>
                <ListDocument projectId={project.id} />
            </VStack>
        </DashboardLayout>
    );
}
