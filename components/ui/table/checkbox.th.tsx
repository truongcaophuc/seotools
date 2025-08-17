import { Checkbox } from '@chakra-ui/react';
import { useStoreTable } from './store.table';

interface Props {
    totalItem: number;
    onChange: (value: boolean) => void;
}

export const CheckboxTh = ({ totalItem, onChange }: Props) => {
    const { isSelectAll, selected, toggleSelectAll } = useStoreTable();
    const isChecked = isSelectAll || selected.length === totalItem;

    const handleChange = () => {
        onChange(!isSelectAll);
        toggleSelectAll();
    };

    const selectedLength = selected.length;
    const isIndeterminate = selectedLength > 0 && selectedLength < totalItem;

    return (
        <Checkbox
            isChecked={isChecked}
            onChange={handleChange}
            isIndeterminate={isIndeterminate}
        />
    );
};
