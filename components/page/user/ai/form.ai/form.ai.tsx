import {
    Box,
    Button,
    Flex,
    HStack,
    IconButton,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import { FormField, HeroIcon, Loading } from '@components/ui';
import {
    LanguageInfoFragment,
    ServiceInfoFragment,
    StyleContentInfoFragment,
} from '@generated/graphql/query';
import {
    ArrowUturnLeftIcon,
    ArrowUturnRightIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useValidWorkspace } from '@share/hooks/account.hooks';
import { useLanguages } from '@share/hooks/language.hooks';
import { useMobile } from '@share/hooks/size.hooks';
import { useStyleContents } from '@share/hooks/style-content.hooks';
import { TFunction, useTranslate } from '@share/hooks/translate.hooks';
// import { useCountToken } from '@share/hooks/token.hooks';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { usePayContentAI } from '@share/hooks/workspace.hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Content } from './content';
import { CustomFieldInput, IField } from './custom-field.input';
import { SelectService } from './select-service';
import { useStoreFormAi } from './store.form.ai';

export const inputConfig = {
    bgColor: 'gray.50',
    size: 'sm',
    rounded: 'md',
};

function createSchema(t: TFunction) {
    return z.object({
        serviceId: z
            .string()
            .min(1, t('contents.create_content.form.service.error')),
        productOrService: z.string().optional(),
        // numberCharacter: z.string().optional(),
        // isCreateKeyword: z.boolean(),
        // language: z.string(),
        // styleContent: z.string().optional(),
        targetAudience: z.string().optional(),
        customFields: z.array(
            z.object({
                field: z.string().min(1),
                value: z.string().min(1),
            })
        ),
    });
}

function useStream() {
    const mutationPay = usePayContentAI();
    const [content, setContent] = useState<string>('');
    const [isFinish, setIsFinish] = useState<boolean>(false);
    const [isStreaming, setIsStreaming] = useState<boolean>(false);

    const [ctrlAbort, setCtrlAbort] = useState<AbortController>();

    function onStream({
        serviceId,
        customFields,
    }: {
        serviceId: string;
        customFields: Array<IField>;
    }) {
        setIsStreaming(true);

        const ctrl = new AbortController();

        setCtrlAbort(ctrl);

        fetchEventSource('/api/new-chatbot', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'text/event-stream',
            },
            body: JSON.stringify({ serviceId, customFields }),
            signal: ctrl.signal,
            onmessage(event) {
                if (event.data === '[DONE]') {
                    setIsFinish(true);

                    mutationPay.mutate({ content });
                    setIsStreaming(false);

                    ctrl.abort();
                } else {
                    const text = JSON.parse(event.data).text;
                    setContent((a) => a + text);
                }
            },
        });
    }

    function onCloseStream() {
        if (ctrlAbort) {
            ctrlAbort.abort();
        }

        setIsFinish(true);
        mutationPay.mutate({ content });
        setIsStreaming(false);
    }

    return {
        content,
        onStream,
        onCloseStream,
        isFinish,
        isStreaming,
    };
}

interface FormAiCompProps {
    languages: LanguageInfoFragment[];
    styleContents: StyleContentInfoFragment[];
    service?: ServiceInfoFragment;
    onInsert: (content: string) => void;
}

