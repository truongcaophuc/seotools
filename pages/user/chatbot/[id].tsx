import { Box, Center, Container, VStack } from '@chakra-ui/react';
import { ChatbotDashboardLayout } from '@components/layout/dashboard/chatbot.dashboard.layout';
import {
    ChatConversation,
    ListMessageConversation,
    StopGenerating,
} from '@components/page/user/chatbot';
import { ContextConversationProvider } from '@components/page/user/chatbot/context.conversation';
import { Loading, NotFound } from '@components/ui';
import { useConversation } from '@share/hooks/chatbot.hooks';
import { useRouter } from 'next/router';

export default function ChatbotPage() {
    const router = useRouter();
    const id = router.query.id ? router.query.id.toString() : '';
    const { isLoading, data } = useConversation(id);

    function renderContent() {
        if (isLoading) return <Loading />;

        if (!data.conversation) {
            return (
                <NotFound
                    content="Hộp thoại không tồn tại"
                    backLink="/user/chatbot"
                />
            );
        }

        return <ListMessageConversation conversation={data.conversation} />;
    }

    const conversation = data?.conversation;
    const title = conversation?.title || 'Chatbot';

    return (
        <ChatbotDashboardLayout
            title={title}
            breadcrumb={[
                { label: 'Chatbot', href: '/user/chatbot' },
                {
                    label: title,
                },
            ]}
        >
            <ContextConversationProvider>
                <VStack spacing="0" align="stretch" flex="1">
                    <Box py="8" flex="1" overflowY="auto">
                        <Container>{renderContent()}</Container>
                    </Box>
                    <Center minH="150px">
                        <Container>
                            <VStack align="stretch" spacing="4">
                                <VStack>
                                    <StopGenerating />
                                </VStack>
                                <ChatConversation conversation={conversation} />
                            </VStack>
                        </Container>
                    </Center>
                </VStack>
            </ContextConversationProvider>
        </ChatbotDashboardLayout>
    );
}
