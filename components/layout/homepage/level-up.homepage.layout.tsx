import { Avatar, Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ContainerHomepageLayout } from './container.homepage.layout';
import {
    HeadingHomepageLayout,
    HeadingTextHomepageLayout,
} from './heading.homepage.layout';

export function LevelUpHomepageLayout() {
    const { t } = useTranslate();

    const list_content = [
        t('homepage.level_up.list.no_credit'),
        t('homepage.level_up.list.free_word'),
    ];

    return (
        <Box pt="12" pb="20">
            <ContainerHomepageLayout>
                <Box rounded="xl" bgColor="gray.100">
                    <VStack
                        textAlign="center"
                        spacing="4"
                        py="16"
                        maxW="2xl"
                        mx="auto"
                    >
                        <HeadingHomepageLayout textAlign="center">
                            {t('homepage.level_up.title')}
                        </HeadingHomepageLayout>

                        <HeadingTextHomepageLayout>
                            {t('homepage.level_up.paragraph')}
                        </HeadingTextHomepageLayout>

                        <Button
                            rightIcon={<HeroIcon as={ChevronRightIcon} />}
                            colorScheme=""
                            bgColor="brand"
                            size="lg"
                            rounded="full"
                        >
                            {t('homepage.level_up.btn')}
                        </Button>
                        <HStack spacing="10" pt="10">
                            {list_content.map((item) => (
                                <HStack key={item} spacing="4">
                                    <Avatar
                                        w="40px"
                                        h="40px"
                                        borderColor="brand_light"
                                        borderWidth="1px"
                                        bgColor="pink.100"
                                        color="brand"
                                        icon={<HeroIcon as={CheckIcon} />}
                                    />
                                    <Text
                                        as="span"
                                        color="gray.600"
                                        fontWeight="medium"
                                    >
                                        {item}
                                    </Text>
                                </HStack>
                            ))}
                        </HStack>
                    </VStack>
                </Box>
            </ContainerHomepageLayout>
        </Box>
    );
}
