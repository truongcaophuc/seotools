import {
    Avatar,
    HStack,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    Card,
    Heading,
    HeroIcon,
    MenuAction,
    Table,
    TColumn,
} from '@components/ui';
import { ChannelType, PageChannelInfoFragment } from '@generated/graphql/query';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import {
    useConnectFacebookPage,
    usePageChannels,
} from '@share/hooks/channel.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { signOut, useSession } from 'next-auth/react';
import { DeletePageChannel } from '../delete-page-channel';
import { PageChannelStatus } from '../page-channel-status';

export function ListPageFacebook() {
    const { t } = useTranslate();
    const { data: dataFacebook } = useSession();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const { isLoading, data } = usePageChannels({
        page,
        perPage,
        type: ChannelType.Facebook,
    });
    const { isLoading: isLoadingConnect, mutate } = useConnectFacebookPage();

    function handleConnect() {
        mutate(null);
    }

    const channels = data?.pageChannels?.data || [];

    const columns: TColumn<PageChannelInfoFragment> = [
        {
            key: 'name',
            dataIndex: 'name',
            label: t('utilities.table.name'),
            render: (value, root) => {
                return (
                    <HStack
                        as={Link}
                        href={`https://facebook.com/${root.pageChannelId}`}
                        target="_blank"
                    >
                        <Avatar
                            size="sm"
                            name={root.name}
                            src={`http://graph.facebook.com/${root.pageChannelId}/picture?app_id=255373446246022`}
                        />
                        <Text>{value}</Text>
                    </HStack>
                );
            },
        },

        {
            key: 'type',
            dataIndex: 'type',
            label: t('utilities.table.type'),
        },
        {
            key: 'isActive',
            dataIndex: 'isActive',
            label: t('utilities.table.status'),
            render: (value, root) => (
                <PageChannelStatus pageId={root.id} status={value} />
            ),
        },
        {
            label: t('commons.table.createdAt'),
            dataIndex: 'createdAt',
            key: 'createdAt',
            isNumberic: true,
            render: formatDate,
        },
        {
            label: '',
            dataIndex: 'pageChannelId',
            key: 'action',
            isNumberic: true,
            render: (value, root) => {
                return (
                    <MenuAction>
                        <>
                            <MenuItem
                                as={Link}
                                target="_blank"
                                href={`https://facebook.com/${value}`}
                            >
                                {t('commons.detail')}
                            </MenuItem>
                            <DeletePageChannel pageId={root.id}>
                                <MenuItem>{t('commons.delete')}</MenuItem>
                            </DeletePageChannel>
                        </>
                    </MenuAction>
                );
            },
        },
    ];

    return (
        <VStack align="stretch" spacing="4">
            <HStack>
                <Heading>Fanpage</Heading>
                <Spacer />
                <Menu>
                    <MenuButton>
                        <HStack>
                            <Avatar size="sm" src={dataFacebook?.user?.image} />
                            <Text as="span" fontSize="sm">
                                {dataFacebook?.user?.name}
                            </Text>
                            <HeroIcon as={ChevronDownIcon} boxSize="3" />
                        </HStack>
                    </MenuButton>
                    <MenuList minW="0" w="120px">
                        <MenuItem
                            isDisabled={isLoadingConnect}
                            onClick={handleConnect}
                        >
                            {t('utilities.facebook.connect')}
                        </MenuItem>
                        <MenuItem onClick={() => signOut()}>
                            {t('commons.exit')}
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
            <Card
                boxShadow="none"
                borderWidth="1px"
                borderColor="gray.200"
                bodyProps={{ p: 0 }}
            >
                <Table
                    isNo
                    columns={columns}
                    isLoading={isLoading}
                    data={channels}
                    pagination={{
                        values: data?.pageChannels?.pagination,
                        onChangePage: setPage,
                        onChangePerPage: setPerPage,
                    }}
                />
            </Card>
        </VStack>
    );
}
