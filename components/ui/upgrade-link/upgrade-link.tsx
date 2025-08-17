import Link from 'next/link';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
}

export function UpgradeLink({ children }: Props) {
    return cloneElement(children, { as: Link, href: '/user/pricing' });
}
