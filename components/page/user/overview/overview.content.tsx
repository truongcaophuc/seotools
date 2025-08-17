import { VStack } from '@chakra-ui/react';
import { ListServiceOverViewUser } from './list-service.overview.user';
import { TabsCategoryService } from './tabs.category-service';

export function ContentOverviewUser() {
    return (
        <VStack align="stretch" spacing="6">
            <TabsCategoryService />
            <ListServiceOverViewUser />
        </VStack>
    );
}
