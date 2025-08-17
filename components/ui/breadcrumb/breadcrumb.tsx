import {
    Box,
    Breadcrumb as BreadcrumbUi,
    BreadcrumbItem,
    BreadcrumbLink,
    Text,
} from '@chakra-ui/react';
import Link from 'next/link';

export interface IBreadcrumbItem {
    label: string;
    href?: string;
}

interface Props {
    links: Array<IBreadcrumbItem>;
}

export function Breadcrumb({ links }: Props) {
    return (
        <BreadcrumbUi
            fontSize="xs"
            color="gray.500"
            spacing="8px"
            separator="/"
        >
            {links.map((item) => (
                <BreadcrumbItem key={item.label}>
                    <Text
                        noOfLines={1}
                        as={item.href ? Link : BreadcrumbLink}
                        href={item.href}
                    >
                        {item.label}
                    </Text>
                </BreadcrumbItem>
            ))}
        </BreadcrumbUi>
    );
}
