import { Box, Button, Center, StackDivider, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { PackageInfoFragment } from '@generated/graphql/query';
import { packageTypes } from '@share/helps/workspace';
import { PackageItemPricing } from './package-item.pricing';
import { UpgradePricing } from './upgrade.pricing';

interface Props {
    packageValue: PackageInfoFragment;
}

export function CardPackagePricing({ packageValue }: Props) {
    const { color } = packageTypes[packageValue.type];
    const bgColor = `${color}.500`;
    const colorScheme = color;
    return (
        <Box
            rounded="md"
            borderWidth="1px"
            borderColor={bgColor}
            overflow="hidden"
        >
            <Center bgColor={bgColor} borderBottomWidth="1px">
                <Heading fontSize="3xl" color="white" py="3">
                    {packageValue.name}
                </Heading>
            </Center>
            <VStack align="stretch" divider={<StackDivider />} spacing="5">
                {packageValue.packageItems.map((packageItem) => {
                    const content = packageItem.content || '';
                    const contentList = content.split('\n');
                    return (
                        <PackageItemPricing
                            key={packageItem.id}
                            packageItem={packageItem}
                        />
                    );
                })}
            </VStack>
            <Center mt="4" borderTopWidth="1px" py="3">
                <UpgradePricing package={packageValue}>
                    <Button minW="200px" colorScheme={colorScheme}>
                        Nâng cấp
                    </Button>
                </UpgradePricing>
            </Center>
        </Box>
    );
}
