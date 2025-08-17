import { VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { ListRequestHistoryWorkspace } from './list.request-history.workspace';

export function RequestHistoryWorkspace() {
    return (
        <VStack spacing="5" align="stretch">
            <Heading>Lịch sử</Heading>
            <ListRequestHistoryWorkspace />
        </VStack>
    );
}
