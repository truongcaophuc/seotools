import {
    HStack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
    Text,
} from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import { GlobeAltIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { EditorFormDocument } from './editor.form.document';
import { MetaFormDocument } from './meta.form.document';

const tabs: Array<{ key: number; label: string; icon: any; panel: ReactNode }> =
    [
        {
            key: 0,
            icon: PencilSquareIcon,
            label: 'Editor',
            panel: <EditorFormDocument />,
        },
        {
            key: 1,
            icon: GlobeAltIcon,
            label: 'Meta',
            panel: <MetaFormDocument />,
        },
    ];

export function MainFormDocument() {
    return (
        <Tabs>
            <TabList>
                {tabs.map((item) => (
                    <Tab key={item.key} as={HStack}>
                        <HeroIcon as={item.icon} />
                        <Text as="span" fontWeight="semibold" fontSize="sm">
                            {item.label}
                        </Text>
                    </Tab>
                ))}
            </TabList>

            <TabPanels>
                {tabs.map((item) => {
                    return (
                        <TabPanel p="0" key={item.key}>
                            {item.panel}
                        </TabPanel>
                    );
                })}
            </TabPanels>
        </Tabs>
    );
}
