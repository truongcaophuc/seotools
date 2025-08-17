import { IconButtonProps, IconButton } from '@chakra-ui/react';
import { CpuChipIcon } from '@heroicons/react/24/outline';
import { HeroIcon } from '../icon';

interface Props extends IconButtonProps {}

export function AiButton(props: Props) {
    return (
        <IconButton
            {...props}
            icon={<HeroIcon as={CpuChipIcon} />}
            aria-label="Ai"
        />
    );
}
