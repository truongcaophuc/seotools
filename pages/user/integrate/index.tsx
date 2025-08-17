import { OwnerDashboarLayout } from '@components/layout/dashboard/owner.dashboard.layout';
import {
    IntegrateFacebook,
    IntegrateWordpress,
    IntegrateZalo,
} from '@components/page/user/integrate';
import { Card, Tabs } from '@components/ui';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function IntegratePage() {
    const { t } = useTranslate();
    const TITLE_PAGE = t('utilities.title');

    return (
        <OwnerDashboarLayout
            title={TITLE_PAGE}
            breadcrumb={[
                {
                    label: TITLE_PAGE,
                },
            ]}
            type="customer"
        >
            <Card bodyProps={{ p: 0 }}>
                <Tabs
                    tabs={[
                        { label: 'Facebook', children: <IntegrateFacebook /> },
                        {
                            label: 'Wordpress',
                            children: <IntegrateWordpress />,
                        },
                        { label: 'Zalo', children: <IntegrateZalo /> },
                    ]}
                />
            </Card>
        </OwnerDashboarLayout>
    );
}
