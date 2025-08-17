import { Heading as HeadingUi, HeadingProps } from '@chakra-ui/react';

interface Props extends HeadingProps {}

export function Heading({
    fontSize = 'lg',
    fontWeight = 'semibold',
    ...props
}: Props) {
    return (
        <HeadingUi
            {...props}
            as="h3"
            fontSize={fontSize}
            fontWeight={fontWeight}
        />
    );
}
