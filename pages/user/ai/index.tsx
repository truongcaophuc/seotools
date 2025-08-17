import { Box, Button, HStack, StackDivider, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { CategoryService } from '@components/page/user/ai';
import { IOptionSelect, Loading, SearchForm, Select } from '@components/ui';
import { useServiceCategoriesCustomer } from '@share/hooks/service.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useMemo, useState } from 'react';

export default function AiContentDetail() {
    const { t } = useTranslate();
    const [search, setSearch] = useState<string | null>(null);
    const [categorySelect, setCategorySelect] = useState<IOptionSelect | null>(
        null
    );

    const { data, isLoading } = useServiceCategoriesCustomer(search);

    function handleSelectCategory(category: IOptionSelect) {
        setCategorySelect(category);
    }

    function handleResetFilter() {
        setCategorySelect(null);
        setSearch(null);
    }

    const title = t('contents.create_content.title');

    const categoriesData = data?.serviceCategoriesCustomer || [];

    const categories = useMemo(() => {
        if (!categorySelect) return categoriesData;
        return categoriesData.filter((item) => item.id === categorySelect.id);
    }, [categorySelect, categoriesData]);

    const hasFilter = !!search || !!categorySelect;

    return (
        <DashboardLayout
            type="customer"
            title={title}
            breadcrumb={[{ label: title }]}
        >
            <VStack align="stretch" pb="8" pos="relative" spacing="10">
                <HStack spacing="5" align="stretch">
                    <Box>
                        <Select
                            value={categorySelect}
                            onSelect={handleSelectCategory}
                            placeholder={t(
                                'contents.create_content.all_service'
                            )}
                            data={categoriesData.map((item) => ({
                                id: item.id,
                                name: item.title,
                            }))}
                        />
                    </Box>
                    <Box flex="1" maxW="400px">
                        <SearchForm onSearch={setSearch} />
                    </Box>

                    {hasFilter ? (
                        <Button colorScheme="blue" onClick={handleResetFilter}>
                            {t('contents.create_content.reset_filter')}
                        </Button>
                    ) : null}
                </HStack>

                <VStack spacing="10" align="stretch" divider={<StackDivider />}>
                    {isLoading ? <Loading /> : null}

                    {categories.map((item) => (
                        <CategoryService category={item} key={item.id} />
                    ))}
                </VStack>
            </VStack>
        </DashboardLayout>
    );
}
