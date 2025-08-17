import { Button } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import {
    ListLanguage,
    UpdateLanguage,
} from '@components/page/dashboard/language';
import { HeroIcon } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';

const TITLE_PAGE = 'Ngôn ngữ';

export default function LanguagePage() {
    return (
        <DashboardLayout
            extra={
                <UpdateLanguage>
                    <Button
                        colorScheme="blue"
                        leftIcon={<HeroIcon as={PlusIcon} />}
                    >
                        Thêm
                    </Button>
                </UpdateLanguage>
            }
            title={TITLE_PAGE}
            breadcrumb={[{ label: TITLE_PAGE }]}
            type="admin"
        >
            <ListLanguage />
        </DashboardLayout>
    );
}
