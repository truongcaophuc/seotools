import { Icon, IconButton, IconButtonProps, IconProps } from '@chakra-ui/react';
import { cloneElement, ReactElement } from 'react';
import { useLayoutFormDocumentStore } from './store.layout.form.document';

interface Props {
    children?: ReactElement;
}

function IconLayoutSidebarReverse(props: IconProps) {
    return (
        <Icon
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            boxSize="6"
            {...props}
        >
            <path stroke="none" d="M0 0h24v24H0z" />
            <path d="M6 4 H18 A2 2 0 0 1 20 6 V18 A2 2 0 0 1 18 20 H6 A2 2 0 0 1 4 18 V6 A2 2 0 0 1 6 4 z" />
            <path d="M15 4v16" />
        </Icon>
    );
}

function ToggleButton(props: Partial<IconButtonProps>) {
    const isOpen = useLayoutFormDocumentStore((state) => state.isOpen);

    return (
        <IconButton
            size="sm"
            colorScheme={isOpen ? 'blue' : 'gray'}
            {...props}
            icon={<IconLayoutSidebarReverse />}
            aria-label="Toggle"
        />
    );
}

export function ToggleSidebarLayoutFormDocument({
    children = <ToggleButton />,
}: Props) {
    const isOpen = useLayoutFormDocumentStore((state) => state.isOpen);
    const onClose = useLayoutFormDocumentStore((state) => state.onClose);
    const onOpen = useLayoutFormDocumentStore((state) => state.onOpen);

    function handleClick() {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    }

    return cloneElement(children, { onClick: handleClick });
}
