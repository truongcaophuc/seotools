import { $createHeadingNode } from '@lexical/rich-text';
import { $createParagraphNode } from 'lexical';

type THeading = ReturnType<
    typeof $createHeadingNode | typeof $createParagraphNode
>;

const numberRegex = /[1-9]/;

export function getTypeFormatHeading(
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

    const isAlphabet = firstChild === '###';

    if (isAlphabet) {
        return { heading: $createHeadingNode('h3'), content: value };
    }

    const isNumber = numberRegex.test(firstChild);

    if (isNumber || firstChild === '-') {
        return { heading: $createParagraphNode(), content: value };
    }

    return { heading: $createParagraphNode(), content: value };
}
