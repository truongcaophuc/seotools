import { Heading, HeadingProps, Text, TextProps } from '@chakra-ui/react';

interface Props extends HeadingProps {}

export function HeadingHomepageLayout(props: Props) {
    return <Heading {...props} fontSize={['2xl', null, null, '5xl']} />;
}

interface HeadingTextProps extends TextProps {}

export function HeadingTextHomepageLayout(props: HeadingTextProps) {
    return (
        <Text {...props} fontSize={['md', null, null, 'xl']} color="gray.600" />
    );
}
