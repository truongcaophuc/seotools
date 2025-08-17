import {
    Box,
    Collapse,
    Container,
    Heading,
    HStack,
    SimpleGrid,
    Spacer,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import {
    CheckCircleIcon,
    MinusIcon,
    PlusIcon,
} from '@heroicons/react/24/outline';
import { ContainerHomepageLayout } from './container.homepage.layout';
import {
    HeadingHomepageLayout,
    HeadingTextHomepageLayout,
} from './heading.homepage.layout';
import { useTranslate } from '@share/hooks/translate.hooks';

type TContent = {
    id: number;
    title: string;
    list: Array<{ label: string; content?: string }>;
};

function Card({ content }: { content: TContent }) {
    const { isOpen, onToggle } = useDisclosure();

    const icon = isOpen ? MinusIcon : PlusIcon;

    return (
        <Box boxShadow="sm" bgColor="white" borderWidth="1px" rounded="lg">
            <HStack p="5" onClick={onToggle}>
                <Heading fontSize="lg">{content.title}</Heading>
                <Spacer />
                <HeroIcon as={icon} boxSize="6" />
            </HStack>

            <Collapse in={isOpen} animateOpacity>
                <Box pb="5" px="5">
                    <VStack spacing={3} align="stretch">
                        {content.list.map((item) => (
                            <HStack key={item.label} alignItems="flex-start">
                                <HeroIcon
                                    as={CheckCircleIcon}
                                    boxSize="6"
                                    color="brand"
                                />
                                <Text>
                                    <Text as="span" fontWeight="medium">
                                        {item.label}
                                    </Text>{' '}
                                    {item.content && (
                                        <Text as="span" color="gray.600">
                                            : {item.content}
                                        </Text>
                                    )}
                                </Text>
                            </HStack>
                        ))}
                    </VStack>
                </Box>
            </Collapse>
        </Box>
    );
}

export function WhatWeDoHomepageLayout() {
    const { t } = useTranslate();

    const contents: Array<TContent> = [
        {
            id: 1,
            title: t('homepage.whatwedo.list.web_content.label'),
            list: [
                {
                    label: t(
                        'homepage.whatwedo.list.web_content.content.title.label'
                    ),
                    content: t(
                        'homepage.whatwedo.list.web_content.content.title.paragraph'
                    ),
                },
                {
                    label: t(
                        'homepage.whatwedo.list.web_content.content.description.label'
                    ),
                    content: t(
                        'homepage.whatwedo.list.web_content.content.description.paragraph'
                    ),
                },
                {
                    label: t(
                        'homepage.whatwedo.list.web_content.content.unique.label'
                    ),
                    content: t(
                        'homepage.whatwedo.list.web_content.content.unique.paragraph'
                    ),
                },
                {
                    label: t(
                        'homepage.whatwedo.list.web_content.content.keyword_strategy.label'
                    ),
                    content: t(
                        'homepage.whatwedo.list.web_content.content.keyword_strategy.paragraph'
                    ),
                },
                {
                    label: t(
                        'homepage.whatwedo.list.web_content.content.outline.label'
                    ),
                    content: t(
                        'homepage.whatwedo.list.web_content.content.outline.paragraph'
                    ),
                },
                { label: 'Rewrite content ' },
            ],
        },
        {
            id: 2,
            title: t('homepage.whatwedo.list.blog_post.label'),
            list: [
                { label: 'Blog Idea & Outline' },
                { label: 'Blog Section Writing' },
                { label: 'Blog Intro' },
            ],
        },
        {
            id: 3,
            title: 'Social Media Content',
            list: [
                { label: t('homepage.whatwedo.list.aida.label') },
                { label: t('homepage.whatwedo.list.pas.label') },
                { label: 'Discount or special promotion' },
                { label: 'Social media bio' },
                { label: 'Share tips and knowledge' },
                { label: 'Seasonal / holiday' },
                { label: 'Testimonial & Review' },
                { label: 'Post & Caption Ideas' },
                { label: 'Facebook, Twitter, LinkedIn Ads' },
                { label: 'Google Search Ads' },
                { label: 'Magic Command' },
                {
                    label: 'Event recap(Thu hút khách hàng đã sử dụng sản phẩm hoặc tiềm năng bằng chia sẻ câu chuyện về 1 sự kiện nào đó)',
                },
                { label: 'Build Anticipation / Launch new product ' },
                {
                    label: ' Create a post to launching for an upcoming event of new product ',
                },
                { label: 'Contest or giveaway promotion' },
                { label: 'Event promotion' },
                { label: ' Create a post to promote your event' },
                { label: ' Reply to Reviews & Messages ' },
            ],
        },
        {
            id: 4,
            title: 'Email Marketing',
            list: [
                { label: 'Welcome/confirmation email' },
                { label: 'Motivational quote' },
                { label: 'Coupon/discount email' },
                { label: 'Recurring email newsletter ' },
                { label: 'Testimonial email ' },
                { label: 'Event promotion email ' },
                { label: 'Cold Outreach email ' },
            ],
        },
        {
            id: 5,
            title: 'Business',
            list: [
                { label: ' Job description ' },
                { label: ' Rejection letter ' },
                { label: 'Business Idea Pitch ' },
                { label: 'Product Description ' },
                { label: 'Product Description(bullet points) ' },
            ],
        },
        {
            id: 6,
            title: 'Video',
            list: [
                { label: 'Youtube Channel Description ' },
                { label: 'Youtube Video Description ' },
                { label: 'Youtube Video Script' },
            ],
        },

        {
            id: 7,
            title: 'Fun',
            list: [
                { label: 'Short Story' },
                { label: 'Song lyrics ' },
                { label: 'Motivational quote' },
                { label: 'Dating profile' },
                { label: 'Wedding vows' },
                {
                    label: 'Struggle yo express your love? Find the perfect words for your future spouse ',
                },
            ],
        },
    ];
    return (
        <Box pt="16">
            <ContainerHomepageLayout>
                <Container as={VStack} align="stretch" maxW="5xl" spacing="10">
                    <VStack mb="8" spacing={[4, null, 6]}>
                        <HeadingHomepageLayout textAlign="center">
                            {t('homepage.whatwedo.heading')}
                        </HeadingHomepageLayout>
                        <HeadingTextHomepageLayout textAlign="center">
                            {t('homepage.whatwedo.paragraph')}
                        </HeadingTextHomepageLayout>
                    </VStack>

                    <SimpleGrid
                        columnGap="10"
                        rowGap="6"
                        columns={[1, null, 2]}
                    >
                        {contents.map((item) => (
                            <Box key={item.id}>
                                <Card content={item} />
                            </Box>
                        ))}
                    </SimpleGrid>
                </Container>
            </ContainerHomepageLayout>
        </Box>
    );
}