function FormAiComp({
    languages,
    styleContents,
    service,
    onInsert,
}: FormAiCompProps) {
    const { t } = useTranslate();
    const setIsEdit = useStoreFormAi((state) => state.setIsEdit);
    const isEdit = useStoreFormAi((state) => state.isEdit);

    const { onStream, content, isFinish, isStreaming, onCloseStream } =
        useStream();

    const { isLoading, isValidBalance } = useValidWorkspace();

    const schema = createSchema(t);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            customFields: [],
            serviceId: service?.id,
        },
    });

    const customFields = (watch('customFields') as IField[]) || [];
    const serviceIdWatch = watch('serviceId');

    const handleChangeCustomField = (values: IField[]) => {
        setValue('customFields', values);
    };

    const onSubmit = handleSubmit((_value) => {
        if (isEdit) {
            setIsEdit(false);
        }

        onStream({
            serviceId: service?.id,
            customFields,
        });
    });

    const router = useRouter();

    useEffect(() => {
        if (serviceIdWatch) {
            router.push(`/user/ai/${serviceIdWatch}`);
        }
    }, [serviceIdWatch]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Flex h="calc(100vh - 60px)" overflow="hidden">
            <VStack
                align="stretch"
                as="form"
                noValidate
                maxW="500px"
                w={isEdit ? 0 : '45%'}
                borderRightWidth="1px"
                spacing="0"
                onSubmit={onSubmit}
                visibility={isEdit ? 'hidden' : 'visible'}
            >
                <Box px="6" py="4" borderBottomWidth="1px">
                    <FormField
                        label={t('contents.create_content.form.service.label')}
                        isRequired
                        error={errors?.serviceId?.message}
                    >
                        <SelectService
                            // isDisabled
                            {...inputConfig}
                            {...register('serviceId')}
                        />
                    </FormField>
                </Box>

                <VStack
                    flex="1"
                    overflowY="auto"
                    h="full"
                    spacing="4"
                    px="6"
                    py="4"
                    borderBottomWidth="1px"
                >
                    <CustomFieldInput
                        customFields={service?.customFields}
                        onChange={handleChangeCustomField}
                        languages={languages}
                        styleContents={styleContents}
                    />
                    {/* <Divider />
                    <FormField
                        label={t(
                            'contents.create_content.form.include_keywords.label'
                        )}
                        layout="horizontal"
                        widthLabel="150px"
                    >
                        <Checkbox
                            bgColor="white"
                            {...register('isCreateKeyword')}
                        ></Checkbox>
                    </FormField> */}
                </VStack>

                <Box>
                    <HStack
                        px="6"
                        h="60px"
                        bgColor="gray.50"
                        borderTopWidth="1px"
                    >
                        <Spacer />

                        {isValidBalance ? (
                            <Button
                                size="sm"
                                isDisabled={!isValidBalance}
                                // isDisabled={!isDirty && !isValid}
                                type="button"
                                onClick={onSubmit}
                                colorScheme="green"
                                isLoading={isStreaming}
                            >
                                {content
                                    ? t(
                                          'contents.create_content.form.re_create_content'
                                      )
                                    : t('contents.create_content.form.submit')}
                            </Button>
                        ) : (
                            <HStack>
                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    {t('content.create_content.form.warning')}
                                </Text>
                                <Button
                                    colorScheme="red"
                                    as={Link}
                                    href="/user/workspace"
                                >
                                    {t('commons.upgrade')}
                                </Button>
                            </HStack>
                        )}
                    </HStack>
                </Box>
            </VStack>

            <Box flex="1" overflowY="auto">
                <Content
                    isLoading={isStreaming}
                    content={content}
                    onInsert={onInsert}
                    onCloseStream={onCloseStream}
                />
            </Box>
        </Flex>
    );
}

