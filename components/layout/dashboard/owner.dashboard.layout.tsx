import { Center } from '@chakra-ui/react';
import { NotFound } from '@components/ui';
import { useAuthStore } from '@share/store/auth.store';
import { DashboardLayout, DashboardLayoutProps } from './dashboard.layout';

interface Props extends DashboardLayoutProps {}

export function OwnerDashboarLayout(props: Props) {
    const user = useAuthStore((state) => state.user);

    if (!user?.workspace?.isOwner) {
        return (
            <DashboardLayout type="customer">
                <Center minH="100vh - 300px" py="8">
                    <NotFound
                        description="Vui lòng bấm vào nút bên dưới để quay lại trang chủ"
                        backLink="/user"
                    />
                </Center>
            </DashboardLayout>
        );
    }

    return <DashboardLayout {...props} />;
}
