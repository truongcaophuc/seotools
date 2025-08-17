import { forwardRef, type SelectProps, Select } from '@chakra-ui/react';
import { useServiceCategories } from '@share/hooks/service.hooks';

interface Props extends SelectProps {}

export const SelectCategoryService = forwardRef((props: Props, ref: any) => {
    const { data, isLoading } = useServiceCategories({
        page: 1,
        perPage: 30,
    });

    return (
        <Select
            placeholder="Chọn nhóm dịch vụ"
            {...props}
            isDisabled={isLoading}
            ref={ref}
        >
            {data?.serviceCategories.data.map((item) => (
                <option key={item.id} value={item.id}>
                    {item.title}
                </option>
            ))}
        </Select>
    );
});
