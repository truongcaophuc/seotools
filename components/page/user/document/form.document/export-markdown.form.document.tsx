import { $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useDocumentStore } from '@share/store/document.store';
import moment from 'moment';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
}

export function ExportMarkdownFormDocument({ children }: Props) {
    const documentData = useDocumentStore((state) => state.document);
    const [editor] = useLexicalComposerContext();
    function handleClick() {
        editor.getEditorState().read(() => {
            const markdown = $convertToMarkdownString(TRANSFORMERS);

            console.log({ markdown });

            const file = new Blob([markdown], { type: 'text/markdown' });

            const link =
                typeof document !== undefined
                    ? document.createElement('a')
                    : null;
            link.href = window.URL.createObjectURL(file);
            const name =
                documentData?.title ||
                `Bài viết ${moment().format('DD MM YYYY')}`;
            link.download = `${name}.md`;
            link.click();
        });

        const editorState = editor.getEditorState();
        const json = editorState.toJSON();

        console.log({ json });
    }

    return cloneElement(children, { onClick: handleClick });
}
