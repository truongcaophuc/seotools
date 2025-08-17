import { Avatar, Box, Button, Center, Text, VStack } from '@chakra-ui/react';
import { HeroIcon, Loading, Progress } from '@components/ui';
import { TypeAiSettingApp } from '@generated/graphql/query';
import { CpuChipIcon } from '@heroicons/react/24/outline';
import { useDocument } from '@share/hooks/document.hooks';
import { useStreamChatbot } from '@share/hooks/request-content.hooks';
import { useAiSettingApps } from '@share/hooks/setting.hooks';

export function SuggestOutlineDocument() {
    const { data, isLoading } = useAiSettingApps();
    const { isLoading: documentIsLoading, data: documentData } = useDocument();

    // const { content, isStreaming, onStream } = useStreamContent();
    const { content, isStreaming, onStream } = useStreamChatbot();

    function handleClick() {
        if (isLoading) return;

        const setting = data?.aiSettingApps.find(
            (item) => item.type === TypeAiSettingApp.Outline
        );

        const document = documentData?.document;
        const mainKeyword = document?.keyword?.value;
        const subKeyword = document?.keyword?.subKeywords
            .map((item) => {
                return item.value;
            })
            .join(', ');

        const title = documentData?.document?.title;

        const prompt = setting?.leadingSentence
            .replace('$$title', title)
            .replace('$$mainKeyword', mainKeyword)
            .replace('$$subKeyword', subKeyword);

        const messages = JSON.stringify([{ role: 'user', content: prompt }]);

        onStream({
            messages,
            max_tokens: setting?.max_tokens,
        });
    }

    function renderContent() {
        if (documentIsLoading) {
            return (
                <Center h="full">
                    <Loading full={false} />
                </Center>
            );
        }

        if (content) {
            return (
                <VStack align="stretch" spacing="5">
                    <Box
                        bgColor="white"
                        p="5"
                        fontFamily="inherit"
                        contentEditable
                        whiteSpace="pre-line"
                        borderWidth="1px"
                        rounded="md"
                        fontSize="sm"
                        fontWeight="semibold"
                    >
                        {content} {isStreaming ? '...' : ''}
                    </Box>

                    <Center>
                        {isStreaming ? (
                            <Progress />
                        ) : (
                            <Button onClick={handleClick} colorScheme="blue">
                                Làm lại
                            </Button>
                        )}
                    </Center>
                </VStack>
            );
        }

        return (
            <Center h="full">
                <VStack spacing="5">
                    <Avatar icon={<HeroIcon as={CpuChipIcon} />} />
                    <Text>Gợi ý nội dung dàn ý bài viết</Text>
                    {isStreaming ? (
                        <Progress />
                    ) : (
                        <Button
                            size="sm"
                            onClick={handleClick}
                            colorScheme="blue"
                        >
                            Xem ngay
                        </Button>
                    )}
                </VStack>
            </Center>
        );
    }

    return (
        <Box
            maxW="400px"
            w="100%"
            p="5"
            overflowY="auto"
            h="full"
            flexShrink="1"
        >
            {renderContent()}
        </Box>
    );
}
