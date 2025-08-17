import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { ToolbarPluginV2 } from './plugins/ToolbarPlugin';
import PlaygroundEditorTheme from './themes/PlaygroundEditorTheme';

import { useEffect, useState } from 'react';
import { PlaygroundAutoLinkPlugin } from './plugins/AutoLinkPlugin';
import { CodeHighlightPlugin } from './plugins/CodeHighlightPlugin';
import CommentPlugin from './plugins/CommentPlugin';
import FloatingTextFormatToolbarPlugin from './plugins/FloatingTextFormatToolbarPlugin';
// import { ListMaxIndentLevelPlugin } from './plugins/ListMaxIndentLevelPlugin';
import { CAN_USE_DOM } from './shared/canUseDOM';

import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { useTranslate } from '@share/hooks/translate.hooks';
import { EditorState } from 'lexical';
import { PlaygroundNodes } from './nodes/PlaygroundNodes';
import AutoEmbedPlugin from './plugins/AutoEmbedPlugin/AutoEmbedPlugin';
import { BottomPlugin } from './plugins/BottomPlugin';
import { DraggableBlockPlugin } from './plugins/DraggableBlockPlugin';
import ImagesPlugin from './plugins/ImagesPlugin';
import { PexelsPlugin } from './plugins/PexelsPlugin';
import { TwitterPlugin } from './plugins/TwitterPlugin';
import { YouTubePlugin } from './plugins/YouTubePlugin';

export function Placeholder() {
    const { t } = useTranslate();
    return (
        <div className="editor-placeholder">
            {t('commons.editor.placeholder')}...
        </div>
    );
}

// const EMPTY_CONTENT =
//     '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}';

interface LexicalComposerInitProps {
    content?: string;
    children: JSX.Element | string | (JSX.Element | string)[];
}

export function LexicalComposerInit({
    content,
    children,
}: LexicalComposerInitProps) {
    const editorConfig = {
        // The editor theme
        theme: PlaygroundEditorTheme,
        // Handling of errors during update
        onError(error) {
            throw error;
        },
        namespace: 'Editor',
        // Any custom nodes go here
        nodes: PlaygroundNodes,
        editorState: content,
    };
    return (
        <LexicalComposer initialConfig={editorConfig}>
            {children}
        </LexicalComposer>
    );
}

interface Props {
    onChange: (value: string) => void;
    height?: string;
    isCompact?: boolean;
}

export function Editor({ onChange, height, isCompact }: Props) {
    const [floatingAnchorElem, setFloatingAnchorElem] =
        useState<HTMLDivElement | null>(null);

    const [isSmallWidthViewport, setIsSmallWidthViewport] =
        useState<boolean>(false);

    const onRef = (_floatingAnchorElem: HTMLDivElement) => {
        if (_floatingAnchorElem !== null) {
            setFloatingAnchorElem(_floatingAnchorElem);
        }
    };

    function handleChange(value: EditorState) {
        console.log({ value });
        onChange(JSON.stringify(value.toJSON()));
    }

    useEffect(() => {
        const updateViewPortWidth = () => {
            const isNextSmallWidthViewport =
                CAN_USE_DOM && window.matchMedia('(max-width: 1025px)').matches;

            if (isNextSmallWidthViewport !== isSmallWidthViewport) {
                setIsSmallWidthViewport(isNextSmallWidthViewport);
            }
        };

        window.addEventListener('resize', updateViewPortWidth);

        return () => {
            window.removeEventListener('resize', updateViewPortWidth);
        };
    }, [isSmallWidthViewport]);

    return (
        <div className="editor-container">
            <ToolbarPluginV2 isCompact={isCompact} />
            <div
                style={{
                    position: 'relative',
                    height,
                    background: '#fff',
                }}
                className="editor-shell"
            >
                <RichTextPlugin
                    contentEditable={
                        <div className="editor-inner" ref={onRef}>
                            <ContentEditable className="editor-input" />
                        </div>
                    }
                    placeholder={<Placeholder />}
                    ErrorBoundary={LexicalErrorBoundary}
                />
                <OnChangePlugin onChange={handleChange} />
                <HistoryPlugin />
                <AutoFocusPlugin />
                <CodeHighlightPlugin />
                <ListPlugin />
                <LinkPlugin />
                <PlaygroundAutoLinkPlugin />
                <TablePlugin />
                {/* <ListMaxIndentLevelPlugin maxDepth={7} /> */}
                {/* <MarkdownShortcutPlugin transformers={TRANSFORMERS} /> */}
                <CommentPlugin
                    providerFactory={undefined}
                    // providerFactory={
                    //     // isCollab ? createWebsocketProvider : undefined
                    // }
                />

                <AutoEmbedPlugin />
                <TwitterPlugin />
                <YouTubePlugin />
                <HorizontalRulePlugin />
                <ImagesPlugin />
                <PexelsPlugin />

                {floatingAnchorElem && !isSmallWidthViewport && (
                    <>
                        <FloatingTextFormatToolbarPlugin
                            anchorElem={floatingAnchorElem}
                        />
                        <DraggableBlockPlugin anchorElem={floatingAnchorElem} />
                    </>
                )}
            </div>

            <BottomPlugin />
        </div>
    );
}
