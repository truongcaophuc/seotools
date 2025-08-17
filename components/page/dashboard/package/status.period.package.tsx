import { HStack, Spinner, Switch, SwitchProps } from '@chakra-ui/react';
import { useUpdatePackagePeriod } from '@share/hooks/package.hooks';
import { ChangeEvent } from 'react';

interface Props extends SwitchProps {
    packagePeriodId: string;
}

export function StatusPeriodPackage({ packagePeriodId, ...props }: Props) {
    const { isLoading, mutate } = useUpdatePackagePeriod();

    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        mutate({
            input: {
                id: packagePeriodId,
                isActive: e.target.checked,
            },
        });
    }
    return (
        <HStack>
            <Switch {...props} onChange={handleChange} />
            {isLoading ? <Spinner size="xs" color="gray.300" /> : null}
        </HStack>
    );
}
