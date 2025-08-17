import {
    Box,
    HStack,
    Menu,
    MenuButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    MenuList,
    Text,
} from '@chakra-ui/react';
import { SelectTeam } from '@components/page/user/team/select.team';
import { UserRole, type UserInfoFragment } from '@generated/graphql/query';
import {
    ArrowRightOnRectangleIcon,
    Cog6ToothIcon,
    RectangleStackIcon,
    UserIcon,
} from '@heroicons/react/24/outline';
import { useLogout } from '@share/hooks/auth.hooks';
import { useTeamDefault } from '@share/hooks/team.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useAuthStore } from '@share/store/auth.store';
import Link from 'next/link';
import { HeroIcon } from '../icon';
import { BalanceUserMenu } from './balance.user-menu';
import { InfoUserMenu } from './info.user-menu';
import { TeamUserMenu } from './team.user-menu';

function MenuItemNode({ icon, label }: { label: string; icon: any }) {
    return (
        <HStack>
            <HeroIcon as={icon} />
            <Text color="gray.600" as="span" fontWeight="medium" fontSize="sm">
                {label}
            </Text>
        </HStack>
    );
}

interface Props {
    user: UserInfoFragment;
}

export function UserMenu({ user }: Props) {
    const setIsLoading = useAuthStore((state) => state.setIsLoading);
    const { t } = useTranslate();
    const { data } = useTeamDefault();
    const { mutate } = useLogout();

    const handleLogout = () => {
        setIsLoading(true);

        mutate({});
    };

    const isOwner = [
        UserRole.User,
        UserRole.Admin,
        UserRole.AdminStaff,
    ].includes(user?.role);

    return (
        <Menu placement="bottom-end">
            <MenuButton>
                <InfoUserMenu />
            </MenuButton>
            <MenuList minW="0" w="240px">
                <BalanceUserMenu />
                <MenuDivider />
                <MenuItem as={Link} href="/user/profile">
                    <MenuItemNode
                        icon={UserIcon}
                        label={t('dashboard.heading.profile')}
                    />
                </MenuItem>
                {isOwner ? (
                    <MenuItem as={Link} href="/user/workspace">
                        <MenuItemNode
                            icon={RectangleStackIcon}
                            label={t('dashboard.heading.workspace')}
                        />
                    </MenuItem>
                ) : null}
                <MenuDivider />
                <MenuGroup title="Team">
                    <SelectTeam>
                        <Box px="4" pb="2" w="full">
                            <TeamUserMenu />
                        </Box>
                    </SelectTeam>
                </MenuGroup>
                <MenuItem
                    as={Link}
                    href={`/user/team/${data?.teamDefault?.id}`}
                >
                    <MenuItemNode
                        icon={Cog6ToothIcon}
                        label={t('dashboard.heading.setting')}
                    />
                </MenuItem>
                <MenuItem onClick={handleLogout}>
                    <MenuItemNode
                        icon={ArrowRightOnRectangleIcon}
                        label={t('dashboard.heading.logout')}
                    />
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
