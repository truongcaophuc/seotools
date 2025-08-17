import {
    $createParagraphNode,
    $createTextNode,
    EditorState,
    LexicalCommand,
    LexicalEditor,
    NodeKey,
} from 'lexical';
import type { Doc } from 'yjs';

import {
    $createMarkNode,
    $getMarkIDs,
    $isMarkNode,
    $unwrapMarkNode,
    $wrapSelectionInMarkNode,
    MarkNode,
} from '@lexical/mark';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { useCollaborationContext } from '@lexical/react/LexicalCollaborationContext';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { PlainTextPlugin } from '@lexical/react/LexicalPlainTextPlugin';
import { createDOMRange, createRectsFromDOMRange } from '@lexical/selection';
import { $isRootTextContentEmpty, $rootTextContent } from '@lexical/text';
import { mergeRegister, registerNestedElementResolver } from '@lexical/utils';
import {
    $getNodeByKey,
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    COMMAND_PRIORITY_EDITOR,
    createCommand,
    KEY_ESCAPE_COMMAND,
} from 'lexical';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { WebsocketProvider } from 'y-websocket';
import useLayoutEffect from '../../shared/useLayoutEffect';

import { Spinner } from '@chakra-ui/react';
import { TypeAiSettingApp } from '@generated/graphql/query';
import {
    useStreamChatbot,
    useStreamContent,
} from '@share/hooks/request-content.hooks';
import { useAiSettingApps } from '@share/hooks/setting.hooks';
import {
    Comment,
    CommentStore,
    Thread,
    useCommentStore,
} from '../../commenting';
import CommentEditorTheme from '../../themes/CommentEditorTheme';
import { Button } from '../../ui/Button';
import { LexicalContentEditable as ContentEditable } from '../../ui/ContentEditable';
import { Placeholder } from '../../ui/Placeholder';
import { useTranslate } from '@share/hooks/translate.hooks';

export const INSERT_INLINE_COMMAND: LexicalCommand<void> = createCommand(
    'INSERT_INLINE_COMMAND'
);

function EditorRefPlugin({
    editorRef,
}: {
    editorRef: { current: null | LexicalEditor };
}): null {
    const [editor] = useLexicalComposerContext();

    useLayoutEffect(() => {
        editorRef.current = editor;
        return () => {
            editorRef.current = null;
        };
    }, [editor, editorRef]);

    return null;
}

function EscapeHandlerPlugin({
    onEscape,
}: {
    onEscape: (e: KeyboardEvent) => boolean;
}): null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        return editor.registerCommand(
            KEY_ESCAPE_COMMAND,
            (event: KeyboardEvent) => {
                return onEscape(event);
            },
            2
        );
    }, [editor, onEscape]);

    return null;
}

function PlainTextEditor({
    className,
    autoFocus,
    onEscape,
    onChange,
    editorRef,
    placeholder = 'Type a comment...',
}: {
    autoFocus?: boolean;
    className?: string;
    editorRef?: { current: null | LexicalEditor };
    onChange: (editorState: EditorState, editor: LexicalEditor) => void;
    onEscape: (e: KeyboardEvent) => boolean;
    placeholder?: string;
}) {
    const initialConfig = {
        namespace: 'Commenting',
        nodes: [],
        onError: (error: Error) => {
            throw error;
        },
        theme: CommentEditorTheme,
    };

    return (
        <LexicalComposer initialConfig={initialConfig}>
            <div className="CommentPlugin_CommentInputBox_EditorContainer">
                <PlainTextPlugin
                    contentEditable={<ContentEditable className={className} />}
                    placeholder={<Placeholder>{placeholder}</Placeholder>}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={onChange} />
                <HistoryPlugin />
                {autoFocus !== false && <AutoFocusPlugin />}
                <EscapeHandlerPlugin onEscape={onEscape} />
                <ClearEditorPlugin />
                {editorRef !== undefined && (
                    <EditorRefPlugin editorRef={editorRef} />
                )}
            </div>
        </LexicalComposer>
    );
}

function useOnChange(
    setContent: (text: string) => void,
    setCanSubmit: (canSubmit: boolean) => void
) {
    return useCallback(
        (editorState: EditorState, _editor: LexicalEditor) => {
            editorState.read(() => {
                console.log({ text: $rootTextContent() });
                setContent($rootTextContent());
                setCanSubmit(
                    !$isRootTextContentEmpty(_editor.isComposing(), true)
                );
            });
        },
        [setCanSubmit, setContent]
    );
}

