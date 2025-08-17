import {
    Box,
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import { ChartBarIcon, HashtagIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ReactNode } from 'react';
import { KeywordsFormDocument } from './keyword.form.document';
import { SeoDocument } from './seo.document';

export function SidebarFormDocument() {
    const { t } = useTranslate();

    const tabs: Array<{
        key: number;
        icon: any;
        label: string;
        panel: ReactNode;
    }> = [
        {
            key: 0,
            label: t('posts.detail.keyword'),
            icon: HashtagIcon,
            panel: (
                <Box py="8" px="6">
                    <KeywordsFormDocument />
                </Box>
            ),
        },
        {
            key: 1,
            label: 'SEO/NLP',
            icon: ChartBarIcon,
            panel: <SeoDocument />,
        },

        // {
        //     key: 1,
        //     label: 'Lịch sử',
        //     icon: ArrowPathIcon,
        //     panel: <></>,
        // },
    ];
    return (
        <Tabs>
            <TabList>
                {tabs.map((item) => (
                    <Tab key={item.key} as={HStack}>
                        <HeroIcon as={item.icon} />
                        <Text fontSize="sm" fontWeight="semibold" as="span">
                            {item.label}
                        </Text>
                    </Tab>
                ))}
            </TabList>

            <TabPanels>
                {tabs.map((item) => (
                    <TabPanel key={item.key} p="0">
                        {item.panel}
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    );
}
