import { Avatar, Center, Icon, Text, VStack } from '@chakra-ui/react';
import { InboxIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';

export function NoData() {
    const { t } = useTranslate();
    return (
        <Center>
            <VStack py="2">
                <Avatar
                    bgColor="gray.100"
                    icon={<Icon as={InboxIcon} color="gray" boxSize="6" />}
                />
                <Text as="span" color="gray" fontSize="sm">
                    {t('commons.table.no_data')}
                </Text>
            </VStack>
        </Center>
    );
}
