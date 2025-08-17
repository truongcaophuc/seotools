import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { Heading } from '../heading';

export function NotPremium() {
    const { t } = useTranslate();

    return (
        <Center minH="360px">
            <VStack maxW="360px" spacing="3">
                <Heading fontSize="2xl">
                    {t('research.warning.permission.title')}
                </Heading>
                <Text color="gray.600" textAlign="center">
                    {t('research.warning.permission.message')}
                </Text>

                <Button colorScheme="blue" as={Link} href="/user/pricing">
                    {t('commons.upgrade')}
                </Button>
            </VStack>
        </Center>
    );
}
