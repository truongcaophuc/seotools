import {
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs as TabsUI,
    TabsProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface ITabItem {
    label: string;
    children: ReactNode;
}

interface Props extends Omit<TabsProps, 'children'> {
    tabs: Array<ITabItem>;
}

export function Tabs({ tabs, ...props }: Props) {
    const tabList = (
        <TabList>
            {tabs.map((item, idx) => (
                <Tab key={idx}>{item.label}</Tab>
            ))}
        </TabList>
    );
    const panels = (
        <TabPanels>
            {tabs.map((item, idx) => (
                <TabPanel key={idx}>{item.children}</TabPanel>
            ))}
        </TabPanels>
    );

    return (
        <TabsUI {...props}>
            {tabList}
            {panels}
        </TabsUI>
    );
}
