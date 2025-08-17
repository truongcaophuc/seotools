import { Box, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { useDashboardStore } from '@components/layout/dashboard/dashboard.store';
import { Editor } from '@components/ui';
import { useDocumentStore } from '@share/store/document.store';
import { TreeOutlineDocument } from '../outline.document';

export function EditorFormDocument() {
    const { isOpen, onToggle } = useDisclosure();
    const document = useDocumentStore((state) => state.document);
    const changeContentDocument = useDocumentStore(
        (state) => state.changeContentDocument
    );
    const isShowWarning = useDashboardStore((state) => state.isShowWarning);

    const handleChange = (value: string) => {
        changeContentDocument(value);
    };

    const HEIGHT = isShowWarning
        ? 'calc(100vh - 232px - 41px'
        : 'calc(100vh - 232px)';

    const HEIGHT_OUTLINE = isShowWarning
        ? 'calc(100vh - 160px -41px)'
        : 'calc(100vh - 160px)';

    return (
        <Box pos="relative">
            {isOpen && document?.title && document.title.length > 0 ? null : (
                <Box
                    pos="absolute"
                    zIndex="10"
                    top="40%"
                    left="-28px"
                    transform="rotate(90deg)"
                    transformOrigin="center"
                    cursor="pointer"
                    onClick={onToggle}
                    bgColor="green.500"
                    color="white"
                    roundedTop="md"
                >
                    <Text
                        textTransform="uppercase"
                        fontSize="sm"
                        fontWeight="medium"
                        transformOrigin="center"
                        px="2"
                    >
                        Outline
                    </Text>
                </Box>
            )}
            <Flex>
                {isOpen ? (
                    <Box
                        borderRightWidth="1px"
                        width="500px"
                        overflowY="auto"
                        pb="8"
                        h={HEIGHT_OUTLINE}
                    >
                        <TreeOutlineDocument onToggle={onToggle} />
                    </Box>
                ) : null}
                <Box flex="1">
                    <Editor height={HEIGHT} onChange={handleChange} />
                </Box>
            </Flex>
        </Box>
    );
}
