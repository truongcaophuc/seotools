import {
    ConversationsInputType,
    ListMessageConversationInputType,
    useAddConversationMutation,
    useAddMessageInConversationMutation,
    useConversationDefaultQuery,
    useConversationQuery,
    useConversationsQuery,
    useDeleteConversationMutation,
    useDeleteMessageInConversationMutation,
    useEmbeddedDocumentMutation,
    useGetTotalTokenDocMutation,
    useListMessageConversationQuery,
    useReSearchDocumentMutation,
    useUpdateConversationMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useConversationStore } from '@share/store/message.store';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslate } from './translate.hooks';
import { useToast } from './useToast';

export function useConversations(input: ConversationsInputType) {
    return useConversationsQuery(client, { input });
}

export function useConversation(conversationId: string) {
    const setMessages = useConversationStore((state) => state.setMessages);
    const conversation = useConversationStore((state) => state.conversation);
    const setConversation = useConversationStore(
        (state) => state.setConversation
    );

    return useConversationQuery(
        client,
        { conversationId },
        {
            onSuccess(data) {
                setConversation(data?.conversation);
                if (conversation?.id !== conversationId) {
                    setMessages([]);
                }
            },
            enabled: !!conversationId,
        }
    );
}

export function useAddConversation() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useAddConversationMutation(client, {
        onError() {
            toastError(t('chatbot.messages.conversation.add.fail'));
        },
        onSuccess() {
            toastSuccess(t('chatbot.messages.conversation.add.success'));
            queryClient.invalidateQueries(['Conversations']);
        },
    });
}

export function useUpdateConversation() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useUpdateConversationMutation(client, {
        onError() {
            toastError(t('chatbot.messages.conversation.update.fail'));
        },
        onSuccess() {
            toastSuccess(t('chatbot.messages.conversation.update.success'));
            queryClient.invalidateQueries(['Conversations']);
        },
    });
}

export function useListMessageConversation(
    input: ListMessageConversationInputType
) {
    const setMessages = useConversationStore((state) => state.setMessages);
    const messages = useConversationStore((state) => state.messages);
    const page = useConversationStore((state) => state.page);
    const loadMoreMessages = useConversationStore(
        (state) => state.loadMoreMessages
    );
    return useListMessageConversationQuery(
        client,
        { input },
        {
            refetchOnWindowFocus: false,
            onSuccess(data) {
                // const pageResponse =
                //     data?.listMessageConversation?.pagination?.page;

                const items = data?.listMessageConversation.data;

                // if (messages.length > 0) {
                //     if (page !== pageResponse - 1) {
                //         loadMoreMessages(items);
                //     }
                //     return;
                // }

                setMessages(items);
            },
        }
    );
}

export function useDeleteConversation() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useDeleteConversationMutation(client, {
        onError() {
            toastError(t('chatbot.messages.conversation.delete.fail'));
        },
        onSuccess() {
            toastSuccess(t('chatbot.messages.conversation.delete.success'));
            queryClient.invalidateQueries(['Conversations']);
        },
    });
}

export function useAddMessageInConversation() {
    return useAddMessageInConversationMutation(client);
}

export function useDeleteMessageInConversation() {
    const queryClient = useQueryClient();
    return useDeleteMessageInConversationMutation(client, {
        onSuccess() {
            queryClient.invalidateQueries(['ListMessageConversation']);
        },
    });
}

export function useConversationDefault(projectId: string) {
    const setConversationDefault = useConversationStore(
        (state) => state.setConversationDefault
    );

    return useConversationDefaultQuery(
        client,
        { projectId },
        {
            enabled: !!projectId,
            onSuccess(data) {
                setConversationDefault(data?.conversationDefault);
                // if (conversation?.id !== conversationId) {
                //     setMessages([]);
                // }
            },
        }
    );
}

export function useGetTotalTokenDoc() {
    return useGetTotalTokenDocMutation(client);
}

export function useEmbeddedDocument() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useEmbeddedDocumentMutation(client, {
        onError() {
            toastError(t('chatbot.messages.embed.sync.fail'));
        },
        onSuccess() {
            toastSuccess(t('chatbot.messages.embed.sync.success'));

            Promise.all([
                queryClient.invalidateQueries(['Images']),
                queryClient.invalidateQueries(['Conversations']),
            ]);
        },
    });
}

export function useReSearchDocument() {
    return useReSearchDocumentMutation(client);
}
