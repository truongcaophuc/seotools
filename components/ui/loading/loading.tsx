import { Center, CenterProps, Spinner } from '@chakra-ui/react';

interface Props {
    full?: boolean;
}

export function Loading({ full }: Props) {
    let props: CenterProps = {
        w: full ? '100%' : 'unset',
        h: full ? '100%' : 'unset',
        pos: full ? 'fixed' : 'relative',
        top: full ? '0' : 'unset',
        left: full ? '0' : 'unset',
        zIndex: 20,
    };

    return (
        <Center {...props}>
            <Spinner color="gray.500" />
        </Center>
    );
}
