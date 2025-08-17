import { useStreamChatbot } from '@share/hooks/request-content.hooks';
import { createContext, ReactNode, useContext } from 'react';

type TContext = Partial<ReturnType<typeof useStreamChatbot>>;

const Context = createContext<TContext>({});

interface Props {
    children: ReactNode;
}

export function ContextConversationProvider({ children }: Props) {
    const { onStream, content, isStreaming, isFinish, isError, onCloseStream } =
        useStreamChatbot();

    const value = {
        onStream,
        onCloseStream,
        isStreaming,
        content,
        isError,
        isFinish,
    };

    return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useContextConversation() {
    return useContext(Context);
}
