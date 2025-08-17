import { HStack, Spinner, Switch } from '@chakra-ui/react';
import { useUpdatePageChannel } from '@share/hooks/channel.hooks';
import { ChangeEvent } from 'react';

interface Props {
    pageId: string;
    status: boolean;
}

export function PageChannelStatus({ pageId, status }: Props) {
    const { isLoading, mutate } = useUpdatePageChannel();
    function handleChange(e: ChangeEvent<HTMLInputElement>) {
        if (isLoading) return;

        mutate({
            input: {
                id: pageId,
                isActive: e.target.checked,
            },
        });
    }

    return (
        <HStack>
            <Switch onChange={handleChange} isChecked={status} />
            {isLoading ? <Spinner size="sm" /> : null}
        </HStack>
    );
}
