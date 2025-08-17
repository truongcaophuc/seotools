import { DashboardLayout } from '@components/layout/dashboard';
import {
    AiSetting,
    DocumentSetting,
    GeneralSetting,
    PaySetting,
} from '@components/page/dashboard/setting';
import { Card, Tabs } from '@components/ui';

const TITLE_PAGE = 'Cài đặt';

export default function SettingPage() {
    return (
        <DashboardLayout
            type="admin"
            title={TITLE_PAGE}
            breadcrumb={[{ label: TITLE_PAGE }]}
        >
            <Card bodyProps={{ p: 0 }}>
                <Tabs
                    tabs={[
                        {
                            label: 'Cài đặt chung',
                            children: <GeneralSetting />,
                        },
                        {
                            label: 'App Setting',
                            children: <PaySetting />,
                        },
                        {
                            label: 'Document Setting',
                            children: <DocumentSetting />,
                        },
                        {
                            label: 'Ai Setting',
                            children: <AiSetting />,
                        },
                    ]}
                />
            </Card>
        </DashboardLayout>
    );
}
