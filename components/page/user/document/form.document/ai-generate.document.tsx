import {
    Button,
    Center,
    HStack,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {
    ContentStream,
    Copy,
    Loading,
    Modal,
    NotValidBalance,
    Progress,
} from '@components/ui';
import {
    AiSettingAppInfoFragment,
    TypeAiSettingApp,
} from '@generated/graphql/query';
import { useValidWorkspace } from '@share/hooks/account.hooks';
import { useStreamChatbot } from '@share/hooks/request-content.hooks';
import { useAiSettingApps } from '@share/hooks/setting.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    keyword: string;
    subKeyword?: string;
    title?: string;
    type: TypeAiSettingApp;
}

function useData({
    title,
    keyword = '',
    subKeyword = '',
    type,
    setting,
}: {
    title?: string;
    keyword?: string;
    subKeyword?: string;
    type: TypeAiSettingApp;
    setting: AiSettingAppInfoFragment;
}) {
    if (!keyword) {
        return {
            prompt: '',
            max_tokens: 0,
        };
    }

    let prompt: string;

    if (type === TypeAiSettingApp.Title) {
        prompt = setting?.leadingSentence.replace('$$mainKeyword', keyword);
    } else if (type === TypeAiSettingApp.Description) {
        prompt = setting?.leadingSentence
            .replace('$$title', title)
            .replace('$$mainKeyword', keyword)
            .replace('$$subKeyword', subKeyword);
    }
    const max_tokens = setting?.max_tokens;

    return {
        prompt,
        max_tokens,
    };
}

function useSetting(type: TypeAiSettingApp) {
    const { data } = useAiSettingApps();

    const aiSettingApps: AiSettingAppInfoFragment[] = data?.aiSettingApps || [];

    const setting = aiSettingApps.find((item) => item.type === type);
    return setting;
}

export function AIGenerateDocument({
    children,
    keyword,
    type,
    title,
    subKeyword,
}: Props) {
    // const { data } = useAiSettingApps();

    // const aiSettingApps: AiSettingAppInfoFragment[] = data?.aiSettingApps || [];

    // const setting = aiSettingApps.find((item) => item.type === type);

    const setting = useSetting(type);

    const { content, isStreaming, onStream } = useStreamChatbot();
    const { onToggle, isOpen, onOpen } = useDisclosure();

    const { isLoading, isValidBalance } = useValidWorkspace();

    const heading = type === TypeAiSettingApp.Title ? 'Tiêu đề' : 'Description';

    const { prompt, max_tokens } = useData({
        keyword,
        type,
        title,
        subKeyword,
        setting,
    });

    const messages = JSON.stringify([
        {
            role: 'user',
            content: prompt,
        },
    ]);

    function handleOpen() {
        onOpen();

        if (isLoading || !isValidBalance) return;

        onStream({
            messages,
            max_tokens,
        });
    }

    function handleReRequest() {
        onStream({
            messages,
            max_tokens,
        });
    }

    function renderContent() {
        if (isLoading) {
            return <Loading />;
        }

        if (!isValidBalance) {
            return <NotValidBalance />;
        }

        return (
            <VStack spacing="4" align="stretch">
                <ContentStream>
                    {content} {isStreaming ? '...' : ''}
                </ContentStream>

                <Center>
                    {isStreaming ? (
                        <Progress />
                    ) : (
                        <HStack>
                            <Button onClick={handleReRequest}>Tạo lại</Button>
                            {type === TypeAiSettingApp.Description ? (
                                <Copy content={content}>
                                    <Button colorScheme="blue">Sao chép</Button>
                                </Copy>
                            ) : null}
                        </HStack>
                    )}
                </Center>
            </VStack>
        );
    }

    return (
        <>
            {cloneElement(children, { onClick: handleOpen })}

            <Modal
                isOpen={isOpen}
                title={heading}
                size="2xl"
                onClose={onToggle}
            >
                {renderContent()}
            </Modal>
        </>
    );
}

export function ReWriteAIGenerateDocument({
    children,
    keyword,
    subKeyword,
    content,
    type,
}: {
    children: ReactElement;
    keyword: string;
    subKeyword?: string;
    content: string;
    type: TypeAiSettingApp;
}) {
    const { onToggle, isOpen, onOpen } = useDisclosure();
    const { isLoading, isValidBalance } = useValidWorkspace();
    const {
        content: contentStream,
        isStreaming,
        onStream,
    } = useStreamChatbot();

    const setting = useSetting(type);

    const { max_tokens } = useData({ type, keyword, subKeyword, setting });

    function handleReRequest() {
        onStream({
            messages: JSON.stringify([
                {
                    role: 'user',
                    content: `Viết lại nội dung đoạn văn sau: ${content}`,
                },
            ]),
            max_tokens,
        });
    }

    function handleOpen() {
        onOpen();

        if (isLoading || !isValidBalance) return;

        onStream({
            messages: JSON.stringify([
                {
                    role: 'user',
                    content: `Viết lại nội dung đoạn văn sau: ${content}`,
                },
            ]),
            max_tokens,
        });
    }

    const heading = type === TypeAiSettingApp.Title ? 'Tiêu đề' : 'Description';

    function renderContent() {
        if (isLoading) {
            return <Loading />;
        }

        if (!isValidBalance) {
            return <NotValidBalance />;
        }

        return (
            <VStack spacing="4" align="stretch">
                <ContentStream>
                    {contentStream} {isStreaming ? '...' : ''}
                </ContentStream>

                <Center>
                    {isStreaming ? (
                        <Progress />
                    ) : (
                        <HStack>
                            <Button onClick={handleReRequest}>Tạo lại</Button>
                            {type === TypeAiSettingApp.Description ? (
                                <Copy content={content}>
                                    <Button colorScheme="blue">Sao chép</Button>
                                </Copy>
                            ) : null}
                        </HStack>
                    )}
                </Center>
            </VStack>
        );
    }
    return (
        <>
            {children ? cloneElement(children, { onClick: handleOpen }) : null}

            <Modal
                isOpen={isOpen}
                title={heading}
                size="2xl"
                onClose={onToggle}
            >
                {renderContent()}
            </Modal>
        </>
    );
}
