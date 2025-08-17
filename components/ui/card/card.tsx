import {
    Card as CardUi,
    CardBody,
    CardBodyProps,
    CardFooter,
    CardHeader,
    CardHeaderProps,
    CardProps,
    Heading,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends CardProps {
    headerProps?: CardHeaderProps;
    title?: string;
    footer?: ReactNode;
    bodyProps?: CardBodyProps;
}

export function Card({
    bodyProps,
    children,
    title,
    footer,
    headerProps,
    ...props
}: Props) {
    function renderCardTitle() {
        if (title) {
            return (
                <Heading as="span" fontSize="lg">
                    {title}
                </Heading>
            );
        }

        return headerProps.children;
    }
    return (
        <CardUi {...props}>
            {title || headerProps ? (
                <CardHeader {...headerProps} borderBottomWidth="1px">
                    {renderCardTitle()}
                </CardHeader>
            ) : null}
            <CardBody {...bodyProps}>{children}</CardBody>
            {footer ? (
                <CardFooter borderTopWidth="1px">{footer}</CardFooter>
            ) : null}
        </CardUi>
    );
}