function CommentInputBox({
    editor,
    cancelAddComment,
    submitAddComment,
}: {
    cancelAddComment: () => void;
    editor: LexicalEditor;
    submitAddComment: (
        commentOrThread: Comment | Thread,
        isInlineComment: boolean
    ) => void;
}) {
    const { t } = useTranslate();
    const { data } = useAiSettingApps();
    // const {
    //     onStream,
    //     content: contentStream,
    //     isStreaming,
    // } = useStreamChatbot();
    const {
        onStream,
        content: contentStream,
        isStreaming,
    } = useStreamContent();
    const boxRef = useRef<HTMLDivElement>(null);
    const selectionState = useMemo(
        () => ({
            container: document.createElement('div'),
            elements: [],
        }),
        []
    );

    const [type, setType] = useState<TypeAiSettingApp>();
    // const author = useCollabAuthorName();

    const updateLocation = useCallback(() => {
        editor.getEditorState().read(() => {
            const selection = $getSelection();
            if ($isRangeSelection(selection)) {
                const anchor = selection.anchor;
                const focus = selection.focus;
                const range = createDOMRange(
                    editor,
                    anchor.getNode(),
                    anchor.offset,
                    focus.getNode(),
                    focus.offset
                );

                const boxElem = boxRef.current;
                if (range !== null && boxElem !== null) {
                    const { left, bottom, width } =
                        range.getBoundingClientRect();
                    const selectionRects = createRectsFromDOMRange(
                        editor,
                        range
                    );
                    let correctedLeft =
                        selectionRects.length === 1
                            ? left + width / 2 - 140
                            : left - 100;
                    if (correctedLeft < 10) {
                        correctedLeft = 10;
                    }
                    boxElem.style.left = `${correctedLeft}px`;
                    boxElem.style.top = `${bottom + 20}px`;
                    const selectionRectsLength = selectionRects.length;
                    const { container } = selectionState;
                    const elements: Array<HTMLSpanElement> =
                        selectionState.elements;
                    const elementsLength = elements.length;

                    for (let i = 0; i < selectionRectsLength; i++) {
                        const selectionRect = selectionRects[i];
                        let elem: HTMLSpanElement = elements[i];
                        if (elem === undefined) {
                            elem = document.createElement('span');
                            elements[i] = elem;
                            container.appendChild(elem);
                        }
                        const color = '255, 212, 0';
                        const style = `position:absolute;top:${selectionRect.top}px;left:${selectionRect.left}px;height:${selectionRect.height}px;width:${selectionRect.width}px;background-color:rgba(${color}, 0.3);pointer-events:none;z-index:5;`;
                        elem.style.cssText = style;
                    }
                    for (
                        let i = elementsLength - 1;
                        i >= selectionRectsLength;
                        i--
                    ) {
                        const elem = elements[i];
                        container.removeChild(elem);
                        elements.pop();
                    }
                }
            }
        });
    }, [editor, selectionState]);

    useLayoutEffect(() => {
        updateLocation();

        const container = selectionState.container;
        const body = document.body;

        if (body !== null) {
            body.appendChild(container);
            return () => {
                body.removeChild(container);
            };
        }
    }, [selectionState.container, updateLocation]);

    useEffect(() => {
        window.addEventListener('resize', updateLocation);

        return () => {
            window.removeEventListener('resize', updateLocation);
        };
    }, [updateLocation]);

    const onEscape = (event: KeyboardEvent): boolean => {
        event.preventDefault();
        cancelAddComment();
        return true;
    };

    // const submitComment = () => {
    //     if (canSubmit) {
    //         let quote = editor.getEditorState().read(() => {
    //             const selection = $getSelection();
    //             return selection !== null ? selection.getTextContent() : '';
    //         });
    //         if (quote.length > 100) {
    //             quote = quote.slice(0, 99) + '…';
    //         }
    //         submitAddComment(
    //             createThread(quote, [createComment(content, author)]),
    //             true
    //         );
    //     }
    // };

    // const onChange = useOnChange(setContent, setCanSubmit);

    function getPrompt({
        text,
        typePrompt,
    }: {
        text: string;
        typePrompt: TypeAiSettingApp;
    }) {
        const setting = data?.aiSettingApps.find(
            (item) => item.type === typePrompt
        );

        return setting?.leadingSentence.replace('$paragraph', text);
    }

    function getMaxToken(typePrompt: TypeAiSettingApp) {
        const setting = data?.aiSettingApps.find(
            (item) => item.type === typePrompt
        );

        return setting?.max_tokens;
    }

    function handleGenerate(_type: TypeAiSettingApp) {
        setType(_type);

        editor.getEditorState().read(() => {
            const selection = $getSelection();
            const text = selection.getTextContent();

            if (text.length > 0) {
                let prompt = getPrompt({
                    text,
                    typePrompt: _type,
                });

                let max_tokens = getMaxToken(_type);

                const messages = JSON.stringify([
                    { role: 'user', content: prompt },
                ]);

                onStream({
                    //With davince
                    prompt,
                    max_tokens: 1800,

                    // With GPT-3.5
                    // messages,
                    // max_tokens,
                });
            }
        });
    }

    function handleAccept() {
        editor.update(() => {
            const selection = $getSelection();
            let text = contentStream;

            switch (type) {
                case TypeAiSettingApp.Insert:
                    let textContentNode = selection.getTextContent();
                    text = `${textContentNode} ${text}`;

                    selection.insertText(text);

                    break;

                case TypeAiSettingApp.Rewrite:
                    selection.insertText(text);
                    break;

                case TypeAiSettingApp.Write:
                    const nodes = selection.getNodes();
                    if (nodes.length > 0) {
                        const par = nodes[0].getParents();

                        const paragraph = $createParagraphNode();
                        paragraph.append($createTextNode(text));

                        par[0].insertAfter(paragraph);
                    }

                    break;
                default:
                    break;
            }
        });
    }

    function renderContent() {
        function renderTitle() {
            if (type === TypeAiSettingApp.Insert) {
                return t('commons.editor.ai.insert');
            }
            if (type === TypeAiSettingApp.Rewrite) {
                return t('commons.editor.ai.re_write');
            }

            return t('commons.editor.ai.write');
        }

        if (isStreaming || contentStream.length > 0) {
            return (
                <div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '7px 15px',
                            borderBottom: '1px solid #eee',
                        }}
                    >
                        <span style={{ fontSize: 14, fontWeight: '600' }}>
                            {renderTitle()}
                        </span>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '10px',
                            }}
                        >
                            {isStreaming ? (
                                <Spinner size="sm" color="gray.300" />
                            ) : (
                                <Button
                                    disabled={isStreaming}
                                    onClick={() => handleGenerate(type)}
                                    style={{ fontSize: 14, color: '#444' }}
                                >
                                    {t('commons.editor.ai.refresh')}
                                </Button>
                            )}
                        </div>
                    </div>

                    <div
                        style={{
                            padding: 10,
                            fontSize: 12,
                            fontWeight: '600',
                            minHeight: '50px',
                            maxHeight: '150px',
                            overflowY: 'auto',
                        }}
                    >
                        <div>
                            {contentStream} {isStreaming ? '...' : ''}
                        </div>
                    </div>

                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 14,
                            padding: '15px',
                        }}
                    >
                        <span />
                        {!!contentStream && !isStreaming ? (
                            <Button
                                disabled={isStreaming}
                                onClick={handleAccept}
                                style={{
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    color: '#2F855A',
                                }}
                            >
                                {t('commons.editor.ai.accept')}
                            </Button>
                        ) : null}
                    </div>
                </div>
            );

            // return (
            //     <>
            //         <div style={{ padding: 10 }}>{contentStream}</div>
            //         {/* <PlainTextEditor
            //             className="CommentPlugin_CommentInputBox_Editor"
            //             onEscape={onEscape}
            //             onChange={onChange}
            //         /> */}

            //         {/* <div className="CommentPlugin_CommentInputBox_Buttons"> */}
            //         <div>
            //             <Button
            //                 onClick={cancelAddComment}
            //                 className="CommentPlugin_CommentInputBox_Button"
            //             >
            //                 Cancel
            //             </Button>
            //             {/* <Button
            //                 onClick={submitComment}
            //                 disabled={!canSubmit}
            //                 className="CommentPlugin_CommentInputBox_Button primary"
            //             >
            //                 Comment
            //             </Button> */}

            //             <Button
            //                 onClick={handleReWrite}
            //                 className="CommentPlugin_CommentInputBox_Button primary"
            //             >
            //                 ReWrite
            //             </Button>

            //             <Button
            //                 onClick={handleInsert}
            //                 className="CommentPlugin_CommentInputBox_Button primary"
            //             >
            //                 Insert
            //             </Button>
            //         </div>
            //     </>
            // );
        }

        return (
            <div
                style={{
                    // display: 'flex',
                    // flexDirection: 'column',
                    // justifyContent: 'center',
                    // alignItems: 'center',
                    // gap: '15px',
                    // padding: '10px',
                    fontSize: 15,
                    fontWeight: 'bold',
                }}
            >
                <Button
                    style={{
                        display: 'block',
                        width: '100%',
                        borderBottom: '1px solid #eee',
                        padding: '7px',
                        fontWeight: 'semibold',
                    }}
                    onClick={() => handleGenerate(TypeAiSettingApp.Write)}
                >
                    {t('commons.editor.ai.write')}
                </Button>

                <Button
                    style={{
                        display: 'block',
                        width: '100%',
                        borderBottom: '1px solid #eee',
                        padding: '7px',
                        fontWeight: 'semibold',
                    }}
                    onClick={() => handleGenerate(TypeAiSettingApp.Rewrite)}
                >
                    {t('commons.editor.ai.re_write')}
                </Button>

                <Button
                    style={{
                        display: 'block',
                        width: '100%',
                        borderBottom: '1px solid #eee',
                        padding: '7px',
                        fontWeight: 'semibold',
                    }}
                    onClick={() => handleGenerate(TypeAiSettingApp.Insert)}
                >
                    {t('commons.editor.ai.insert')}
                </Button>
            </div>
        );
    }

    return (
        <div ref={boxRef} className="CommentPlugin_CommentInputBox">
            {renderContent()}
        </div>
    );
}

