import {
    ModelAi,
    SettingInfoFragment,
    TypeAiSettingApp,
} from '@generated/graphql/query';
import { useMemo, useState } from 'react';
import { useAiSettingApps, useSetting } from './setting.hooks';
import useServerChatbot from './useServerChatbot';
import useServerSentEvents from './useServerSentEvents';
import { usePayRequestAiContent } from './workspace.hooks';

const INITIAL_DEFAULT = '';

export function useStreamContent() {
    const [isError, setIsError] = useState<boolean>(false);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [content, setContent] = useState<string>(INITIAL_DEFAULT);
    const [eventSource, setEventSource] = useState<EventSource>();

    const { mutate } = usePayRequestAiContent();

    const isEmpty = useMemo(() => content === INITIAL_DEFAULT, [content]);

    let numberToken = 0;
    let texts = '';

    const { openStream, closeStream } = useServerSentEvents({
        config: {
            withCredentials: false,
        },
        onData,
        onOpen: () => {
            setIsFinish(false);
            setIsStreaming(true);
            resetContent();
        },
        onClose: () => {
            setIsStreaming(false);
            setIsFinish(true);

            closeStream(eventSource);

            mutate({
                token: numberToken,
                content: texts,
            });
        },
        onError: (event) => {
            console.error(event);
            setIsStreaming(false);
            setIsError(true);
        },
    });

    function onData(data: string) {
        try {
            setIsFinish(false);
            const dataJson = JSON.parse(data);
            const choice = dataJson.choices[0];
            const finish_reason = choice?.finish_reason;
            let text = choice.text;
            texts = texts + text;

            if (text !== '') {
                numberToken = numberToken + 1;
            } else {
            }

            // if (text === '') {
            //     console.log('đá');
            //     setIsStreaming(false);
            //     setisFinish(true);
            // }

            setContent((prev) => {
                if (prev.length === 0 && text === `\n`) return prev;
                return prev + text;
            });
        } catch (err) {
            console.log(`Failed to parse data: ${data}`);
            setIsError(true);
        }
    }

    function resetContent() {
        setContent(INITIAL_DEFAULT);
    }

    function onStream({
        prompt,
        max_tokens,
    }: {
        prompt: string;
        max_tokens: number;
    }) {
        console.log({ prompt, max_tokens });
        setIsStreaming(true);
        resetContent();
        const evtSource = openStream({
            query: {
                prompt,
                max_tokens,
            },
        });

        setEventSource(evtSource);
    }

    function onCloseStream() {
        if (eventSource) {
            setIsStreaming(false);
            setIsFinish(true);
            mutate({
                token: numberToken,
                content: texts,
            });
            closeStream(eventSource);
        }
    }

    return {
        isEmpty,
        content,
        isError,
        isStreaming,
        resetContent,
        onStream,
        onCloseStream,
        isFinish,
    };
}

export function useStreamChatbot() {
    const [isError, setIsError] = useState<boolean>(false);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [content, setContent] = useState<string>(INITIAL_DEFAULT);
    const [eventSource, setEventSource] = useState<EventSource>();

    const { mutate } = usePayRequestAiContent();

    const isEmpty = useMemo(() => content === INITIAL_DEFAULT, [content]);

    let numberToken = 0;
    let texts = '';

    const { openStream, closeStream } = useServerChatbot({
        config: {
            withCredentials: false,
        },
        onData,
        onOpen: () => {
            setIsFinish(false);
            setIsStreaming(true);
            resetContent();
        },
        onClose: () => {
            console.log('OnClose');
            setIsStreaming(false);
            setIsFinish(true);

            if (eventSource) {
                closeStream(eventSource);
            }

            mutate({
                token: numberToken,
                content: texts,
            });
        },
        onError: (event) => {
            console.error(event);
            setIsStreaming(false);
            setIsError(true);
        },
    });

    function onData(data: string) {
        try {
            setIsFinish(false);
            const dataJson = JSON.parse(data);
            const choice = dataJson.choices[0];
            let text: string = choice?.delta?.content || '';

            const finish_reason = choice?.finish_reason;

            if (finish_reason !== 'stop') {
                numberToken = numberToken + 1;
            }

            texts = texts + text;

            setContent((prev) => {
                if (prev.length === 0 && (text === '' || text.includes(`\n`)))
                    return prev;
                return prev + text;
            });
        } catch (err) {
            console.log(`Failed to parse data: ${data}`);
            setIsError(true);
        }
    }

    function resetContent() {
        setContent(INITIAL_DEFAULT);
    }

    function onStream({
        messages,
        max_tokens,
    }: {
        messages: string; // parse Array<string> => string
        max_tokens?: number;
    }) {
        setIsStreaming(true);
        resetContent();
        const evtSource = openStream({
            query: {
                messages,
                max_tokens,
            },
        });

        setEventSource(evtSource);
    }

    function onCloseStream() {
        if (eventSource) {
            setIsStreaming(false);
            setIsFinish(true);
            mutate({
                token: numberToken,
                content: texts,
            });

            closeStream(eventSource);
        }
    }

    return {
        isEmpty,
        content,
        isError,
        isStreaming,
        resetContent,
        onStream,
        onCloseStream,
        isFinish,
    };
}

