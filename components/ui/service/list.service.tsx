import { SimpleGrid } from '@chakra-ui/react';
import { Loading } from '@components/ui';
import { ServiceInfoFragment } from '@generated/graphql/query';
import { CardService } from './card.service';

interface Props {
    services: ServiceInfoFragment[];
    isLoading?: boolean;
}

export function ListService({ services, isLoading }: Props) {
    if (isLoading) {
        return <Loading />;
    }

    return (
        <SimpleGrid columns={[1, 2, 3]} gap="6">
            {services.map((item) => (
                <CardService service={item} key={item.id} />
            ))}
        </SimpleGrid>
    );
}