export default function CommentPlugin({
    providerFactory,
}: {
    providerFactory?: (
        id: string,
        yjsDocMap: Map<string, Doc>
    ) => WebsocketProvider;
}): JSX.Element {
    const collabContext = useCollaborationContext();
    const [editor] = useLexicalComposerContext();
    const commentStore = useMemo(() => new CommentStore(editor), [editor]);
    const comments = useCommentStore(commentStore);
    const markNodeMap = useMemo<Map<string, Set<NodeKey>>>(() => {
        return new Map();
    }, []);
    const [activeAnchorKey, setActiveAnchorKey] = useState<NodeKey | null>();
    const [activeIDs, setActiveIDs] = useState<Array<string>>([]);
    const [showCommentInput, setShowCommentInput] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const { yjsDocMap } = collabContext;

    // useEffect(() => {
    //     if (providerFactory) {
    //         const provider = providerFactory('comments', yjsDocMap);
    //         return commentStore.registerCollaboration(provider);
    //     }
    // }, [commentStore, providerFactory, yjsDocMap]);

    const cancelAddComment = useCallback(() => {
        editor.update(() => {
            const selection = $getSelection();
            // Restore selection
            if (selection !== null) {
                selection.dirty = true;
            }
        });
        setShowCommentInput(false);
    }, [editor]);

    const deleteCommentOrThread = useCallback(
        (comment: Comment | Thread, thread?: Thread) => {
            if (comment.type === 'comment') {
                const deletionInfo = commentStore.deleteCommentOrThread(
                    comment,
                    thread
                );
                if (!deletionInfo) return;
                const { markedComment, index } = deletionInfo;
                commentStore.addComment(markedComment, thread, index);
            } else {
                commentStore.deleteCommentOrThread(comment);
                // Remove ids from associated marks
                const id = thread !== undefined ? thread.id : comment.id;
                const markNodeKeys = markNodeMap.get(id);
                if (markNodeKeys !== undefined) {
                    // Do async to avoid causing a React infinite loop
                    setTimeout(() => {
                        editor.update(() => {
                            for (const key of markNodeKeys) {
                                const node: null | MarkNode =
                                    $getNodeByKey(key);
                                if ($isMarkNode(node)) {
                                    node.deleteID(id);
                                    if (node.getIDs().length === 0) {
                                        $unwrapMarkNode(node);
                                    }
                                }
                            }
                        });
                    });
                }
            }
        },
        [commentStore, editor, markNodeMap]
    );

    const submitAddComment = useCallback(
        (
            commentOrThread: Comment | Thread,
            isInlineComment: boolean,
            thread?: Thread
        ) => {
            commentStore.addComment(commentOrThread, thread);
            if (isInlineComment) {
                editor.update(() => {
                    const selection = $getSelection();
                    if ($isRangeSelection(selection)) {
                        const focus = selection.focus;
                        const anchor = selection.anchor;
                        const isBackward = selection.isBackward();
                        const id = commentOrThread.id;

                        // Wrap content in a MarkNode
                        $wrapSelectionInMarkNode(selection, isBackward, id);

                        // Make selection collapsed at the end
                        if (isBackward) {
                            focus.set(anchor.key, anchor.offset, anchor.type);
                        } else {
                            anchor.set(focus.key, focus.offset, focus.type);
                        }
                    }
                });
                setShowCommentInput(false);
            }
        },
        [commentStore, editor]
    );

    useEffect(() => {
        const changedElems: Array<HTMLElement> = [];
        for (let i = 0; i < activeIDs.length; i++) {
            const id = activeIDs[i];
            const keys = markNodeMap.get(id);
            if (keys !== undefined) {
                for (const key of keys) {
                    const elem = editor.getElementByKey(key);
                    if (elem !== null) {
                        elem.classList.add('selected');
                        changedElems.push(elem);
                        setShowComments(true);
                    }
                }
            }
        }
        return () => {
            for (let i = 0; i < changedElems.length; i++) {
                const changedElem = changedElems[i];
                changedElem.classList.remove('selected');
            }
        };
    }, [activeIDs, editor, markNodeMap]);

    useEffect(() => {
        const markNodeKeysToIDs: Map<NodeKey, Array<string>> = new Map();

        return mergeRegister(
            registerNestedElementResolver<MarkNode>(
                editor,
                MarkNode,
                (from: MarkNode) => {
                    return $createMarkNode(from.getIDs());
                },
                (from: MarkNode, to: MarkNode) => {
                    // Merge the IDs
                    const ids = from.getIDs();
                    ids.forEach((id) => {
                        to.addID(id);
                    });
                }
            ),
            editor.registerMutationListener(MarkNode, (mutations) => {
                editor.getEditorState().read(() => {
                    for (const [key, mutation] of mutations) {
                        const node: null | MarkNode = $getNodeByKey(key);
                        let ids: NodeKey[] = [];

                        if (mutation === 'destroyed') {
                            ids = markNodeKeysToIDs.get(key) || [];
                        } else if ($isMarkNode(node)) {
                            ids = node.getIDs();
                        }

                        for (let i = 0; i < ids.length; i++) {
                            const id = ids[i];
                            let markNodeKeys = markNodeMap.get(id);
                            markNodeKeysToIDs.set(key, ids);

                            if (mutation === 'destroyed') {
                                if (markNodeKeys !== undefined) {
                                    markNodeKeys.delete(key);
                                    if (markNodeKeys.size === 0) {
                                        markNodeMap.delete(id);
                                    }
                                }
                            } else {
                                if (markNodeKeys === undefined) {
                                    markNodeKeys = new Set();
                                    markNodeMap.set(id, markNodeKeys);
                                }
                                if (!markNodeKeys.has(key)) {
                                    markNodeKeys.add(key);
                                }
                            }
                        }
                    }
                });
            }),
            editor.registerUpdateListener(({ editorState, tags }) => {
                editorState.read(() => {
                    const selection = $getSelection();
                    let hasActiveIds = false;
                    let hasAnchorKey = false;

                    if ($isRangeSelection(selection)) {
                        const anchorNode = selection.anchor.getNode();

                        if ($isTextNode(anchorNode)) {
                            const commentIDs = $getMarkIDs(
                                anchorNode,
                                selection.anchor.offset
                            );
                            if (commentIDs !== null) {
                                setActiveIDs(commentIDs);
                                hasActiveIds = true;
                            }
                            if (!selection.isCollapsed()) {
                                setActiveAnchorKey(anchorNode.getKey());
                                hasAnchorKey = true;
                            }
                        }
                    }
                    if (!hasActiveIds) {
                        setActiveIDs((_activeIds) =>
                            _activeIds.length === 0 ? _activeIds : []
                        );
                    }
                    if (!hasAnchorKey) {
                        setActiveAnchorKey(null);
                    }
                });
                if (!tags.has('collaboration')) {
                    setShowCommentInput(false);
                }
            }),
            editor.registerCommand(
                INSERT_INLINE_COMMAND,
                () => {
                    const domSelection = window.getSelection();
                    if (domSelection !== null) {
                        domSelection.removeAllRanges();
                    }
                    setShowCommentInput(true);
                    return true;
                },
                COMMAND_PRIORITY_EDITOR
            )
        );
    }, [editor, markNodeMap]);

    const onAddComment = () => {
        editor.dispatchCommand(INSERT_INLINE_COMMAND, undefined);
    };

    return (
        <>
            {showCommentInput &&
                createPortal(
                    <CommentInputBox
                        editor={editor}
                        cancelAddComment={cancelAddComment}
                        submitAddComment={submitAddComment}
                    />,
                    document.body
                )}
        </>
    );
}
