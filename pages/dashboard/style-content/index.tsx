import { Button } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import {
    ListStyleContent,
    UpdateStyleContent,
} from '@components/page/dashboard/style-content';
import { HeroIcon } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';

const TITLE_PAGE = 'Phong cách';

export default function StyleContentsPage() {
    return (
        <DashboardLayout
            extra={
                <UpdateStyleContent>
                    <Button leftIcon={<HeroIcon as={PlusIcon} />}>Thêm</Button>
                </UpdateStyleContent>
            }
            title={TITLE_PAGE}
            type="admin"
        >
            <ListStyleContent />
        </DashboardLayout>
    );
}
