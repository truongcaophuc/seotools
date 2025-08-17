import { $createTextNode, $getRoot, $createParagraphNode } from 'lexical';
import { cloneElement, ReactElement } from 'react';
import { $createHeadingNode } from '@lexical/rich-text';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { getTypeFormatHeading } from '@share/helps/formatMdToContentEditor';

interface Props {
    children: ReactElement;
    outline: string;
}

const romanRegex = /^[XVI]+$/;
const alphabetRegex = /[A-Z]/;
const numberRegex = /[1-9]/;
const markdownRegex = /[\#]+\W/;

function formatOutline(outline: string) {
    const arrOutline = outline
        .split('\n')
        .map((item) => item.trim())
        .filter((i) => i.length > 0);

    return arrOutline;
}
type THeading = ReturnType<
    typeof $createHeadingNode | typeof $createParagraphNode
>;

//TODO: fix

export function getTypeFormatHeading1(
    value: string
): { heading: THeading; content: string } | undefined {
    const arrStr = value.split(' ');
    const firstChild = arrStr[0];

    const contentHeading = arrStr.slice(1).join(' ');

    const isH1 = firstChild === '#';

    if (isH1) {
        return { heading: $createHeadingNode('h1'), content: contentHeading };
    }

    // const isH2 = romanRegex.test(firstChild);
    const isH2 = firstChild === '##';

    if (isH2) {
        return {
            heading: $createHeadingNode('h2'),
            content: contentHeading,
        };
    }

    // const isAlphabet = alphabetRegex.test(firstChild);

    const isAlphabet = firstChild === '-';

    if (isAlphabet) {
        return { heading: $createHeadingNode('h3'), content: value };
    }

    const isNumber = numberRegex.test(firstChild);

    if (isNumber || firstChild === '-') {
        return { heading: $createParagraphNode(), content: value };
    }

    return;
}

export function CopyOutlineDocument({ children, outline }: Props) {
    const [editor] = useLexicalComposerContext();

    function handleClick() {
        const arrOutline = formatOutline(outline);

        editor.update(() => {
            const root = $getRoot();

            for (let item of arrOutline) {
                let { heading, content } = getTypeFormatHeading(item);
                if (heading) {
                    heading.append($createTextNode(content));
                    root.append(heading);
                }
            }
        });
    }

    return cloneElement(children, { onClick: handleClick });
}
