import {
    Box,
    Button,
    Center,
    HStack,
    SimpleGrid,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Card, HeroIcon } from '@components/ui';
import { CheckIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { formatMoney } from '@share/helps/format-number';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ContainerHomepageLayout } from './container.homepage.layout';
import { HeadingHomepageLayout } from './heading.homepage.layout';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';

type TPeriod = 'month' | 'year';

interface IPricing {
    id: string;
    label: string;
    text: string;
    price: {
        [key in TPeriod]: number;
    };
    labelBtn: string;
    features: {
        [key in TPeriod]: Array<string>;
    };
}

function CardPricing({
    pricing,
    period,
}: {
    pricing: IPricing;
    period: TPeriod;
}) {
    const { t } = useTranslate();
    const idFree = pricing.id === 'free';
    const freeTime = `${period === 'month' ? 2 : 6} ${t(
        'homepage.pricing.card.free_time'
    )}`;

    return (
        <Card
            boxShadow="none"
            borderColor="gray.100"
            bodyProps={{ p: 8 }}
            borderWidth="3px"
            _hover={{
                borderColor: 'brand',
            }}
        >
            <VStack align="stretch" spacing="0">
                <Text fontSize="lg" fontWeight="bold">
                    {pricing.label}
                </Text>
                <Text
                    as="span"
                    fontSize="sm"
                    color="gray.500"
                    fontWeight="medium"
                >
                    {idFree ? pricing.text : freeTime}
                </Text>
            </VStack>
            <VStack py="6">
                <HStack color="gray.600" align="flex-end" spacing="1">
                    <Text
                        lineHeight="1"
                        as="span"
                        fontSize="4xl"
                        fontWeight="bold"
                    >
                        {formatMoney(pricing.price[period], '')}
                        <Text as="span" fontWeight="medium" fontSize="md">
                            vnd
                        </Text>
                    </Text>
                </HStack>
                {pricing.id !== 'free' ? (
                    <Text fontWeight="semibold" fontSize="lg" color="gray.400">
                        {period === 'year'
                            ? t('homepage.pricing.card.a_year')
                            : t('homepage.pricing.card.six_month')}
                    </Text>
                ) : (
                    <Box h="30px"></Box>
                )}
            </VStack>

            {pricing.id === 'free' ? (
                <Button
                    size="lg"
                    rounded="xl"
                    w="full"
                    fontSize="md"
                    variant="outline"
                    borderColor="brand"
                    color="brand"
                    as={Link}
                    href="/signup/verify"
                    _hover={{
                        color: 'white',
                        bgColor: 'brand_light',
                        borderColor: 'brand_light',
                    }}
                    rightIcon={<HeroIcon as={ChevronRightIcon} />}
                >
                    {pricing.labelBtn}
                </Button>
            ) : (
                <Button
                    as={Link}
                    size="lg"
                    rounded="xl"
                    w="full"
                    fontSize="md"
                    bgColor={pricing.id === 'free' ? undefined : 'brand'}
                    color="white"
                    href="/signup/verify"
                    _hover={{
                        bgColor: 'brand_light',
                    }}
                    rightIcon={<HeroIcon as={ChevronRightIcon} />}
                >
                    {pricing.labelBtn}
                </Button>
            )}

            <VStack mt="10" align="stretch" spacing="6">
                <Text fontSize="sm" fontWeight="semibold" color="gray.500">
                    {t('homepage.pricing.card.feature')}:
                </Text>
                <VStack align="stretch" spacing="4">
                    {pricing.features[period].map((i, id) => (
                        <HStack key={id} spacing="4">
                            <Center
                                w="26px"
                                h="26px"
                                bgColor="pink.100"
                                rounded="full"
                                flexShrink="0"
                            >
                                <HeroIcon
                                    boxSize="3"
                                    as={CheckIcon}
                                    color="brand"
                                />
                            </Center>
                            <Text>{i}</Text>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </Card>
    );
}

function SwitchTypePeriod({
    period,
    onChange,
}: {
    onChange: (value: TPeriod) => void;
    period: TPeriod;
}) {
    const { t } = useTranslate();
    const left = period === 'year' ? 20 + 5 : 5;

    function handleSwitch() {
        const value = period === 'year' ? 'month' : 'year';
        onChange(value);
    }

    return (
        <HStack spacing="4">
            <Button
                colorScheme={period === 'month' ? 'green' : undefined}
                color={period === 'month' ? 'brand' : undefined}
                variant="link"
                onClick={() => onChange('month')}
            >
                6 {t('homepage.pricing.period.month')}
            </Button>
            <Box
                cursor="pointer"
                onClick={handleSwitch}
                pos="relative"
                bgColor="brand"
                w="50px"
                rounded="full"
                h="30px"
            >
                <Box
                    as={motion.div}
                    pos="absolute"
                    top="5px"
                    left={`${left}px`}
                    h="20px"
                    w="20px"
                    bgColor="white"
                    rounded="full"
                />
            </Box>
            <Button
                colorScheme={period === 'year' ? 'green' : undefined}
                color={period === 'year' ? 'brand' : undefined}
                variant="link"
                onClick={() => onChange('year')}
            >
                1 {t('homepage.pricing.period.year')}
            </Button>
        </HStack>
    );
}

function getArrFromString(str: string) {
    return str.split('\n').filter((i) => i.length > 0);
}

export function PricingHomepageLayout() {
    const { t } = useTranslate();
    const [period, setPeriod] = useState<TPeriod>('year');

    const listPricing: Array<IPricing> = [
        {
            id: 'free',
            label: 'Free',
            text: t('homepage.pricing.card.free_label'),
            price: {
                month: 0,
                year: 0,
            },
            labelBtn: t('homepage.pricing.card.btn.free'),
            features: {
                month: getArrFromString(t('homepage.pricing.card.free')),
                year: getArrFromString(t('homepage.pricing.card.free')),
            },
        },
        {
            id: 'pro',
            label: 'Basic',
            text: 'phù hợp để bắt đầu',
            price: {
                month: 1199000,
                year: 2388000,
            },
            labelBtn: t('homepage.pricing.card.btn.basic'),
            features: {
                month: getArrFromString(t('homepage.pricing.card.basic.month')),
                year: getArrFromString(t('homepage.pricing.card.basic.year')),
            },
        },

        {
            id: 'premium',
            label: 'Premium',
            text: 'phù hợp để bắt đầu',
            price: {
                month: 3599000,
                year: 7188000,
            },
            labelBtn: t('homepage.pricing.card.btn.basic'),
            features: {
                month: getArrFromString(
                    t('homepage.pricing.card.premium.month')
                ),
                year: getArrFromString(t('homepage.pricing.card.premium.year')),
            },
        },
    ];

    return (
        <Box id="pricing" pt="24" pb="12">
            <ContainerHomepageLayout>
                <VStack align="stretch" spacing="10">
                    <HeadingHomepageLayout textAlign="center">
                        {t('homepage.pricing.heading')}
                    </HeadingHomepageLayout>

                    <VStack>
                        <SwitchTypePeriod
                            period={period}
                            onChange={setPeriod}
                        />
                    </VStack>

                    <SimpleGrid columns={[1, null, 3]} gap={12}>
                        {listPricing.map((item) => (
                            <CardPricing
                                period={period}
                                pricing={item}
                                key={item.id}
                            />
                        ))}
                    </SimpleGrid>
                </VStack>
            </ContainerHomepageLayout>
        </Box>
    );
}
