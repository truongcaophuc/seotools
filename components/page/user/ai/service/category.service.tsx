import { Badge, HStack, SimpleGrid, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { CardService } from '@components/ui/service/card.service';
import { ServiceCategoryInfoFragment } from '@generated/graphql/query';

interface Props {
    category: ServiceCategoryInfoFragment;
}

export function CategoryService({ category }: Props) {
    return (
        <VStack spacing="6" align="stretch">
            <HStack>
                <Heading fontSize="2xl">{category.title}</Heading>
                <Badge colorScheme="blue">{category.services.length}</Badge>
            </HStack>
            {category.services.length > 0 ? (
                <SimpleGrid columns={[1, null, 2, 3, 4]} gap={10}>
                    {category.services.map((i) => (
                        <CardService key={i.id} service={i} />
                    ))}
                </SimpleGrid>
            ) : null}
        </VStack>
    );
}
