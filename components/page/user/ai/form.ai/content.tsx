import {
    Box,
    Button,
    HStack,
    IconButton,
    Spacer,
    Spinner,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    Editor,
    Heading,
    HeroIcon,
    LexicalComposerInit,
    Markdown,
} from '@components/ui';
import { PencilSquareIcon } from '@heroicons/react/24/outline';
import { $generateNodesFromDOM } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTranslate } from '@share/hooks/translate.hooks';
import { $getRoot, $insertNodes } from 'lexical';
import { ReactNode, useEffect, useRef } from 'react';
import { NewContentFormAi } from './new-content.form.ai';
import { useStoreFormAi } from './store.form.ai';
import { StopIcon } from '@heroicons/react/24/solid';

interface Props {
    isLoading?: boolean;
    content?: string;
    onInsert?: (value: string) => void;
    extra?: ReactNode;
    onCloseStream: () => void;
}

export function Content({
    content,
    onInsert,
    extra,
    onCloseStream,
    isLoading = false,
}: Props) {
    const { t } = useTranslate();
    const setIsEdit = useStoreFormAi((state) => state.setIsEdit);
    const isEdit = useStoreFormAi((state) => state.isEdit);

    function handleEdit() {
        setIsEdit(true);
    }

    function renderButtonAction() {
        if (isLoading)
            return (
                <Button
                    onClick={onCloseStream}
                    size="sm"
                    colorScheme="red"
                    leftIcon={<HeroIcon as={StopIcon} />}
                >
                    {t('commons.stop_generating')}
                </Button>
            );

        if (!content) {
            return <></>;
        }
        if (isEdit) {
            return (
                <>
                    <Button
                        onClick={() => setIsEdit(false)}
                        size="sm"
                        variant="ghost"
                    >
                        {t('commons.cancel')}
                    </Button>

                    <NewContentFormAi>
                        <Button size="sm" colorScheme="green">
                            {t('commons.save')}
                        </Button>
                    </NewContentFormAi>
                </>
            );
        }

        return (
            <>
                <IconButton
                    aria-label="Edit"
                    onClick={handleEdit}
                    variant="outline"
                    size="sm"
                    icon={<HeroIcon as={PencilSquareIcon} />}
                />
                <NewContentFormAi>
                    <Button size="sm" colorScheme="green">
                        {t('commons.save')}
                    </Button>
                </NewContentFormAi>
            </>
        );
    }

    return (
        <LexicalComposerInit>
            <VStack h="calc(100% - 4px)" flex="1" align="stretch" spacing="0">
                <HStack
                    flexShrink="0"
                    pl={extra ? '2' : '6'}
                    pr="6"
                    h="50px"
                    borderBottomWidth="1px"
                >
                    {extra}
                    <Heading fontSize="md">
                        {t('contents.create_content.content.title')}
                    </Heading>
                    <Spacer />

                    {renderButtonAction()}
                </HStack>

                <Box flex="1">
                    <ContentEditor content={content} isEdit={isEdit} />
                </Box>
            </VStack>
        </LexicalComposerInit>
    );
}

function ContentEditor({
    content,
    isEdit,
}: {
    content: string;
    isEdit: boolean;
}) {
    const markdownRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslate();
    const [editor] = useLexicalComposerContext();

    // TODO: add format table
    // useEffect(() => {
    //     if (content && content.length > 0) {
    //         try {
    //             JSON.parse(content);
    //         } catch (error) {
    //             editor.update(() => {
    //                 const root = $getRoot();
    //
    //                 root.clear();
    //
    //                 const contentArr = content
    //                     .split(`\n`)
    //                     .filter((item) => item.length > 0);
    //
    //                 for (let item of contentArr) {
    //                     if (item) {
    //                         let { heading, content } =
    //                             getTypeFormatHeading(item);
    //                         if (heading) {
    //                             heading.append($createTextNode(content));
    //                             root.append(heading);
    //                         }
    //                     }
    //                 }
    //             });
    //         }
    //     }
    // }, [content]);

    useEffect(() => {
        if (content && content.length > 0) {
            try {
                JSON.parse(content);
            } catch (error) {
                editor.update(() => {
                    const root = $getRoot();

                    root.clear();

                    if (markdownRef.current) {
                        const html = markdownRef.current.innerHTML;
                        console.log(html);

                        const parser = new DOMParser();
                        const dom = parser.parseFromString(html, 'text/html');
                        console.log(dom);

                        const nodes = $generateNodesFromDOM(editor, dom);

                        // Select the root
                        root.select();

                        // Insert them at a selection.
                        $insertNodes(nodes);
                    }
                    // const a = $convertFromMarkdownString(content, TRANSFORMERS);
                    // console.log({ a })
                });
            }
        }
    }, [content]);

    if (!content) {
        return (
            <Text p="6" fontSize="sm" color="gray.500">
                {t('contents.create_content.content.message')}
            </Text>
        );
    }

    if (isEdit) {
        const HEIGTH = 'calc(100% - 70px)';
        return <Editor isCompact={true} height={HEIGTH} onChange={() => {}} />;
    }

    return (
        <Box p="6" ref={markdownRef} fontSize="sm">
            <Markdown content={content} />
        </Box>
    );
}
