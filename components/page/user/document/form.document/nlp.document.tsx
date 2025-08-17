import { Progress, Text, VStack } from '@chakra-ui/react';

interface Props {
    score: number;
}

function getColor(score: number) {
    if (score >= 80 && score <= 100) return 'green';
    if (score >= 79 && score <= 50) return 'orange';
    return 'red';
}

export function NlpDocument({ score }: Props) {
    const color = getColor(score);

    return (
        <VStack spacing="3" p="8">
            <Text textAlign="center" fontSize="lg" fontWeight="medium">
                Content Score
            </Text>
            <Text as="span" fontSize="3xl" color={color}>{`${score}/100`}</Text>
            <Progress w="full" colorScheme={color} hasStripe value={score} />
        </VStack>
    );
}