function FormAiMobileComp({
    languages,
    styleContents,
    service,
    onInsert,
}: FormAiCompProps) {
    const { t } = useTranslate();
    const setIsEdit = useStoreFormAi((state) => state.setIsEdit);
    const isEdit = useStoreFormAi((state) => state.isEdit);

    const { onStream, content, isFinish, isStreaming, onCloseStream } =
        useStream();

    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    const { isLoading, isValidBalance } = useValidWorkspace();

    const languageDefault = languages.find((item) => item.isDefault);

    const schema = createSchema(t);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            // language: languageDefault?.label,
            customFields: [],
            serviceId: service?.id,
        },
    });

    const customFields = (watch('customFields') as IField[]) || [];
    const serviceIdWatch = watch('serviceId');

    const handleChangeCustomField = (values: IField[]) => {
        setValue('customFields', values);
    };

    const onSubmit = handleSubmit((_value) => {
        if (isEdit) {
            setIsEdit(false);
        }

        onStream({
            serviceId: service?.id,
            customFields,
        });

        setIsSubmitted(true);
    });

    const router = useRouter();

    useEffect(() => {
        if (serviceIdWatch) {
            router.push(`/user/ai/${serviceIdWatch}`);
        }
    }, [serviceIdWatch]);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Flex h="calc(100vh - 60px)" overflow="hidden">
            <Box flex="1" hidden={!isSubmitted}>
                <Content
                    extra={
                        <IconButton
                            size="sm"
                            onClick={() => setIsSubmitted(false)}
                            aria-label="Back"
                            icon={<HeroIcon as={ArrowUturnLeftIcon} />}
                        />
                    }
                    isLoading={isStreaming}
                    content={content}
                    onInsert={onInsert}
                    onCloseStream={onCloseStream}
                />
            </Box>
            <VStack
                hidden={isSubmitted}
                w="full"
                align="stretch"
                as="form"
                noValidate
                spacing="0"
                onSubmit={onSubmit}
            >
                <Box px="6" py="4" borderBottomWidth="1px">
                    <FormField
                        label={t('contents.create_content.form.service.label')}
                        isRequired
                        error={errors?.serviceId?.message}
                    >
                        <SelectService
                            // isDisabled
                            {...inputConfig}
                            {...register('serviceId')}
                        />
                    </FormField>
                </Box>

                <VStack
                    flex="1"
                    overflowY="auto"
                    h="full"
                    spacing="4"
                    px="6"
                    py="4"
                    borderBottomWidth="1px"
                >
                    <CustomFieldInput
                        customFields={service?.customFields}
                        onChange={handleChangeCustomField}
                        languages={languages}
                        styleContents={styleContents}
                    />
                    {/* <FormField
                        label={t(
                            'contents.create_content.form.include_keywords.label'
                        )}
                        layout="horizontal"
                        widthLabel="150px"
                    >
                        <Checkbox
                            bgColor="white"
                            {...register('isCreateKeyword')}
                        ></Checkbox>
                    </FormField> */}
                </VStack>

                <Box>
                    <HStack
                        px="6"
                        h="60px"
                        bgColor="gray.50"
                        borderTopWidth="1px"
                    >
                        {isValidBalance ? (
                            <Button
                                size="sm"
                                isDisabled={!isValidBalance}
                                // isDisabled={!isDirty && !isValid}
                                type="button"
                                onClick={onSubmit}
                                colorScheme="green"
                                isLoading={isStreaming}
                            >
                                {content
                                    ? t(
                                          'contents.create_content.form.re_create_content'
                                      )
                                    : t('contents.create_content.form.submit')}
                            </Button>
                        ) : (
                            <HStack>
                                <Text
                                    color="gray.500"
                                    fontSize="sm"
                                    fontWeight="medium"
                                >
                                    Số dư tài khoản không đủ
                                </Text>
                                <Button
                                    size="sm"
                                    colorScheme="red"
                                    as={Link}
                                    href="/user/workspace"
                                >
                                    Nạp ngay
                                </Button>
                            </HStack>
                        )}

                        <Spacer />
                        <IconButton
                            type="button"
                            size="sm"
                            aria-label="Back content"
                            icon={<HeroIcon as={ArrowUturnRightIcon} />}
                        />
                    </HStack>
                </Box>
            </VStack>
        </Flex>
    );
}

interface Props {
    service?: ServiceInfoFragment;
    onInsert?: (content: string) => void;
}

export function FormAi({ service, onInsert }: Props) {
    const queryLanguage = useLanguages();
    const queryStyleContent = useStyleContents();

    const setIsEdit = useStoreFormAi((state) => state.setIsEdit);

    const isMobile = useMobile();

    useEffect(() => {
        setIsEdit(false);
    }, []);

    const isLoading = queryLanguage.isLoading || queryStyleContent.isLoading;

    if (isLoading) {
        return <Loading />;
    }

    const languages = queryLanguage?.data?.languages || [];
    const styleContents = queryStyleContent?.data?.styleContents || [];

    if (isMobile) {
        return (
            <FormAiMobileComp
                service={service}
                onInsert={onInsert}
                languages={languages}
                styleContents={styleContents}
            />
        );
    }

    return (
        <FormAiComp
            service={service}
            onInsert={onInsert}
            languages={languages}
            styleContents={styleContents}
        />
    );
}
