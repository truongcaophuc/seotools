import { IconButton, IconButtonProps, Tooltip } from '@chakra-ui/react';
import { PlusIcon } from '@heroicons/react/24/outline';
import { HeroIcon } from '../icon';

interface Props extends IconButtonProps {
    tooltip?: string;
}

export function AddButton({ tooltip, ...props }: Props) {
    const button = (
        <IconButton
            {...props}
            aria-label="Add"
            icon={<HeroIcon as={PlusIcon} />}
        />
    );

    if (tooltip) {
        return <Tooltip label={tooltip}>{button}</Tooltip>;
    }

    return button;
}
