import { Box, Checkbox, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { Card, Heading, HeroIcon } from '@components/ui';
import { ProjectInfoFragment } from '@generated/graphql/query';
import {
    ChatBubbleBottomCenterTextIcon,
    DocumentTextIcon,
    LinkIcon,
} from '@heroicons/react/24/outline';
import { useMe } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ProjectAction } from './project.action';
import { TitleCardProjectList } from './title.card.project-list';

interface Props {
    project: ProjectInfoFragment;
}

type TProjectContent = 'description' | 'url';

function ProjectContent({
    type,
    content,
}: {
    type: TProjectContent;
    content: string;
}) {
    const { t } = useTranslate();

    const contentObjs: {
        [key in TProjectContent]: {
            icon: any;
            label: string;
        };
    } = {
        description: {
            icon: ChatBubbleBottomCenterTextIcon,
            label: t('commons.description'),
        },
        url: {
            icon: LinkIcon,
            label: t('commons.url'),
        },
    };

    const contentObj = contentObjs[type];

    return (
        <Box>
            <Heading color="gray.400" textTransform="uppercase" fontSize="xs">
                {contentObj.label}
            </Heading>
            {content ? (
                <Text
                    noOfLines={2}
                    color="gray.600"
                    fontWeight="semibold"
                    fontSize="sm"
                    pt="2"
                >
                    {content}
                </Text>
            ) : (
                <Text color="gray.500" fontSize="sm" pt="2">
                    {t('commons.no_content')}
                </Text>
            )}
        </Box>
    );
}

export function CardProjectList({ project }: Props) {
    const { data } = useMe();
    const isDefault = data?.me?.defaultProjectId === project.id;
    return (
        <Card
            size="sm"
            key={project.id}
            headerProps={{
                children: (
                    <HStack>
                        <TitleCardProjectList
                            title={project.name}
                            id={project.id}
                        />

                        <Spacer />
                        <Checkbox isChecked={isDefault} />
                    </HStack>
                ),
            }}
            footer={
                <HStack w="full">
                    <HeroIcon color="gray.400" as={DocumentTextIcon} />
                    <Spacer />
                    <ProjectAction project={project} />
                </HStack>
            }
        >
            <VStack align="stretch" spacing="4">
                <ProjectContent
                    type="description"
                    content={project.description}
                />
                <ProjectContent type="url" content={project.url} />
            </VStack>
        </Card>
    );
}
