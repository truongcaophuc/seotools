export interface RequestQueryConversation {
    messages: Array<{ role: string; content: string }>;
}

const BASE_URL = '/api/chatbot';

export default function useServerChatbot<QueryParams extends Record<any, any>>({
    config,
    onData,
    onOpen,
    onClose,
    onError,
}: {
    config?: EventSourceInit | undefined;
    onData: (data: string) => void;
    onOpen: (event: Event) => void;
    onClose: () => void;
    onError: (event: Event) => void;
}) {
    function openStream({ query }: { query: QueryParams }) {
        const params = new URLSearchParams();

        Object.keys(query).forEach((key) => {
            params.set(key, query[key as keyof QueryParams]);
        });

        const evtSource = new EventSource(`${BASE_URL}?${params}`, config);

        evtSource.onmessage = (event) => {
            if (event.data === '[DONE]') {
                evtSource.close();
                onClose();
            } else {
                onData(event.data);
            }
        };
        evtSource.onerror = onError;
        evtSource.onopen = onOpen;
        return evtSource;
    }

    function closeStream(evtSource: EventSource) {
        evtSource.close();
    }

    return { openStream, closeStream };
}
