import { Text, VStack } from '@chakra-ui/react';
import { Heading } from '@components/ui';
import { ServiceInfoFragment } from '@generated/graphql/query';
import Link from 'next/link';

interface Props {
    service: ServiceInfoFragment;
}

export function CardService({ service }: Props) {
    return (
        <VStack
            as={Link}
            href={`/user/ai/${service.id}`}
            cursor="pointer"
            _hover={{
                boxShadow: 'md',
            }}
            spacing="4"
            borderWidth="1px"
            rounded="md"
            p="6"
            align="stretch"
        >
            <Heading fontSize="md" lineHeight="1.5">
                {service.title}
            </Heading>
            <Text color="gray.500" fontSize="sm">
                {service.description}
            </Text>
        </VStack>
    );
}
