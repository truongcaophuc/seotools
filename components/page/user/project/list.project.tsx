import { Button, HStack, Icon, Spacer } from '@chakra-ui/react';
import { Card, SearchForm } from '@components/ui';
import { UserRole } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useUserRole } from '@share/hooks/account.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useProjects } from '@share/hooks/project.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useState } from 'react';
import { AddProject } from './add.project';
import { TableProject } from './table.project';

export function ListProject() {
    const { t } = useTranslate();
    const role = useUserRole();
    const [search, setSearch] = useState<string>();
    const { page, setPage, perPage, setPerPage } = usePagination();
    const { isLoading, data } = useProjects({ page, perPage, search });

    const isUser = role === UserRole.User;

    return (
        <Card
            bodyProps={{ p: 0 }}
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={setSearch} />
                        <Spacer />

                        {isUser ? (
                            <AddProject>
                                <Button
                                    colorScheme="blue"
                                    leftIcon={<Icon as={PlusIcon} />}
                                >
                                    {t('commons.add')}
                                </Button>
                            </AddProject>
                        ) : null}
                    </HStack>
                ),
            }}
        >
            <TableProject
                isLoading={isLoading}
                data={data?.projects?.data}
                pagination={{
                    values: data?.projects.pagination,
                    onChangePerPage: setPerPage,
                    onChangePage: setPage,
                }}
                isNo
            />
        </Card>
    );
}
