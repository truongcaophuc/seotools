import { Badge, Box, Skeleton } from '@chakra-ui/react';
import { useCustomFields } from '@share/hooks/custom-field.hooks';

interface Props {
    onClick: (value: string) => void;
}

export function CustomFieldTags({ onClick }: Props) {
    const { isLoading, data } = useCustomFields();
    return (
        <Skeleton isLoaded={!isLoading}>
            <Box whiteSpace="pre-wrap">
                {data?.customFields.map((item) => (
                    <Badge
                        mr="2"
                        mb="2"
                        textTransform="initial"
                        fontWeight="medium"
                        cursor="pointer"
                        onClick={() => onClick(item.field)}
                        key={item.id}
                    >
                        {item.title}
                    </Badge>
                ))}
            </Box>
        </Skeleton>
    );
}
