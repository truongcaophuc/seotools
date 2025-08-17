import { Icon, IconProps } from '@chakra-ui/react';

interface Props extends IconProps {
    as: any;
}

export function HeroIcon({ boxSize = '5', ...props }: Props) {
    return <Icon {...props} boxSize={boxSize} />;
}
