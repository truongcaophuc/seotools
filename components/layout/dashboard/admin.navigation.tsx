import { VStack } from '@chakra-ui/react';
import {
    AtSymbolIcon,
    BeakerIcon,
    Cog6ToothIcon,
    CreditCardIcon,
    CurrencyDollarIcon,
    FolderIcon,
    LanguageIcon,
    MegaphoneIcon,
    Squares2X2Icon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { MenuItem } from './menu.item';

interface IMenu {
    label: string;
    href: string;
    icon?: any;
    children?: IMenu[];
}

export const menus: Array<IMenu> = [
    { label: 'Tổng quan', href: '/dashboard', icon: Squares2X2Icon },
    { label: 'Khách hàng', href: '/dashboard/customer', icon: UserGroupIcon },
    {
        label: 'Thanh toán',
        href: '/dashboard/payment',
        icon: CreditCardIcon,
        children: [
            {
                label: 'Thanh toán gói',
                href: '/dashboard/payment',
            },
            {
                label: 'Mua từ',
                href: '/dashboard/payment/buy-word',
            },
        ],
    },

    {
        label: 'Gói',
        href: '/dashboard/package',
        icon: CurrencyDollarIcon,
        children: [
            { label: 'Tất cả gói', href: '/dashboard/package' },
            { label: 'Thời hạn', href: '/dashboard/package/period' },
        ],
    },
    {
        label: 'Nhóm dịch vụ',
        href: '/dashboard/category',
        icon: FolderIcon,
    },
    {
        label: 'Dịch vụ',
        href: '/dashboard/service',
        icon: MegaphoneIcon,
    },
    {
        label: 'Custom field',
        href: '/dashboard/custom-field',
        icon: AtSymbolIcon,
    },
    {
        label: 'Phong cách',
        href: '/dashboard/style-content',
        icon: BeakerIcon,
    },
    {
        label: 'Ngôn ngữ',
        href: '/dashboard/language',
        icon: LanguageIcon,
    },
    {
        label: 'Cài đặt',
        href: '/dashboard/setting',
        icon: Cog6ToothIcon,
    },
];

export function AdminNavigation() {
    return (
        <VStack align="stretch">
            {menus.map((item) => (
                <MenuItem key={item.href} menu={item} />
            ))}
        </VStack>
    );
}
