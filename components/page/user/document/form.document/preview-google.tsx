import {
    Center,
    Heading,
    HStack,
    Input,
    SimpleGrid,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import {
    EllipsisVerticalIcon,
    MagnifyingGlassIcon,
    MapPinIcon,
    NewspaperIcon,
    PhotoIcon,
    VideoCameraIcon,
} from '@heroicons/react/24/outline';
import { useDocumentStore } from '@share/store/document.store';
import { ReactNode } from 'react';

function Tab({
    label,
    active,
    icon,
}: {
    label: string;
    active?: boolean;
    icon?: ReactNode;
}) {
    return (
        <HStack
            spacing="1"
            pb="3"
            px="2"
            pos="relative"
            _after={{
                content: "''",
                display: active ? 'inline-block' : 'none',
                bgColor: 'blue.400',
                w: 'full',
                h: '4px',
                pos: 'absolute',
                bottom: 0,
                left: 0,
            }}
        >
            {icon}
            <Text color="gray.600" fontSize="xs">
                {label}
            </Text>
        </HStack>
    );
}

export function PreviewGoogle() {
    const document = useDocumentStore((state) => state.document);
    const slug = document?.slug || '';
    const url = document?.url || '';
    let urlPreview = `https://${url}`;

    if (slug && slug.length > 0) urlPreview = `${urlPreview}/${slug}`;

    return (
        <VStack spacing="5" align="stretch">
            <Heading as="h3" fontSize="xl" fontWeight="medium">
                Preview
            </Heading>

            <SimpleGrid columns={2}>
                <HStack boxShadow="md" bgColor="white" rounded="full">
                    <Input
                        size="lg"
                        value={document?.keyword?.value}
                        border="none"
                        rounded="full"
                    />
                    <Spacer />
                    <Center pr="4">
                        <HeroIcon
                            color="blue.600"
                            as={MagnifyingGlassIcon}
                            boxSize="6"
                        />
                    </Center>
                </HStack>
            </SimpleGrid>
            <VStack align="stretch" spacing="3">
                <SimpleGrid columns={2} borderBottomWidth="1px">
                    <HStack>
                        <Tab
                            active
                            label="All"
                            icon={
                                <HeroIcon
                                    as={MagnifyingGlassIcon}
                                    color="blue.500"
                                />
                            }
                        />
                        <Tab
                            label="Images"
                            icon={<HeroIcon as={PhotoIcon} />}
                        />
                        <Tab
                            label="Videos"
                            icon={<HeroIcon as={VideoCameraIcon} />}
                        />
                        <Tab
                            label="News"
                            icon={<HeroIcon as={NewspaperIcon} />}
                        />
                        <Tab label="Maps" icon={<HeroIcon as={MapPinIcon} />} />
                        <Tab
                            label="More"
                            icon={<HeroIcon as={EllipsisVerticalIcon} />}
                        />
                        <Spacer />
                        <Tab label="Settings" />
                        <Tab label="Tools" />
                    </HStack>
                </SimpleGrid>
                <Text fontSize="xs" color="gray.500">
                    About 28,386,315 results (0.19 seconds)
                </Text>
            </VStack>
            <VStack align="stretch" spacing="0.5">
                <Text fontSize="xs" color="gray.600">
                    {urlPreview}
                </Text>
                <Heading as="h2" fontSize="2xl" fontWeight="normal">
                    {document?.title}
                </Heading>

                <Text color="gray.500" fontSize="sm">
                    {document?.description}
                </Text>
            </VStack>
        </VStack>
    );
}
