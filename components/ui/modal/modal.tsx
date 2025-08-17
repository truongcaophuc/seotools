import {
    Divider,
    Heading,
    Modal as Md,
    ModalBody,
    ModalBodyProps,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    ModalProps,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends ModalProps {
    title?: string;
    closed?: boolean;
    footer?: ReactNode;
    bodyProps?: Partial<ModalBodyProps>;
}

export function Modal({
    children,
    title,
    bodyProps,
    closed = true,
    footer,
    ...props
}: Props) {
    return (
        <Md {...props}>
            <ModalOverlay />
            <ModalContent>
                {closed ? <ModalCloseButton /> : null}
                {title ? (
                    <>
                        <ModalHeader borderBottomWidth="1px">
                            <Heading as="h3" fontSize="lg">
                                {title}
                            </Heading>
                        </ModalHeader>
                    </>
                ) : null}

                <ModalBody {...bodyProps} py={bodyProps?.py || '4'}>
                    {children}
                </ModalBody>
                {footer ? (
                    <>
                        <Divider />
                        <ModalFooter>{footer}</ModalFooter>
                    </>
                ) : null}
            </ModalContent>
        </Md>
    );
}
