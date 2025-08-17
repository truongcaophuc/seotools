import {
    Alert as AlertUi,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    type AlertProps,
} from '@chakra-ui/react';

interface Props extends AlertProps {}

export function Alert(props: Props) {
    return <AlertUi {...props} rounded="md" />;
}

export { AlertTitle, AlertDescription, AlertIcon };
