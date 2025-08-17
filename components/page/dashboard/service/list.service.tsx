import { HStack, Icon, IconButton, Spacer } from '@chakra-ui/react';
import { Card, SearchForm } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useServicesDashboard } from '@share/hooks/service.hooks';
import { useState } from 'react';
import { NewService } from './new.service';
import { TableService } from './table.service';

export function ListService() {
    const { page, setPage, perPage, setPerPage } = usePagination();
    const [search, setSearch] = useState<string>();
    const { isLoading, data } = useServicesDashboard({ page, perPage, search });

    return (
        <Card
            bodyProps={{ p: 0 }}
            bgColor="white"
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={setSearch} />
                        <Spacer />
                        <NewService>
                            <IconButton
                                colorScheme="blue"
                                icon={<Icon as={PlusIcon} />}
                                aria-label="add"
                            />
                        </NewService>
                    </HStack>
                ),
            }}
        >
            <TableService
                isLoading={isLoading}
                data={data?.servicesDashboard.data}
                pagination={{
                    values: data?.servicesDashboard?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
