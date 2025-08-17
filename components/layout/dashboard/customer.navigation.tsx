import { Box, VStack } from '@chakra-ui/react';
import { DefaultProject } from '@components/page/user/project';
import {
    ArrowUpOnSquareStackIcon,
    BookOpenIcon,
    ChatBubbleBottomCenterTextIcon,
    CpuChipIcon,
    DocumentMagnifyingGlassIcon,
    DocumentTextIcon,
    HashtagIcon,
    NewspaperIcon,
    RocketLaunchIcon,
    Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useSetting } from '@share/hooks/setting.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { MenuItem } from './menu.item';
import { TitleSidebar } from './title-sidebar';

interface IMenu {
    label: string;
    href: string;
    icon?: any;
    children?: IMenu[];
    isDev?: boolean;
}

function DocLink() {
    const { t } = useTranslate();
    const { data } = useSetting();

    const href = data?.setting?.documentLink;

    if (!href) return null;

    return (
        <MenuItem
            isLink
            type="customer"
            menu={{
                label: t('dashboard.sidebar.customer.user_manual'),
                href,
                icon: BookOpenIcon,
            }}
        />
    );
}

export function CustomerNavigation() {
    const { t } = useTranslate();
    const { user } = useAuthStore();

    const menus: Array<IMenu> = [
        {
            label: t('dashboard.sidebar.customer.posts'),
            href: '/user/document',
            icon: DocumentTextIcon,
            children: [
                {
                    label: t('dashboard.sidebar.customer.list_post'),
                    href: '/user/document',
                    icon: DocumentTextIcon,
                },
                {
                    label: t('dashboard.sidebar.customer.keywords'),
                    href: '/user/keyword',
                    icon: HashtagIcon,
                },
            ],
        },
        {
            label: t('dashboard.sidebar.customer.upload'),
            href: '/user/upload',
            icon: ArrowUpOnSquareStackIcon,
            children: [
                {
                    label: t('dashboard.sidebar.customer.images'),
                    href: '/user/upload/image',
                },
                {
                    label: t('dashboard.sidebar.customer.folder_image'),
                    href: '/user/upload/image/folder',
                },
                {
                    label: t('dashboard.sidebar.customer.documents'),
                    href: '/user/upload/document',
                },
                {
                    label: t('dashboard.sidebar.customer.folder_document'),
                    href: '/user/upload/document/folder',
                },
            ],
        },
        {
            label: t('dashboard.sidebar.customer.content_with_ai'),
            href: '/user/content',
            icon: NewspaperIcon,
            children: [
                {
                    label: t('dashboard.sidebar.customer.contents'),
                    href: '/user/content',
                    icon: CpuChipIcon,
                },
                {
                    label: t('dashboard.sidebar.customer.create_content'),
                    href: '/user/ai',
                    icon: CpuChipIcon,
                },
            ],
        },
        {
            label: t('dashboard.sidebar.customer.chatbot'),
            href: '/user/chatbot',
            icon: ChatBubbleBottomCenterTextIcon,
        },
        {
            label: t('dashboard.sidebar.customer.research'),
            href: '/user/research',
            icon: DocumentMagnifyingGlassIcon,
        },
        {
            label: t('dashboard.sidebar.customer.utilities'),
            href: '/user/integrate',
            icon: RocketLaunchIcon,
        },
    ];

    const filterMenu = user?.isDeveloper
        ? menus
        : menus.filter((item) => !item.isDev);

    return (
        <>
            <MenuItem
                type="customer"
                menu={{
                    label: t('dashboard.sidebar.customer.overview'),
                    href: '/user',
                    icon: Squares2X2Icon,
                }}
            />

            <DocLink />

            <VStack
                borderBottomWidth="1px"
                borderBottomColor="blue.800"
                borderTopWidth="1px"
                borderTopColor="blue.800"
                py="3"
                align="stretch"
            >
                <TitleSidebar title={t('dashboard.sidebar.customer.project')} />
                <DefaultProject />
            </VStack>
            <Box py="3">
                <TitleSidebar title="Menu" />
                {!user?.defaultProject ? null : (
                    <VStack py="2" spacing="2" align="stretch">
                        {filterMenu.map((item) => (
                            <MenuItem
                                type="customer"
                                key={item.href}
                                menu={item}
                            />
                        ))}
                    </VStack>
                )}
            </Box>
        </>
    );
}
