import { List, ListItem, Text, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { PackageItemInfoFragment } from '@generated/graphql/query';
import { formatMoney } from '@share/helps/format-number';

interface Props {
    packageItem: PackageItemInfoFragment;
}

export function PackageItemPricing({ packageItem }: Props) {
    const content = packageItem.content || '';
    const contentList = content.split('\n');
    return (
        <VStack align="stretch" key={packageItem.id}>
            <VStack spacing="0" px="5" py="3">
                <Heading fontSize="md" color="" textTransform="uppercase">
                    {packageItem?.packagePeriod?.name}
                </Heading>
                <Text fontSize="sm" color="gray.500">
                    {formatMoney(packageItem?.price)}
                </Text>
            </VStack>

            <VStack>
                <Text
                    fontSize="xs"
                    textTransform="uppercase"
                    fontWeight="semibold"
                    color="blue.600"
                >
                    Chi tiết
                </Text>
                <List maxW="300px">
                    {contentList.map((t) => (
                        <ListItem
                            borderBottomWidth="1px"
                            borderStyle="dashed"
                            py="6px"
                            textAlign="center"
                            key={t}
                            fontSize="xs"
                            color="gray.500"
                            fontWeight="medium"
                        >
                            {t}
                        </ListItem>
                    ))}
                </List>
            </VStack>
        </VStack>
    );
}
