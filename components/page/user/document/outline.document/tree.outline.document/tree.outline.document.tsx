import {
    Avatar,
    Box,
    Button,
    Center,
    HStack,
    IconButton,
    Skeleton,
    Spacer,
    StackDivider,
    Text,
    Tooltip,
    VStack,
} from '@chakra-ui/react';
import { FormField, HeroIcon, Markdown } from '@components/ui';
import { TypeAiSettingApp } from '@generated/graphql/query';
import {
    ChevronLeftIcon,
    ClipboardDocumentListIcon,
    InboxIcon,
    PencilSquareIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { useValidWorkspace } from '@share/hooks/account.hooks';
import { useUpdateDocument } from '@share/hooks/document.hooks';
import { useStreamChatbot } from '@share/hooks/request-content.hooks';
import { useAiSettingApps } from '@share/hooks/setting.hooks';
import { useDocumentStore } from '@share/store/document.store';
import { TSubOutlineItem } from '@share/store/outline.store';
import { useQueryClient } from '@tanstack/react-query';
import { cloneElement, ReactElement, useEffect, useRef, useState } from 'react';
import { CopyOutlineDocument } from './copy.outline.document';
import { useTranslate } from '@share/hooks/translate.hooks';

export type TTreeOutlineItem = {
    id: number;
    title: string;
    items: Array<TSubOutlineItem>;
};

interface Props {
    onToggle: () => void;
}

function ButtonAiCreateOutline({
    children,
    noTitle,
}: {
    children: ReactElement;
    noTitle?: boolean;
}) {
    const { t } = useTranslate();
    const { isLoading, isValidBalance } = useValidWorkspace();

    function renderContent() {
        if (noTitle) {
            return (
                <Tooltip
                    colorScheme="red"
                    label={t('posts.detail.post_not_title')}
                >
                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        {t('posts.detail.create_outline_with_ai')}
                    </Text>
                </Tooltip>
            );
        }

        if (!isValidBalance) {
            return (
                <Tooltip
                    colorScheme="red"
                    label={t('posts.detail.account_not_valid')}
                >
                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                        {t('posts.detail.create_outline_with_ai')}
                    </Text>
                </Tooltip>
            );
        }

        return cloneElement(children);
    }

    return <Skeleton isLoaded={!isLoading}>{renderContent()}</Skeleton>;
}

export function TreeOutlineDocument({ onToggle }: Props) {
    const { t } = useTranslate();
    const { data, isLoading } = useAiSettingApps();
    const { onStream, content, isStreaming } = useStreamChatbot();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const document = useDocumentStore((state) => state.document);
    const changeOutline = useDocumentStore(
        (state) => state.changeOutlineDocument
    );
    const queryClient = useQueryClient();

    const contentRef = useRef<HTMLDivElement>();

    const outline = document?.outline;

    function handleRequestOutline() {
        if (isLoading) return;

        const setting = data?.aiSettingApps.find(
            (item) => item.type === TypeAiSettingApp.Outline
        );

        const mainKeyword = document?.keyword?.value;
        const subKeyword = document?.keyword?.subKeywords
            .map((item) => {
                return item.value;
            })
            .join(', ');

        const title = document?.title;

        const prompt = setting?.leadingSentence
            .replace('$$title', title)
            .replace('$$mainKeyword', mainKeyword)
            .replace('$$subKeyword', subKeyword);

        const messages = JSON.stringify([{ role: 'user', content: prompt }]);

        onStream({
            messages,
            max_tokens: setting?.max_tokens,
        });
    }

    const { isLoading: isLoadingSave, mutate } = useUpdateDocument();

    function handleSaveOutline() {
        if (contentRef.current) {
            const outline = contentRef.current.textContent.trim();
            mutate(
                {
                    input: {
                        id: document?.id,
                        data: {
                            keywordId: document?.keywordId,
                            outline,
                        },
                    },
                },
                {
                    onSuccess() {
                        queryClient.invalidateQueries([
                            'Document',
                            { id: document?.keywordId },
                        ]);

                        changeOutline(outline);
                        setIsEdit(false);
                    },
                }
            );
        }
    }

    function handleEditOutline(e) {
        if (contentRef.current) {
            console.log(contentRef.current.textContent);
        }
    }

    useEffect(() => {
        if (contentRef.current) {
            console.log(contentRef.current.textContent);
        }
    }, [contentRef]);

    function renderOutline() {
        if (isEdit) {
            return (
                <VStack align="stretch" spacing="2">
                    <Box pos="relative" p="4">
                        <FormField
                            label={t('posts.detail.create_outline')}
                            extra={
                                <ButtonAiCreateOutline
                                    noTitle={
                                        !document?.title ||
                                        document.title.length === 0
                                    }
                                >
                                    <Button
                                        size="xs"
                                        colorScheme="blue"
                                        isDisabled={
                                            !document?.title ||
                                            document.title.length === 0 ||
                                            isLoadingSave
                                        }
                                        onClick={handleRequestOutline}
                                    >
                                        {t(
                                            'posts.detail.create_outline_with_ai'
                                        )}
                                    </Button>
                                </ButtonAiCreateOutline>
                            }
                        >
                            {isStreaming ? (
                                <Box
                                    borderWidth="1px"
                                    pos="relative"
                                    zIndex="10"
                                    ref={contentRef}
                                    fontFamily="inherit"
                                    contentEditable
                                    whiteSpace="pre-line"
                                    rounded="md"
                                    fontSize="sm"
                                    fontWeight="medium"
                                    p="5"
                                    minH="200px"
                                    onInput={handleEditOutline}
                                >
                                    {content || outline}{' '}
                                    {isStreaming ? '...' : ''}
                                </Box>
                            ) : (
                                <Box
                                    borderWidth="1px"
                                    pos="relative"
                                    zIndex="10"
                                    ref={contentRef}
                                    fontFamily="inherit"
                                    contentEditable
                                    whiteSpace="pre-line"
                                    rounded="md"
                                    fontSize="sm"
                                    fontWeight="medium"
                                    p="5"
                                    minH="200px"
                                    onInput={handleEditOutline}
                                >
                                    {content || outline}{' '}
                                    {isStreaming ? '...' : ''}
                                </Box>
                            )}
                        </FormField>
                    </Box>

                    <Center>
                        {isStreaming ? null : (
                            <HStack>
                                <Button
                                    disabled={isLoadingSave}
                                    size="sm"
                                    onClick={() => setIsEdit(false)}
                                >
                                    {t('commons.exit')}
                                </Button>

                                <Button
                                    size="sm"
                                    colorScheme="green"
                                    onClick={handleSaveOutline}
                                    isLoading={isLoadingSave}
                                >
                                    {t('commons.save')}
                                </Button>
                            </HStack>
                        )}
                    </Center>
                </VStack>
            );
        }

        if (!outline || outline?.length === 0) {
            return (
                <VStack p="8">
                    <Avatar
                        icon={<HeroIcon as={InboxIcon} />}
                        bgColor="gray.200"
                        color="gray.500"
                    />

                    <Text fontSize="sm">{t('posts.detail.no_outline')}</Text>
                    <Button
                        onClick={() => setIsEdit(true)}
                        size="sm"
                        leftIcon={<HeroIcon as={PlusIcon} />}
                    >
                        {t('commons.add')}
                    </Button>
                </VStack>
            );
        }

        return (
            <VStack
                divider={<StackDivider />}
                spacing="6"
                p="5"
                align="stretch"
            >
                <Box
                    fontFamily="inherit"
                    rounded="md"
                    fontSize="sm"
                    fontWeight="medium"
                >
                    <Markdown content={outline} />
                </Box>

                <Center>
                    <HStack>
                        <IconButton
                            aria-label="Add"
                            size="sm"
                            onClick={() => setIsEdit(true)}
                            icon={<HeroIcon as={PencilSquareIcon} />}
                        />
                        <CopyOutlineDocument outline={outline}>
                            <IconButton
                                colorScheme="green"
                                size="sm"
                                // onClick={handleClick}
                                aria-label="Add"
                                icon={
                                    <HeroIcon as={ClipboardDocumentListIcon} />
                                }
                            />
                        </CopyOutlineDocument>
                    </HStack>
                </Center>
            </VStack>
        );

        // return (
        //     <VStack align="stretch" spacing="0" divider={<StackDivider />}>
        //         {outline?.map((item) => (
        //             <ItemTreeOutlineDocument key={item.id} outlineItem={item} />
        //         ))}
        //     </VStack>
        // );
    }

    return (
        <>
            <HStack borderBottomWidth="1px" bgColor="white" px="4" h="36px">
                <IconButton
                    onClick={onToggle}
                    aria-label="Toggle outline"
                    size="xs"
                    icon={<HeroIcon as={ChevronLeftIcon} boxSize="4" />}
                />
                <Text fontWeight="semibold">Outline</Text>
                <Spacer />
            </HStack>
            {renderOutline()}
        </>
    );
}
