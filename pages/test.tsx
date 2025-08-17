import { Box, HStack, IconButton, Input, Textarea } from '@chakra-ui/react';
import { HeroIcon, Select } from '@components/ui';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import useServerSentEvents from '@share/hooks/useServerSentEvents';
import { forwardRef, LegacyRef, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useFolderImages } from '@share/hooks/image.hooks';
import { TypeFile } from '@generated/graphql/query';
import { pick } from 'lodash';

interface FormData {
    prompt: string;
}

const MessageBot = forwardRef(
    (
        { message, hidden }: { message: string; hidden?: boolean },
        ref?: LegacyRef<HTMLParagraphElement>
    ) => {
        return (
            <div
                className={`${
                    hidden ? 'hidden' : 'block'
                } w-full border-b border-black/10 dark:border-gray-900/50 text-gray-800 dark:text-gray-100 group bg-gray-50 dark:bg-[#444654]`}
            >
                <div className="text-base gap-4 md:gap-6 m-auto md:max-w-2xl lg:max-w-2xl xl:max-w-3xl p-4 md:py-6 flex lg:px-0">
                    <div className="relative flex w-[calc(100%-50px)] md:flex-col lg:w-[calc(100%-115px)]">
                        <div className="flex flex-grow flex-col gap-3">
                            <div className="min-h-[20px] flex flex-col items-start gap-4 whitespace-pre-wrap">
                                <Box
                                    whiteSpace="pre-line"
                                    className="markdown prose w-full break-words dark:prose-invert dark"
                                >
                                    <p ref={ref}>{message}</p>
                                </Box>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
);

MessageBot.displayName = 'MessageBot';

export default function Page() {
    const [content, setContent] = useState<string>('');
    const bioNode = useRef<HTMLParagraphElement>(null);
    const [streaming, setStreaming] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<FormData>();

    const { openStream } = useServerSentEvents({
        config: {
            withCredentials: false,
        },
        onData,
        onOpen: () => {
            reset();
            // if (bioNode.current) {
            //     console.log('resetting');
            //     bioNode.current.innerHTML = '';
            // }
        },
        onClose: () => {
            setStreaming(false);
        },
        onError: (event) => {
            console.error(event);
            setStreaming(false);
            setError(`Something went wrong with the request`);
        },
    });

    function onData(data: string) {
        try {
            let text = JSON.parse(data).choices[0].text;
            bioNode.current.innerHTML = bioNode.current.innerHTML + text;
            setContent((prev) => prev + text);
        } catch (err) {
            console.log(`Failed to parse data: ${data}`);
            setError(`Failed to parse the response`);
        }
    }

    const onSubmit: SubmitHandler<FormData> = (data) => {
        setStreaming(true);

        openStream({
            query: {
                prompt: data.prompt,
                max_tokens: 1000,
            },
        });
    };

    function handleClick() {
        const ctrl = new AbortController();

        try {
            fetchEventSource('/api/research-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    question: 'sale of Baby and Toddler Wear 2017 in vietnam?',
                    documentId: '642272e6eaf375123a68801e',
                }),
                signal: ctrl.signal,
                onmessage(event) {
                    if (event.data === '[DONE]') {
                        ctrl.abort();
                    } else {
                    }
                },
            });
        } catch (err) {
            console.log(err);
        }
    }

    const { data, isLoading } = useFolderImages({ type: TypeFile.Document });

    const folders = (data?.folderImages?.data || []).map((item) => ({
        id: item.id,
        name: item.name,
    }));

    return (
        <div className="dark:bg-gray-800">
            <main className="relative min-h-screen w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
                <Box whiteSpace="pre-line">{content}</Box>

                <Box>
                    <button onClick={handleClick}>dasdadsa</button>
                </Box>

                <Box>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <HStack>
                            <Textarea
                                borderWidth="1px"
                                tabIndex={0}
                                rows={1}
                                placeholder=""
                                onKeyUp={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handleSubmit(onSubmit)();
                                    }
                                }}
                                {...register('prompt', { required: true })}
                            />
                            <IconButton
                                aria-label="Send"
                                icon={<HeroIcon as={PaperAirplaneIcon} />}
                                type="submit"
                            />
                        </HStack>
                    </form>

                    <Select onSelect={console.log} data={folders}>
                        <Input isReadOnly />
                    </Select>
                </Box>
            </main>
        </div>
    );
}
