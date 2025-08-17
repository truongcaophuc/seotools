import {
    Box,
    VStack,
    Text,
    TextProps,
    HStack,
    StackProps,
} from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import {
    BriefcaseIcon,
    Cog6ToothIcon,
    UserGroupIcon,
} from '@heroicons/react/24/outline';
import { useTeamDefault } from '@share/hooks/team.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';

type TMenuItem = {
    label: string;
    href: string;
    icon: any;
};

type SidebarMenuItemProps = StackProps & { content: TMenuItem };

function MenuItem({ content }: SidebarMenuItemProps) {
    const router = useRouter();
    const href = `/user/team/${content.href}`;
    const isActive = router.asPath === href;
    const bgColor = isActive ? 'green.600' : 'transparent';
    const color = isActive ? 'white' : 'gray.500';

    return (
        <HStack
            as={Link}
            href={href}
            bgColor={bgColor}
            fontSize="sm"
            fontWeight="semibold"
            color={color}
            px="6"
            py="2"
        >
            <HeroIcon as={content.icon} />
            <Text color={color} as="span">
                {content.label}
            </Text>
        </HStack>
    );
}

export function SidebarTeamDashboard() {
    const { t } = useTranslate();
    const { data } = useTeamDefault();
    const team = data?.teamDefault;

    const menus: Array<TMenuItem> = [
        {
            label: t('team.detail.sidebar.setting'),
            href: team?.id,
            icon: Cog6ToothIcon,
        },
        {
            label: t('team.detail.sidebar.member'),
            href: `${team?.id}/member`,
            icon: UserGroupIcon,
        },
        {
            label: t('team.detail.sidebar.project'),
            href: `${team?.id}/project`,
            icon: BriefcaseIcon,
        },
    ];

    return (
        <Box borderRightWidth="1px" w="full" maxWidth="250px" bgColor="gray.50">
            <VStack align="stretch" py="5">
                {menus.map((item) => {
                    return <MenuItem key={item.href} content={item} />;
                })}
            </VStack>
        </Box>
    );
}
