import { mergeRegister, registerNestedElementResolver } from '@lexical/utils';
import {
    $getNodeByKey,
    $getSelection,
    $isRangeSelection,
    $isTextNode,
    COMMAND_PRIORITY_EDITOR,
    LexicalEditor,
    NodeKey,
} from 'lexical';
import { useEffect, useMemo, useState } from 'react';
import { createPortal } from 'react-dom';
import useModal from '../../hooks/useModal';

import {
    Box,
    Button,
    Center,
    HStack,
    IconButton,
    IconButtonProps,
    VStack,
} from '@chakra-ui/react';
import { SearchForm } from '@components/ui/form';
import { Loading } from '@components/ui/loading';
import { Modal } from '@components/ui/modal';
import {
    $createMarkNode,
    $getMarkIDs,
    $isMarkNode,
    MarkNode,
} from '@lexical/mark';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { usePagination } from '@share/hooks/pagination.hooks';
import { usePexelsPhotos } from '@share/hooks/pexels.hook';
import { Gallery } from '../../ui/Gallery';
import { INSERT_INLINE_PEXELS } from '../FloatingRewritePlugin';
import { InsertImagePayload, INSERT_IMAGE_COMMAND } from '../ImagesPlugin';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { HeroIcon } from '@components/ui/icon';

export function PexelsPlugin() {
    const [isShow, setIsShow] = useState<boolean>(false);
    const [editor] = useLexicalComposerContext();
    const [activeIDs, setActiveIDs] = useState<Array<string>>([]);
    const [activeAnchorKey, setActiveAnchorKey] = useState<NodeKey | null>();

    const markNodeMap = useMemo<Map<string, Set<NodeKey>>>(() => {
        return new Map();
    }, []);

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
                        setIsShow(true);
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
                    setIsShow(false);
                }
            }),
            editor.registerCommand(
                INSERT_INLINE_PEXELS,
                () => {
                    const domSelection = window.getSelection();
                    if (domSelection !== null) {
                        domSelection.removeAllRanges();
                    }
                    setIsShow(true);
                    return true;
                },
                COMMAND_PRIORITY_EDITOR
            )
        );
    }, [editor, markNodeMap]);

    return (
        <>
            {isShow &&
                createPortal(
                    <Modal
                        title="Tìm kiếm hình ảnh"
                        isOpen
                        size="full"
                        onClose={() => setIsShow(false)}
                    >
                        <PexelsPhotoSearchComp
                            editor={editor}
                            onClose={() => setIsShow(false)}
                        />
                    </Modal>,
                    document.body
                )}
        </>
    );
}

type PaginationBtnProps = IconButtonProps & { btnType: 'next' | 'prev' };

function PaginationBtn({ btnType, ...props }: PaginationBtnProps) {
    const icon = btnType === 'next' ? ChevronRightIcon : ChevronLeftIcon;

    return <IconButton icon={<HeroIcon as={icon} />} {...props} />;
}

function PexelsPhotoSearchComp({
    editor,
    onClose,
}: {
    editor: LexicalEditor;
    onClose: () => void;
}) {
    const [search, setSearch] = useState<string>();
    const { page, perPage, setPage } = usePagination();
    const { isLoading, data } = usePexelsPhotos({ search, page, perPage });

    function handleSelectImage(value: InsertImagePayload) {
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, value);
    }

    function handlePrev() {
        setPage(page - 1);
    }

    function handleNext() {
        setPage(page + 1);
    }

    useEffect(() => {
        function getSelectText() {
            editor.getEditorState().read(() => {
                const selection = $getSelection();

                if (selection) {
                    let textContentNode = selection.getTextContent();

                    setSearch(textContentNode);
                }
            });
        }
        getSelectText();
    }, [editor]);

    const images = data?.pexelsPhotos?.data || [];
    const totalImages = data?.pexelsPhotos?.pagination?.total || 0;

    const totalPage = Math.ceil(totalImages / perPage);

    return (
        <VStack spacing="5" h="calc(100vh - 100px)" align="stretch">
            <Box maxW="md">
                <SearchForm onSearch={setSearch} defaultValue={search} />
            </Box>

            <Box flex="1">
                {isLoading && search?.length > 0 ? (
                    <Center h="full">
                        <Loading />
                    </Center>
                ) : (
                    <Gallery
                        images={images}
                        onSelectImage={handleSelectImage}
                    />
                )}
            </Box>

            <HStack as={Center}>
                <PaginationBtn
                    aria-label="Prev"
                    btnType="prev"
                    isDisabled={page === 1}
                    onClick={handlePrev}
                />
                <PaginationBtn
                    aria-label="Next"
                    btnType="next"
                    isDisabled={page === totalPage}
                    onClick={handleNext}
                />
            </HStack>
        </VStack>
    );
}
