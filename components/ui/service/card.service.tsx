import {
    Badge,
    Box,
    Heading,
    HStack,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Card } from '@components/ui';
import { ModelAi, ServiceInfoFragment } from '@generated/graphql/query';
import { useRouter } from 'next/router';

interface Props {
    service: ServiceInfoFragment;
}

export function CardService({ service }: Props) {
    const router = useRouter();

    function handleClick() {
        router.push(`/user/ai/${service.id}`);
    }

    const isHot = service.model === ModelAi.Gpt4;

    return (
        <Card bgColor="white" onClick={handleClick} cursor="pointer">
            <VStack align="stretch" h="full">
                <Box flex="1">
                    <Heading mb="2" fontWeight="medium" fontSize={['md', 'lg']}>
                        {service.title}
                    </Heading>
                    <Text fontSize="sm" color="gray.600">
                        {service.description}
                    </Text>
                </Box>
                <Spacer />
                <HStack>
                    <Text fontSize="xs" color="gray" as="span">
                        {service?.category?.title}
                    </Text>
                    <Spacer />
                    {isHot ? <Badge colorScheme="green">HOT</Badge> : null}
                </HStack>
            </VStack>
        </Card>
    );
}
