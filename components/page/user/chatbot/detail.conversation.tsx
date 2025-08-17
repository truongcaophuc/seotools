import { Box, Center, Container, VStack } from '@chakra-ui/react';
import { Loading } from '@components/ui';
import { useConversationDefault } from '@share/hooks/chatbot.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { ChatConversation } from './chat.conversation';
import { ContextConversationProvider } from './context.conversation';
import { ListMessageConversation } from './list.message.conversation';
import { StopGenerating } from './stop-generating-btn';

export function DetailConversation() {
    const user = useAuthStore((state) => state.user);
    const { isLoading, data } = useConversationDefault(user?.defaultProjectId);

    if (isLoading) {
        return <Loading full />;
    }

    return (
        <ContextConversationProvider>
            <VStack h="full" spacing="0" align="stretch" flex="1">
                <Box py="8" flex="1" overflowY="auto">
                    <Container>
                        <ListMessageConversation
                            conversation={data?.conversationDefault}
                        />
                    </Container>
                </Box>
                <Center h="150px">
                    <Container>
                        <VStack align="stretch" spacing="4">
                            <VStack>
                                <StopGenerating />
                            </VStack>
                            <ChatConversation
                                conversation={data?.conversationDefault}
                            />
                        </VStack>
                    </Container>
                </Center>
            </VStack>
        </ContextConversationProvider>
    );
}
