import {
    Avatar,
    Box,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    MenuItem,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FormField, HeroIcon, MenuAction } from '@components/ui';
import { CpuChipIcon, PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { useValidWorkspace } from '@share/hooks/account.hooks';
import {
    useAddMessageInConversation,
    useConversation,
} from '@share/hooks/chatbot.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { usePayContentAI } from '@share/hooks/workspace.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ListResearch } from './list.research';

export default function QuestionResearch({
    conversationId,
}: {
    conversationId: string;
}) {
    const { t } = useTranslate();
    const user = useAuthStore((state) => state.user);
    const queryClient = useQueryClient();
    const [isFinish, setIsFinish] = useState<boolean>(true);
    const [answer, setAnswer] = useState<string>('');

    const { isLoading, data: conversationData } =
        useConversation(conversationId);

    const { isLoading: addMessageLoading, mutate } =
        useAddMessageInConversation();

    const mutationPay = usePayContentAI();
    const { isValidBalance, isLoading: isLoadingBalance } = useValidWorkspace();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ question: string }>();

    const onSubmit = handleSubmit((value) => {
        if (addMessageLoading) return;

        setAnswer('');
        setIsFinish(false);

        reset();

        mutate(
            {
                input: {
                    message: value.question,
                    conversationId: conversationId as string,
                    createdById: user?.id,
                },
            },
            {
                async onSuccess() {
                    queryClient.invalidateQueries([
                        'ListMessageConversation',
                        { input: { conversationId: conversationId } },
                    ]);

                    const ctrl = new AbortController();

                    try {
                        fetchEventSource('/api/research-document', {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: 'text/event-stream',
                            },
                            body: JSON.stringify({
                                question: value.question,
                                documentId:
                                    conversationData?.conversation?.docId,
                            }),

                            signal: ctrl.signal,

                            onmessage(event) {
                                if (event.data === '[DONE]') {
                                    setIsFinish(true);

                                    const content = `${value.question} ${answer}`;

                                    mutationPay.mutate({ content });

                                    ctrl.abort();
                                } else {
                                    const text = JSON.parse(event.data).text;
                                    setAnswer((a) => a + text);
                                }
                            },
                        });
                    } catch (err) {
                        console.log(err);
                        ctrl.abort();
                    }
                },
            }
        );
    });

    useEffect(() => {
        if (isFinish && answer?.length > 0) {
            mutate(
                {
                    input: {
                        message: answer,
                        conversationId: conversationId as string,
                    },
                },
                {
                    onSuccess() {
                        queryClient.invalidateQueries([
                            'ListMessageConversation',
                            { input: { conversationId: conversationId } },
                        ]);
                    },
                }
            );
        }
    }, [isFinish, answer]);

    return (
        <VStack spacing="0" align="stretch" flex="1">
            <Box flex="1" overflowY="auto" p="5">
                <ListResearch conversationId={conversationId} />
                <Box>
                    {!isFinish && answer && (
                        <HStack spacing="5" align="start" py="4">
                            <Avatar
                                size="sm"
                                bgColor="green.500"
                                rounded="md"
                                icon={<HeroIcon as={CpuChipIcon} />}
                            />
                            <Box>
                                <Text
                                    fontWeight="semibold"
                                    fontSize="sm"
                                    color="gray.400"
                                >
                                    Ai Assistant
                                </Text>
                                <Text
                                    whiteSpace="pre-line"
                                    fontSize="sm"
                                    color="gray.600"
                                >
                                    {answer}
                                </Text>
                            </Box>
                        </HStack>
                    )}
                </Box>
                {!isFinish ? <Spinner size="sm" /> : null}
            </Box>

            <HStack p="5" borderTopWidth="1px">
                <Box flex="1">
                    {isValidBalance ? (
                        <form onSubmit={onSubmit}>
                            <FormField error={errors?.question?.message}>
                                <InputGroup>
                                    <Input
                                        isDisabled={isLoading}
                                        boxShadow="md"
                                        bgColor="white"
                                        fontSize="sm"
                                        color="gray.500"
                                        fontWeight="medium"
                                        autoFocus
                                        {...register('question', {
                                            required: {
                                                value: true,
                                                message: '',
                                            },
                                        })}
                                        size="lg"
                                        placeholder={t(
                                            'research.detail.form.question.placeholder'
                                        )}
                                    />
                                    <InputRightElement
                                        children={
                                            <IconButton
                                                _hover={{
                                                    bgColor: 'transparent',
                                                }}
                                                aria-label="Submit"
                                                variant="ghost"
                                                mt="2"
                                                size="lg"
                                                type="submit"
                                                isLoading={addMessageLoading}
                                                icon={
                                                    <HeroIcon
                                                        color="gray.500"
                                                        _hover={{
                                                            color: 'green.600',
                                                        }}
                                                        as={PaperAirplaneIcon}
                                                    />
                                                }
                                            />
                                        }
                                    />
                                </InputGroup>
                            </FormField>
                        </form>
                    ) : (
                        <Text fontSize="sm" color="gray.500">
                            {t('research.detail.form.warning')}
                        </Text>
                    )}
                </Box>
                {
                    //TODO: write function remove all
                }
                <MenuAction size="lg">
                    <>
                        <MenuItem>
                            {t('research.detail.form.remove_all')}
                        </MenuItem>
                    </>
                </MenuAction>
            </HStack>
        </VStack>
    );
}
