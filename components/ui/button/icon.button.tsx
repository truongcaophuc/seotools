import { IconButton as Button, IconButtonProps } from '@chakra-ui/react';
import { HeroIcon } from '../icon';

interface Props extends IconButtonProps {
    icon: any;
}

export function IconButton({ icon, ...props }: Props) {
    return <Button {...props} icon={<HeroIcon as={icon} />} />;
}
