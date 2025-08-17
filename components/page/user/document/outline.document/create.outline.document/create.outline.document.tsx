import { Box, Flex, StackDivider, VStack } from '@chakra-ui/react';
import { Loading } from '@components/ui';
import { useDocument } from '@share/hooks/document.hooks';
import { useOutlineStore } from '@share/store/outline.store';
import { useEffect } from 'react';
import { FormCreateOutlineDocument } from './form.create.outline.document';
import { RowOutlineDocument } from './row.outline.document';
import { SuggestOutlineDocument } from './suggest.outline.document';

export function CreateOutlineDocument() {
    const outline = useOutlineStore((state) => state.outline);
    const setOutline = useOutlineStore((state) => state.setOutline);

    const { isLoading, data } = useDocument();

    useEffect(() => {
        if (!isLoading && data) {
            const outline = data?.document?.outline;
            const arrOutline = outline ? JSON.parse(outline) : [];
            setOutline(arrOutline);
        }
    }, [data, isLoading]);

    if (isLoading) {
        return <Loading full={false} />;
    }

    return (
        <Flex h="calc(100vh - 165px)">
            <SuggestOutlineDocument />

            <VStack
                bgColor="white"
                align="stretch"
                borderLeftWidth="1px"
                flex={1}
                overflowY="auto"
            >
                <VStack spacing="4" align="stretch" flex={'1'}>
                    <VStack divider={<StackDivider />} align="stretch">
                        {outline?.map((item) => (
                            <RowOutlineDocument item={item} key={item.id} />
                        ))}
                    </VStack>
                    <Box p="3">
                        <FormCreateOutlineDocument />
                    </Box>
                </VStack>
                {
                    // <HStack bgColor="white" borderTopWidth="1px" p="3">
                    //     <Spacer />
                    //     <SaveOutline />
                    // </HStack>
                }
            </VStack>
        </Flex>
    );
}
