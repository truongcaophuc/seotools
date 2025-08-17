import {
    Center,
    IconButton,
    Input,
    InputGroup,
    InputRightElement,
    Skeleton,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FormField, HeroIcon } from '@components/ui';
import { ConversationInfoFragment } from '@generated/graphql/query';
import { PaperAirplaneIcon } from '@heroicons/react/24/outline';
import { useValidWorkspace } from '@share/hooks/account.hooks';
import { useMe } from '@share/hooks/auth.hooks';
import { useAddMessageInConversation } from '@share/hooks/chatbot.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useConversationStore } from '@share/store/message.store';
import { get, pick } from 'lodash';
import { useForm } from 'react-hook-form';
import { useContextConversation } from './context.conversation';

interface Props {
    conversation?: ConversationInfoFragment;
}

function FormChatConversation({ conversation }: Props) {
    const { t } = useTranslate();
    const { data: meData } = useMe();
    const isLoading = useConversationStore((state) => state.isLoading);
    const setIsLoading = useConversationStore((state) => state.setIsLoading);
    const messages = useConversationStore((state) => state.messages);
    const addMessage = useConversationStore((state) => state.addMessage);
    const setQuestion = useConversationStore((state) => state.setQuestion);
    const { isStreaming } = useContextConversation();

    const { mutate } = useAddMessageInConversation();

    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm<{ question: string }>();

    const onSubmit = handleSubmit((data) => {
        if (isLoading) return;

        setIsLoading(true);

        addMessage({
            id: messages.length.toString(),
            message: data?.question,
            createdBy: pick(meData?.me, ['id', 'fullname']),
        });

        setQuestion(data?.question);

        if (conversation) {
            mutate({
                input: {
                    message: data?.question,
                    createdById: get(meData, 'me.id'),
                    conversationId: conversation.id,
                },
            });
        }

        reset();
    });

    return (
        <VStack as="form" spacing="4" noValidate onSubmit={onSubmit}>
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
                                // message: 'Vui lòng điền nội dung cần hỏi',
                            },
                        })}
                        size="lg"
                        placeholder={t(
                            'chatbot.chat.form.question.placeholder'
                        )}
                    />
                    <InputRightElement
                        w="auto"
                        h="full"
                        children={
                            isStreaming ? (
                                <Spinner mr="5" size="xs" color="gray.300" />
                            ) : (
                                <IconButton
                                    _hover={{
                                        bgColor: 'transparent',
                                    }}
                                    aria-label="Submit"
                                    variant="ghost"
                                    size="lg"
                                    type="submit"
                                    icon={
                                        <HeroIcon
                                            color="gray.500"
                                            _hover={{ color: 'green.600' }}
                                            as={PaperAirplaneIcon}
                                        />
                                    }
                                />
                            )
                        }
                    />
                </InputGroup>
            </FormField>
            <Text color="gray.500" fontSize="sm" textAlign="center">
                {t('chatbot.chat.form.help_text')}
            </Text>
        </VStack>
    );
}

export function ChatConversation({ conversation }: Props) {
    const { t } = useTranslate();
    const { isLoading, isValidBalance } = useValidWorkspace();

    function renderContent() {
        if (!isValidBalance) {
            return (
                <Center>
                    <Text textAlign="center" fontSize="sm" color="gray.500">
                        {t('chatbot.chat.form.warning')}
                    </Text>
                </Center>
            );
        }

        return <FormChatConversation conversation={conversation} />;
    }
    return <Skeleton isLoaded={!isLoading}>{renderContent()}</Skeleton>;
}