type TSettingDocument =
    | 'fieldTitle'
    | 'fieldDescription'
    | 'fieldMainKeyword'
    | 'fieldSubKeyword'
    | 'fieldParagraph';

type A = Pick<SettingInfoFragment, TSettingDocument>;

export function usePromptData({
    title,
    mainKeyword,
    subKeyword,
    paragraph,
    type,
}: {
    title?: string;
    mainKeyword?: string;
    subKeyword?: string;
    paragraph?: string;
    type: TypeAiSettingApp;
}): string | undefined {
    const { data: dataAiSetting } = useAiSettingApps();
    const { data, isLoading } = useSetting();

    // const data1: A = pick(data?.setting, [
    //     'fieldTitle',
    //     'fieldDescription',
    //     'fieldMainKeyword',
    //     'fieldSubKeyword',
    //     'fieldParagraph',
    // ]);

    // let objSetting: { [key in string]: string } = {};

    // if (data1['fieldTitle'] && title && title.length > 0) {
    //     [objSetting['fieldTitle']] = title;
    // }

    // if (data1['fieldMainKeyword'] && mainKeyword && mainKeyword.length > 0) {
    //     [objSetting['fieldMainKeyword']] = mainKeyword;
    // }

    // if (data1['fieldParagraph'] && paragraph && paragraph.length > 0) {
    //     [objSetting['fieldParagraph']] = paragraph;
    // }

    const settings = dataAiSetting?.aiSettingApps || [];

    const setting = settings.find((item) => item.type == type);

    if (!setting) return;

    if (type === TypeAiSettingApp.Title) {
        return setting.leadingSentence?.replace('$$mainKeyword', mainKeyword);
    }

    if (type === TypeAiSettingApp.Description) {
        return setting.leadingSentence?.replace('$$title', title);
    }

    if (type === TypeAiSettingApp.Outline) {
        return setting.leadingSentence
            ?.replace('$$title', title)
            .replace('$$mainKeyword', mainKeyword)
            .replace('$$subKeyword', subKeyword);
    }

    if (
        [
            TypeAiSettingApp.Insert,
            TypeAiSettingApp.Write,
            TypeAiSettingApp.Rewrite,
        ].includes(type)
    ) {
        return setting.leadingSentence?.replace('$$paragraph', paragraph);
    }

    return;
}

type TUseStreamGemini = {
    isGpt: boolean;
    content: string;
    isStreaming: boolean;
    onCloseStream: () => void;
    onStreamChat: ({
        messages,
        max_tokens,
    }: {
        messages: string;
        max_tokens?: number;
    }) => void;
    onStreamComplete: ({
        prompt,
        max_tokens,
    }: {
        prompt: string;
        max_tokens?: number;
    }) => void;
};

export function useStreamGemini(model?: ModelAi): TUseStreamGemini {
    const {
        content: contentChat,
        isStreaming: isStreamingChat,
        onStream: onStreamChat,
        onCloseStream: onCloseStreamChat,
    } = useStreamChatbot();

    const {
        content: contentComplete,
        isStreaming: isStreamingComplete,
        onStream: onStreamComplete,
        onCloseStream: onCloseStreamComplete,
    } = useStreamContent();

    const isGemini = [ModelAi.Gpt, ModelAi.Gpt4].includes(model); // Keep same logic but rename for Gemini

    const content = isGemini ? contentChat : contentComplete;
    const isStreaming = isGemini ? isStreamingChat : isStreamingComplete;
    const onCloseStream = isGemini ? onCloseStreamChat : onCloseStreamComplete;

    return {
        isGpt: isGemini, // Keep isGpt property name for backward compatibility
        content,
        isStreaming,
        onCloseStream,
        onStreamChat,
        onStreamComplete,
    };
}
