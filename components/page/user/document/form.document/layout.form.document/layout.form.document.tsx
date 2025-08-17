import { Box, Flex } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { HeadingFormDocument } from '../heading.form.document';
import { SidebarFormDocument } from '../sidebar.form.document';
import { useLayoutFormDocumentStore } from './store.layout.form.document';

interface Props {
    children: ReactNode;
}

export function LayoutFormDocument({ children }: Props) {
    const isOpen = useLayoutFormDocumentStore((state) => state.isOpen);

    return (
        <Flex flexDir="column">
            <HeadingFormDocument />

            <Flex flex="1">
                <Box flex="1">{children}</Box>
                {isOpen ? (
                    <Box
                        w="full"
                        maxW="380px"
                        bgColor="white"
                        borderLeftWidth="1px"
                        overflowY="auto"
                        flexShrink={0}
                    >
                        <SidebarFormDocument />
                    </Box>
                ) : null}
            </Flex>
        </Flex>
    );
}
