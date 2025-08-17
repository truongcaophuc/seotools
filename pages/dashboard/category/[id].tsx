import { VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import {
    FormCategoryService,
    TableService,
} from '@components/page/dashboard/service';
import { Card, Loading, NotFound } from '@components/ui';
import { useServiceCategory } from '@share/hooks/service.hooks';

export default function ServiceCategoryDetailPage() {
    const { isLoading, data, isError } = useServiceCategory();

    if (isLoading) {
        return <Loading full />;
    }

    if (!data || isError) {
        return <NotFound />;
    }

    const serviceCategory = data?.serviceCategory;

    return (
        <DashboardLayout
            breadcrumb={[
                { label: 'Nhóm dịch vụ', href: '/dashboard/category' },
                { label: serviceCategory.title },
            ]}
            title={serviceCategory.title}
        >
            <VStack align="stretch" spacing="6">
                <Card title="Thông tin" bgColor="white">
                    <FormCategoryService category={serviceCategory} />
                </Card>

                <Card bodyProps={{ p: 0 }} bgColor="white">
                    <TableService data={serviceCategory?.services} />
                </Card>
            </VStack>
        </DashboardLayout>
    );
}
