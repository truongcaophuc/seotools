import {
    Box,
    Button,
    HStack,
    Spacer,
    StackDivider,
    VStack,
} from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { ConversationInfoFragment } from '@generated/graphql/query';
import { useListMessageConversation } from '@share/hooks/chatbot.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useConversationStore } from '@share/store/message.store';
import { useEffect, useRef } from 'react';
import { AddConversation } from './add.conversation';
import { AnswerMessageConversation } from './answer.message.conversation';
import { MessageConversation } from './message.convesation';

function HeadingListMessageConversation({ title }: { title?: string }) {
    const { t } = useTranslate();
    const messages = useConversationStore((state) => state.messages);
    return (
        <HStack>
            <Heading as="span">{title || 'Hộp thoại mới'}</Heading>
            <Spacer />
            <Box>
                {!title ? (
                    <AddConversation messages={messages}>
                        <Button colorScheme="blue" size="sm">
                            {t('commons.save')}
                        </Button>
                    </AddConversation>
                ) : null}
            </Box>
        </HStack>
    );
}

interface Props {
    showTitle?: boolean;
    conversation?: ConversationInfoFragment;
}

export function ListMessageConversation({
    conversation,
    showTitle = true,
}: Props) {
    const bottomRef = useRef<HTMLDivElement>(null);
    const messages = useConversationStore((state) => state.messages);

    useListMessageConversation({
        conversationId: conversation?.id,
    });

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    function renderTitle() {
        if (!showTitle || messages.length === 0) return null;

        return <HeadingListMessageConversation title={conversation?.title} />;
    }

    return (
        <>
            <VStack divider={<StackDivider />} align="stretch" spacing="6">
                {renderTitle()}
                {messages.map((item) => (
                    <MessageConversation message={item} key={item.id} />
                ))}
                <AnswerMessageConversation conversation={conversation} />
            </VStack>

            <div ref={bottomRef} />
        </>
    );
}
