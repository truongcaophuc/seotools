import { HStack, Icon, IconButton, MenuItem, Spacer } from '@chakra-ui/react';
import { Card, MenuAction, SearchForm, Table, TColumn } from '@components/ui';
import { ServiceCategoryInfoFragment } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useServiceCategories } from '@share/hooks/service.hooks';
import Link from 'next/link';
import { useState } from 'react';
import { DeleteCategoryService } from './delete.category.servive';
import { EditCategoryService } from './edit.category.service';
import { NewCategoryService } from './new.category.service';

const columns: TColumn<ServiceCategoryInfoFragment> = [
    { key: 'title', dataIndex: 'title', label: 'Tên' },
    { key: 'order', dataIndex: 'order', label: 'Thứ tự' },
    {
        key: 'createdAt',
        dataIndex: 'createdAt',
        label: 'Ngày tạo',
        render: formatDate,
    },
    {
        key: 'action',
        dataIndex: 'id',
        label: '',
        isNumberic: true,
        render: (id, root) => (
            <>
                <MenuAction>
                    <>
                        <MenuItem as={Link} href={`/dashboard/category/${id}`}>
                            Chi tiết
                        </MenuItem>
                        <EditCategoryService category={root}>
                            <MenuItem>Chỉnh sửa</MenuItem>
                        </EditCategoryService>

                        <DeleteCategoryService id={id}>
                            <MenuItem>Xoá</MenuItem>
                        </DeleteCategoryService>
                    </>
                </MenuAction>
            </>
        ),
    },
];

export function CategoriesService() {
    const { page, perPage, setPage, setPerPage } = usePagination();
    const [search, setSearch] = useState<string>();
    const { data, isLoading } = useServiceCategories({ page, perPage, search });

    return (
        <Card
            bgColor="white"
            bodyProps={{
                p: 0,
            }}
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={setSearch} />
                        <Spacer />
                        <NewCategoryService>
                            <IconButton
                                icon={<Icon as={PlusIcon} boxSize="5" />}
                                aria-label="Add"
                            />
                        </NewCategoryService>
                    </HStack>
                ),
            }}
        >
            <Table
                isLoading={isLoading}
                columns={columns}
                data={data?.serviceCategories.data}
                pagination={{
                    values: data?.serviceCategories?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
