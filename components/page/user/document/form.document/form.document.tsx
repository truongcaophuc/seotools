import { LexicalComposerInit } from '@components/ui';
import { useDocumentStore } from '@share/store/document.store';
import { LayoutFormDocument } from './layout.form.document';
import { MainFormDocument } from './main.form.document';

export function FormDocument() {
    const document = useDocumentStore((state) => state.document);

    const content = document?.content;

    return (
        <LexicalComposerInit content={content}>
            <LayoutFormDocument>
                <MainFormDocument />
            </LayoutFormDocument>
        </LexicalComposerInit>
    );
}
