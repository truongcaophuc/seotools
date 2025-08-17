import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useTranslate } from '@share/hooks/translate.hooks';
import { $getRoot } from 'lexical';

export function BottomPlugin() {
    const { t } = useTranslate();
    const [editor] = useLexicalComposerContext();

    const editorState = editor.getEditorState();

    const wordCount = editorState.read(
        () => $getRoot().getTextContent().split(' ').length
    );

    const characterCount = editorState.read(() =>
        $getRoot().getTextContentSize()
    );

    return (
        <div className="BottomPlugin">
            <span>
                {wordCount} {t('commons.editor.word')}
            </span>
            <span>
                {characterCount} {t('commons.editor.character')}
            </span>
        </div>
    );
}
