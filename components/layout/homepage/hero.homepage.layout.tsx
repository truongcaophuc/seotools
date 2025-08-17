import {
    Box,
    Button,
    Center,
    Divider,
    Heading,
    Text,
    VStack,
} from '@chakra-ui/react';
import { ContainerHomepageLayout } from './container.homepage.layout';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { HeroIcon } from '@components/ui';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

export function HeroHomepageLayout() {
    const { t } = useTranslate();

    return (
        <Box py={[10]}>
            <ContainerHomepageLayout>
                <Center minH="calc(100vh - 400px)">
                    <VStack maxW="5xl" mx="auto" spacing="7">
                        <Heading
                            fontSize={['4xl', null, null, '6xl']}
                            textAlign="center"
                        >
                            {t('homepage.hero.heading')}
                        </Heading>

                        <Text
                            fontSize="2xl"
                            maxW="3xl"
                            color="gray.600"
                            mx="auto"
                            textAlign="center"
                        >
                            {t('homepage.hero.paragraph')}
                        </Text>

                        <VStack textAlign="center" spacing="5">
                            <Text color="gray.700" fontWeight="semibold">
                                {t('homepage.hero.register.title')}
                            </Text>
                            <Button
                                rounded="full"
                                maxW="250px"
                                w="full"
                                colorScheme=""
                                bgColor="brand"
                                size="lg"
                                as={Link}
                                href="/signup/verify"
                                rightIcon={<HeroIcon as={ChevronRightIcon} />}
                            >
                                {t('homepage.hero.register.label')}
                            </Button>
                            <Divider />
                            <Text fontWeight="semibold" color="gray.500">
                                {t('homepage.hero.login.title')}
                            </Text>
                            <Button
                                rounded="full"
                                maxW="250px"
                                w="full"
                                size="lg"
                                colorScheme="blue"
                                as={Link}
                                href="/login"
                            >
                                {t('homepage.hero.login.label')}
                            </Button>
                        </VStack>
                    </VStack>
                </Center>
            </ContainerHomepageLayout>
        </Box>
    );
}
