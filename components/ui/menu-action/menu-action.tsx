import {
    forwardRef,
    IconButton,
    Menu,
    MenuButton,
    MenuButtonProps,
    MenuItem as MenuItemUi,
    MenuItemProps,
    MenuList,
    MenuListProps,
    ResponsiveValue,
} from '@chakra-ui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/24/outline';
import { ReactNode } from 'react';
import { HeroIcon } from '../icon';

interface Props {
    menus?: Array<MenuItemProps & { key: string }>;
    children?: ReactNode;
    containerProps?: MenuListProps;
    size?: ResponsiveValue<'sm' | 'md' | 'lg' | 'xs'>;
    button?: MenuButtonProps;
}

type ItemProps = Omit<MenuItemProps, 'icon'> & { icon?: any };

export const MenuItem = forwardRef(
    ({ icon, ...props }: ItemProps, ref: any) => {
        const renderIcon = icon ? (
            <HeroIcon as={icon} transform="translateY(3px)" />
        ) : undefined;

        return <MenuItemUi ref={ref} {...props} icon={renderIcon} />;
    }
);

export function MenuAction({
    size = 'xs',
    menus = [],
    button,
    children,
    containerProps,
}: Props) {
    const menuListProps = {
        fontSize: 'sm',
        color: 'gray.500',
        fontWeight: 'medium',
        minW: '0',
        w: '150px',
    };
    const menuButon = button ? (
        <MenuButton type="button" {...button} />
    ) : (
        <MenuButton
            type="button"
            as={IconButton}
            size={size}
            icon={<HeroIcon as={EllipsisVerticalIcon} />}
        />
    );
    return (
        <Menu placement="bottom-end">
            {menuButon}
            <MenuList {...menuListProps} {...containerProps}>
                {children}
                {menus.map((item) => (
                    <MenuItem {...item} />
                ))}
            </MenuList>
        </Menu>
    );
}
