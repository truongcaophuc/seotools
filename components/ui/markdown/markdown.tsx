import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Props {
    content?: string;
}

export function Markdown({ content }: Props) {
    return (
        <ReactMarkdown
            className="markdown-body"
            children={content}
            remarkPlugins={[remarkGfm]}
        />
    );
}
