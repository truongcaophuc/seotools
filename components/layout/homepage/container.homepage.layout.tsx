import { Container } from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

export function ContainerHomepageLayout({ children }: Props) {
    return <Container maxW="7xl">{children}</Container>;
}
