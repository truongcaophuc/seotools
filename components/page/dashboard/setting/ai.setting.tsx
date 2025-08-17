import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    HeadingProps,
} from '@chakra-ui/react';
import { Heading, Loading } from '@components/ui';
import { TypeAiSettingApp } from '@generated/graphql/query';
import { useAiSettingApps } from '@share/hooks/setting.hooks';
import { FormAiSettingApp } from './form.setting';

const settingHeading: HeadingProps = {
    fontSize: 'md',
    as: 'span',
    flex: '1',
    textAlign: 'left',
};

export function AiSetting() {
    const { isLoading, data, isError } = useAiSettingApps();

    if (isLoading) {
        return <Loading full />;
    }

    if (isError) {
        return null;
    }

    const titleSetting = data?.aiSettingApps?.find(
        (item) => item.type === TypeAiSettingApp.Title
    );

    const descriptionSetting = data?.aiSettingApps?.find(
        (item) => item.type === TypeAiSettingApp.Description
    );

    const rewriteSetting = data?.aiSettingApps?.find(
        (item) => item.type === TypeAiSettingApp.Rewrite
    );
    const insertSetting = data?.aiSettingApps?.find(
        (item) => item.type === TypeAiSettingApp.Insert
    );
    const writeSetting = data?.aiSettingApps?.find(
        (item) => item.type === TypeAiSettingApp.Write
    );
    const outlineSetting = data?.aiSettingApps?.find(
        (item) => item.type === TypeAiSettingApp.Outline
    );

    return (
        <Accordion allowToggle>
            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Heading {...settingHeading}>Tiêu đề</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <FormAiSettingApp
                        type={TypeAiSettingApp.Title}
                        setting={titleSetting}
                    />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Heading {...settingHeading}>Description</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <FormAiSettingApp
                        type={TypeAiSettingApp.Description}
                        setting={descriptionSetting}
                    />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Heading {...settingHeading}>Rewrite</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <FormAiSettingApp
                        type={TypeAiSettingApp.Rewrite}
                        setting={rewriteSetting}
                    />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Heading {...settingHeading}>Write</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <FormAiSettingApp
                        type={TypeAiSettingApp.Write}
                        setting={writeSetting}
                    />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Heading {...settingHeading}>Insert</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <FormAiSettingApp
                        type={TypeAiSettingApp.Insert}
                        setting={insertSetting}
                    />
                </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
                <h2>
                    <AccordionButton>
                        <Heading {...settingHeading}>Outline</Heading>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <FormAiSettingApp
                        type={TypeAiSettingApp.Outline}
                        setting={outlineSetting}
                    />
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    );
}
