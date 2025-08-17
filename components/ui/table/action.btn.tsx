import { Icon, IconButton, IconButtonProps } from '@chakra-ui/react';
import {
    ArrowsPointingOutIcon,
    ClipboardDocumentIcon,
    EyeIcon,
    TrashIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export interface ActionBtnProps extends Partial<IconButtonProps> {
    href?: string;
}

export function EditBtn({ href, ...props }: ActionBtnProps) {
    if (href) {
        return (
            <IconButton
                as={Link}
                href={href}
                size="xs"
                colorScheme="green"
                aria-label="Edit"
                icon={<Icon as={EyeIcon} boxSize="4" />}
                {...props}
            />
        );
    }

    return (
        <IconButton
            {...props}
            size="xs"
            colorScheme="green"
            aria-label="Edit"
            icon={<Icon as={EyeIcon} boxSize="4" />}
        />
    );
}

export function DeleteBtn(props: ActionBtnProps) {
    return (
        <IconButton
            {...props}
            size="xs"
            colorScheme="red"
            aria-label="Delete"
            icon={<Icon as={TrashIcon} boxSize="4" />}
        />
    );
}

export function ExpandedBtn(props: ActionBtnProps) {
    return (
        <IconButton
            {...props}
            size="xs"
            colorScheme="teal"
            aria-label="Delete"
            icon={<Icon as={ArrowsPointingOutIcon} boxSize="4" />}
        />
    );
}

export function CopyBtn(props: ActionBtnProps) {
    return (
        <IconButton
            {...props}
            size="xs"
            colorScheme="blue"
            aria-label="Copy"
            icon={<Icon as={ClipboardDocumentIcon} boxSize="4" />}
        />
    );
}
