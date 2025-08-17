import { Select, SelectProps } from '@chakra-ui/react';
import { ServiceInfoFragment } from '@generated/graphql/query';
import { useServices } from '@share/hooks/service.hooks';
import { ChangeEvent, forwardRef } from 'react';

interface Props extends SelectProps {
    onSelectService?: (value: ServiceInfoFragment) => void;
}

export const SelectService = forwardRef(
    (
        {
            placeholder = 'Chọn dịch vụ',
            onChange,
            onSelectService,
            ...props
        }: Props,
        ref: any
    ) => {
        const { isLoading, data } = useServices({ page: 1, perPage: 50 });

        if (isLoading) {
            return <Select placeholder={placeholder} {...props}></Select>;
        }

        const services = data?.services?.data || [];

        const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
            if (onChange) {
                onChange(e);
            }

            if (onSelectService) {
                const service = services.find(
                    (item) => item.id === e.target.value
                );
                onSelectService(service);
            }
        };

        return (
            <Select
                onChange={handleChange}
                {...props}
                ref={ref}
                placeholder={placeholder}
            >
                {services.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.title}
                    </option>
                ))}
            </Select>
        );
    }
);
