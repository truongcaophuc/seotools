import { Avatar, Box, HStack, Spinner, Text } from '@chakra-ui/react';
import { HeroIcon, Markdown } from '@components/ui';
import {
    ConversationInfoFragment,
    ConversationItemInfoFragment,
} from '@generated/graphql/query';
import {
    CpuChipIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useAddMessageInConversation } from '@share/hooks/chatbot.hooks';
import { useStreamContent } from '@share/hooks/request-content.hooks';
import { useConversationStore } from '@share/store/message.store';
import { useEffect, useRef } from 'react';
import { useContextConversation } from './context.conversation';

export function AnswerMesssageConversation1() {
    const question = useConversationStore((state) => state.question);
    const addMessage = useConversationStore((state) => state.addMessage);
    const setQuestion = useConversationStore((state) => state.setQuestion);
    const setIsLoading = useConversationStore((state) => state.setIsLoading);
    const messages = useConversationStore((state) => state.messages);
    const conversation = useConversationStore((state) => state.conversation);
    const { onStream, content, isStreaming, isFinish } = useStreamContent();

    const { mutate } = useAddMessageInConversation();

    useEffect(() => {
        if (question && question.length > 0) {
            onStream({
                prompt: question,
                max_tokens: 2000,
            });
        }
    }, [question]);

    useEffect(() => {
        if (isFinish) {
            addMessage({
                message: content,
                id: messages.length.toString(),
            });
            setQuestion(null);
            setIsLoading(false);
            if (conversation) {
                mutate({
                    input: {
                        message: content,
                        conversationId: conversation.id,
                    },
                });
            }
        }
    }, [isFinish]);

    if (!question) return <></>;

    return (
        <HStack align="start" spacing="5">
            <Avatar
                bgColor="green.500"
                icon={<HeroIcon as={CpuChipIcon} />}
                rounded="md"
                size="sm"
            />
            <Box flex="1">
                <Text
                    fontSize="sm"
                    fontWeight="medium"
                    color="gray.500"
                    lineHeight="1.7"
                    whiteSpace="pre-line"
                >
                    {content} {isStreaming ? '...' : ''}
                </Text>
            </Box>
            <Spinner size="xs" color="gray.300" />
        </HStack>
    );
}

export function AnswerMessageConversation({
    conversation,
}: {
    conversation?: ConversationInfoFragment;
}) {
    const question = useConversationStore((state) => state.question);
    const addMessage = useConversationStore((state) => state.addMessage);
    const setQuestion = useConversationStore((state) => state.setQuestion);
    const setIsLoading = useConversationStore((state) => state.setIsLoading);
    const setOnCloseStream = useConversationStore(
        (state) => state.setOnCloseStream
    );
    const messages = useConversationStore((state) => state.messages);
    const bottomRef = useRef<HTMLDivElement>(null);
    // const conversation = useConversationStore((state) => state.conversation);
    const { onStream, content, isStreaming, isFinish, isError, onCloseStream } =
        useContextConversation();

    const { mutate } = useAddMessageInConversation();

    useEffect(() => {
        if (question && question.length > 0) {
            const messagesLength = messages.length;

            let messagesPrompt: Array<ConversationItemInfoFragment> = [];

            if (messagesLength <= 3) {
                messagesPrompt = messages;
            } else {
                messagesPrompt = messages.filter(
                    (_item, idx) => idx > messagesLength - 3
                );
            }

            const messagesFormat = messagesPrompt.map((item) => ({
                role: item.createdById ? 'user' : 'assistant',
                content: item.message,
            }));

            setOnCloseStream(onCloseStream);

            onStream({
                messages: JSON.stringify(messagesFormat),
            });
        }
    }, [question]);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [content]);

    useEffect(() => {
        if (isFinish) {
            addMessage({
                message: content,
                id: messages.length.toString(),
            });
            setQuestion(null);
            setIsLoading(false);
            if (conversation) {
                mutate({
                    input: {
                        message: content,
                        conversationId: conversation.id,
                    },
                });
            }
        }
    }, [isFinish]);

    if (!question) return <></>;

    return (
        <>
            <HStack align="start" spacing="5">
                <Avatar
                    bgColor="green.500"
                    icon={<HeroIcon as={CpuChipIcon} />}
                    rounded="md"
                    size="sm"
                />
                <Box flex="1">
                    <Text
                        as="span"
                        fontSize="sm"
                        fontWeight="semibold"
                        color="gray.400"
                    >
                        Ai Assistant
                    </Text>
                    <Markdown
                        content={`${content}  ${isStreaming ? '...' : ''}`}
                    />
                </Box>
                {isError ? (
                    <HeroIcon color="red.600" as={ExclamationTriangleIcon} />
                ) : null}
            </HStack>

            <div ref={bottomRef} />
        </>
    );
}
