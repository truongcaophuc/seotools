import { Box, HStack, Text } from '@chakra-ui/react';
import { ActionTreeOutlineDocument } from './action.tree.outline.document';

export function SubTTreeOutlineItem({ text }: { text: string }) {
    return (
        <Box bgColor="white" rounded="md">
            <HStack boxShadow="sm" p="2">
                <Text flex={1} fontSize="sm" rounded="md">
                    {text}
                </Text>

                <ActionTreeOutlineDocument
                    text={text}
                    // onCreateContent={handleRequestContent}
                />
            </HStack>

            {/* {renderContent()} */}
        </Box>
    );
}
