import { ContentEditable } from '@lexical/react/LexicalContentEditable';

export function LexicalContentEditable({
    className,
}: {
    className?: string;
}): JSX.Element {
    return <ContentEditable className={className || 'ContentEditable__root'} />;
}
