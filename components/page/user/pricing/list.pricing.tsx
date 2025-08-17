import { SimpleGrid } from '@chakra-ui/react';
import { Loading } from '@components/ui';
import { usePricing } from '@share/hooks/package.hooks';
import { CardPackagePricing } from './card.package.pricing';

export function ListPricing() {
    const { isLoading, data } = usePricing();

    if (isLoading) return <Loading />;

    const packages = data?.pricing?.packages || [];

    return (
        <SimpleGrid columns={2} spacing="10">
            {packages.map((item) => {
                return <CardPackagePricing packageValue={item} key={item.id} />;
            })}
        </SimpleGrid>
    );
}
