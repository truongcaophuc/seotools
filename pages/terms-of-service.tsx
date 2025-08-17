import { Box, Center, Container, Heading } from '@chakra-ui/react';
import { ContainerHomepageLayout } from '@components/layout/homepage/container.homepage.layout';
import { FooterHomepageLayout } from '@components/layout/homepage/footer.homepage.layout';
import { HeaderHomepageLayout } from '@components/layout/homepage/header.homepage.layout';
import { LevelUpHomepageLayout } from '@components/layout/homepage/level-up.homepage.layout';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function TermsOfService() {
    const { t } = useTranslate();

    return (
        <>
            <HeaderHomepageLayout />
            <Box>
                <ContainerHomepageLayout>
                    <Center py="10">
                        <Heading>{t('termsOfService.heading')}</Heading>
                    </Center>

                    <Container maxW="4xl">
                        {t('termsOfService.content')()}
                    </Container>
                </ContainerHomepageLayout>
            </Box>
            <LevelUpHomepageLayout />
            <FooterHomepageLayout />
        </>
    );
}
