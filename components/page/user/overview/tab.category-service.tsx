import { Text, VStack } from '@chakra-ui/react';
import { useUserOverviewStore } from './oveview.store';

interface Props {
    label: string;
    id?: string;
}

export function TabCategoryService({ label, id }: Props) {
    const selectCategory = useUserOverviewStore(
        (state) => state.selectCategory
    );
    const categorySelectId = useUserOverviewStore(
        (state) => state.categorySelectId
    );

    const handleClick = () => {
        selectCategory(id);
    };

    const active = id === categorySelectId;

    return (
        <VStack cursor="pointer" onClick={handleClick}>
            <Text
                color={active ? 'white' : 'gray.400'}
                as="span"
                fontWeight={active ? 'bold' : 'medium'}
            >
                {label}
            </Text>
        </VStack>
    );
}
