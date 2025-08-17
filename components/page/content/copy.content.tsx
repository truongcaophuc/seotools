import { Copy } from '@components/ui';
import { ReactElement } from 'react';
import { useParseContentDocument } from '@share/hooks/document.hooks';

interface Props {
    children: ReactElement;
    type: 'text' | 'html';
}
export function CopyContent({ children, type }: Props) {
    const { editorStateHtml, editorStateTextString } =
        useParseContentDocument();

    const content = type === 'html' ? editorStateHtml : editorStateTextString;

    return <Copy content={content}>{children}</Copy>;
}
