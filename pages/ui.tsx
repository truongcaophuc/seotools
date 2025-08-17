// import { Editor, LexicalComposerInit } from '@components/ui';
import dynamic from 'next/dynamic';

const EditorImage = dynamic(
    () => import('@components/ui/image/editor.image/editor.image'),
    { ssr: false }
);

export default function UI() {
    return (
        <>
            <EditorImage source="https://seobox-hilab.s3.ap-southeast-1.amazonaws.com/seobox-hilab-6741071052-Group 805.jpg" />
            {
                // <LexicalComposerInit>
                //     <Editor onChange={() => {}} />
                // </LexicalComposerInit>
            }
        </>
    );
}
