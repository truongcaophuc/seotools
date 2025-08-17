import { Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { useServiceCategories } from '@share/hooks/service.hooks';
import { useUserOverviewStore } from './oveview.store';
import { TabCategoryService } from './tab.category-service';

export function TabsCategoryService() {
    const { data } = useServiceCategories({ page: 1, perPage: 50 });

    return (
        <VStack bgColor="blue.900" py="6" color="white" rounded="md">
            <Heading as="h3" py="12">
                What would you like to do?
            </Heading>

            <HStack spacing="6">
                <TabCategoryService label="All" />

                {data?.serviceCategories.data.map((item) => (
                    <TabCategoryService
                        key={item.id}
                        label={item.title}
                        id={item.id}
                    />
                ))}
            </HStack>
        </VStack>
    );
}
