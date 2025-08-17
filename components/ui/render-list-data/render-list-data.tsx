import { Center, SimpleGrid, StackDivider, VStack } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { Card } from '../card';
import { Empty } from '../empty';
import { Loading } from '../loading';
import { Pagination, PaginationProps } from '../pagination';
import { Table, TColumn } from '../table';
import { TViewType } from '../view-type';

interface Props<T> {
    viewType: TViewType;
    isLoading?: boolean;
    data: Array<T>;
    columns: TColumn<T>;
    renderItems: () => Array<ReactNode>;
    pagination: PaginationProps;
    numberColumn?: number;
}

export function RenderListData<T>({
    viewType,
    renderItems,
    isLoading,
    data = [],
    pagination,
    columns,
    numberColumn = 7,
}: Props<T>) {
    if (viewType === 'grid') {
        if (isLoading) {
            return (
                <Center py="8">
                    <Loading />
                </Center>
            );
        }

        if (data.length === 0) {
            return <Empty />;
        }

        return (
            <VStack align="stretch" divider={<StackDivider />} spacing="4">
                <SimpleGrid columns={[2, null, 3, 4, numberColumn]} gap="6">
                    {renderItems()}
                </SimpleGrid>

                <Pagination {...pagination} />
            </VStack>
        );
    }

    return (
        <Card
            bodyProps={{
                p: 0,
            }}
        >
            <Table
                isNo
                columns={columns}
                data={data}
                pagination={pagination}
                isLoading={isLoading}
            />
        </Card>
    );
}
