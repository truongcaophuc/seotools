import { Button, HStack, Spacer } from '@chakra-ui/react';
import { Card, HeroIcon, SearchForm } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useKeywords } from '@share/hooks/keyword.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useState } from 'react';
import { AddKeyword } from './add.keyword';
import { TableKeyword } from './table.keyword';

export function ListKeyword() {
    const [search, setSearch] = useState<string>();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const { isLoading, data } = useKeywords({
        page,
        perPage,
        search,
    });

    const { t } = useTranslate();

    return (
        <Card
            bodyProps={{ p: 0 }}
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={setSearch} />
                        <Spacer />
                        <AddKeyword>
                            <Button
                                colorScheme="blue"
                                leftIcon={<HeroIcon as={PlusIcon} />}
                                aria-label="Add keyword"
                            >
                                {t('commons.add')}
                            </Button>
                        </AddKeyword>
                    </HStack>
                ),
            }}
        >
            <TableKeyword
                data={data?.keywords?.data}
                isLoading={isLoading}
                pagination={{
                    values: data?.keywords?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
