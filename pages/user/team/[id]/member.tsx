import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { TeamDashboardLayout } from '@components/layout/dashboard';
import { DeleteMember } from '@components/page/user/team';
import {
    Card,
    HeroIcon,
    Loading,
    MenuAction,
    NotFound,
    Table,
    TColumn,
} from '@components/ui';
import { MemberInfoFragment, UserRole } from '@generated/graphql/query';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useTeam } from '@share/hooks/team.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';

export default function TeamDetailPage() {
    const { t } = useTranslate();
    const { isLoading, data, isError } = useTeam();
    if (isLoading) {
        return <Loading full />;
    }
    if (isError || !data) {
        return <NotFound />;
    }

    const team = data?.team;

    const columns: TColumn<MemberInfoFragment> = [
        {
            key: 'fullname',
            dataIndex: 'fullname',
            label: t('team.member.table.name'),
        },
        {
            key: 'role',
            dataIndex: 'role',
            label: t('team.member.table.role'),
        },
        {
            key: 'email',
            dataIndex: 'email',
            label: 'Email',
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            label: t('commons.created_at'),
            render: formatDate,
        },
        {
            key: 'action',
            dataIndex: 'id',
            label: '',
            isNumberic: true,
            render: (id, root) => {
                const isDisabled = ![
                    UserRole.RootAdmin,
                    UserRole.Admin,
                    UserRole.User,
                ].includes(root.role);

                if (isDisabled) return null;

                return (
                    <MenuAction>
                        <>
                            <MenuItem>{t('commons.edit')}</MenuItem>
                            <DeleteMember memberId={id}>
                                <MenuItem>{t('commons.delete')}</MenuItem>
                            </DeleteMember>
                        </>
                    </MenuAction>
                );
            },
        },
    ];

    return (
        <TeamDashboardLayout
            title={t('team.member.title')}
            breadcrumb={[
                {
                    label: team?.name,
                },
            ]}
            // extra={
            // <AddMember> <Button
            //         isDisabled={true}
            //         colorScheme="green"
            //         leftIcon={<HeroIcon as={PlusIcon} />}
            //     >
            //         Thêm (Coming soon)
            //     </Button>
            // </AddMember>
            //  }
        >
            <Card bodyProps={{ p: 0 }}>
                <Table columns={columns} data={team?.members} />
            </Card>
        </TeamDashboardLayout>
    );
}
