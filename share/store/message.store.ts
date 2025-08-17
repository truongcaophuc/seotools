import {
    ConversationInfoFragment,
    ConversationItemInfoFragment,
} from '@generated/graphql/query';
import { create } from 'zustand';

interface IConversationStore {
    isLoading: boolean;
    setIsLoading: (isLoading: boolean) => void;
    conversation?: ConversationInfoFragment | null;
    setConversation: (conversation: ConversationInfoFragment) => void;
    conversationDefault?: ConversationInfoFragment | null;
    setConversationDefault: (conversation: ConversationInfoFragment) => void;
    question: string | null;
    setQuestion: (question: string | null) => void;
    messages: Array<ConversationItemInfoFragment>;
    setMessages: (messages: Array<ConversationItemInfoFragment>) => void;
    addMessage: (message: ConversationItemInfoFragment) => void;
    loadMoreMessages: (messages: Array<ConversationItemInfoFragment>) => void;
    page: number;
    setPage: (page: number) => void;
    onCloseStream?: () => void;
    setOnCloseStream?: (func: () => void) => void;
}

export const useConversationStore = create<IConversationStore>()((set) => ({
    isLoading: false,
    setIsLoading: (isLoading) => set(() => ({ isLoading })),
    conversation: null,
    setConversation: (conversation) => set(() => ({ conversation })),
    conversationDefault: null,
    setConversationDefault: (conversationDefault) =>
        set(() => ({ conversationDefault })),
    question: null,
    setQuestion: (question) => set(() => ({ question })),
    messages: [],
    setMessages: (messages) =>
        set(() => ({
            messages,
        })),
    addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
    loadMoreMessages: (messages) =>
        set((state) => ({
            messages: [...state.messages, ...messages],
        })),
    page: 0,
    setPage: (page: number) => set(() => ({ page })),
    // for close stream
    onCloseStream: undefined,
    setOnCloseStream: (func) => set({ onCloseStream: func }),
}));
