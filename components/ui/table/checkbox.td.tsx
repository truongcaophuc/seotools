import { Checkbox } from '@chakra-ui/react';
import { useStoreTable } from './store.table';

interface Props {
    itemId: string;
    onSelect: (value: boolean) => void;
}

export const CheckboxTd = <T extends { id: string }>({
    itemId,
    onSelect,
}: Props) => {
    const { selected } = useStoreTable<T>();
    const isChecked = !!selected.find((item) => item.id === itemId);

    const handleChange = () => {
        onSelect(!isChecked);
    };

    return <Checkbox onChange={handleChange} isChecked={isChecked} />;
};
