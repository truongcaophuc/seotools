import { SimpleGrid, StackDivider, VStack } from '@chakra-ui/react';
import { Empty, Loading } from '@components/ui';
import { Pagination, PaginationProps } from '@components/ui/pagination';
import { ImageInfoFragment } from '@generated/graphql/query';
import { CardImage } from './card.image';

interface Props {
    data: Array<ImageInfoFragment>;
    isLoading: boolean;
    pagination: PaginationProps;
}

export function GridImage({ data = [], isLoading, pagination }: Props) {
    if (isLoading) {
        return <Loading />;
    }

    if (data.length === 0) {
        return <Empty />;
    }

    return (
        <VStack align="stretch" divider={<StackDivider />} spacing="4">
            <SimpleGrid columns={7} gap="6">
                {data.map((item) => (
                    <CardImage key={item.id} image={item} />
                ))}
            </SimpleGrid>
            <Pagination {...pagination} />
        </VStack>
    );
}
