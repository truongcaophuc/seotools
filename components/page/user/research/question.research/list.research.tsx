import { StackDivider, VStack } from '@chakra-ui/react';
import { Loading } from '@components/ui';
import { useListMessageConversation } from '@share/hooks/chatbot.hooks';
import { useEffect, useRef } from 'react';
import { MessageConversation } from '../../chatbot/message.convesation';

export function ListResearch({ conversationId }: { conversationId: string }) {
    const ref = useRef<HTMLDivElement>();
    const { data, isLoading } = useListMessageConversation({ conversationId });
    function renderContent() {
        if (isLoading) return <Loading />;

        const messages = data?.listMessageConversation?.data || [];

        return messages.map((item) => {
            return <MessageConversation key={item.id} message={item} />;
        });
    }

    useEffect(() => {
        if (ref.current) {
            ref.current?.scrollIntoView({ behavior: 'smooth' });
        }
    });
    return (
        <VStack spacing="6" divider={<StackDivider />} align="stretch">
            {renderContent()}
            <div ref={ref} />
        </VStack>
    );
}
