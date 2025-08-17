import { Container, Text, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { ListPricing } from '@components/page/user/pricing';
import { Heading } from '@components/ui';

const TITLE_PAGE = 'Pricing';

export default function PricingPage() {
    return (
        <DashboardLayout
            showHeading={false}
            type="customer"
            breadcrumb={[{ label: TITLE_PAGE }]}
            title={TITLE_PAGE}
        >
            <Container maxWidth="5xl">
                <VStack spacing="10" py="5" align="stretch">
                    <VStack>
                        <Heading fontSize="2xl">Các gói dành cho bạn</Heading>
                        <Text color="gray.500">
                            Vui lòng chọn một trong những gói dưới để tiến hành
                            nâng cấp tài khoản của bạn
                        </Text>
                    </VStack>
                    <ListPricing />
                </VStack>
            </Container>
        </DashboardLayout>
    );
}
