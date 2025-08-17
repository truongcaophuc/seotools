import { Text, TextProps } from '@chakra-ui/react';

interface Props extends Partial<TextProps> {}

export function ContentStream(props: Props) {
    return (
        <Text
            rounded="md"
            p="5"
            lineHeight="7"
            fontSize="sm"
            fontWeight="semibold"
            borderWidth="1px"
            whiteSpace="pre-line"
            {...props}
        ></Text>
    );
}
