import { Button, Center, Text, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { useConnectFacebookPage } from '@share/hooks/channel.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { signIn } from 'next-auth/react';

export function LoginFacebook() {
    const { t } = useTranslate();
    const { mutate } = useConnectFacebookPage();

    function handleLogin() {
        signIn('facebook').then(() => {
            mutate(null);
        });
    }

    return (
        <Center>
            <VStack maxW="sm" py="8">
                <Heading>{t('utilities.facebook.title')}</Heading>
                <Text fontSize="sm" textAlign="center" color="gray.500">
                    {t('utilities.facebook.content')}
                </Text>
                <Button onClick={handleLogin} colorScheme="facebook">
                    {t('utilities.facebook.connect')}
                </Button>
            </VStack>
        </Center>
    );
}
