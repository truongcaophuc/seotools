import { Card, CardBody } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { FormCustomer } from '@components/page/customer';

export default function NewCustomerPage() {
    return (
        <DashboardLayout
            breadcrumb={[
                { label: 'Khách hàng', href: '/dashboard/customer' },
                { label: 'Khách hàng mới', href: '/dashboard/customer/new' },
            ]}
            title="Khách hàng mới"
        >
            <Card bgColor="white">
                <CardBody>
                    <FormCustomer />
                </CardBody>
            </Card>
        </DashboardLayout>
    );
}
