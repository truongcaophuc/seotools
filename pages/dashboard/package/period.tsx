import { Button, HStack, MenuItem, Spacer, VStack } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import {
    StatusPeriodPackage,
    UpdatePeriodPackage,
} from '@components/page/dashboard/package';
import {
    Card,
    Heading,
    HeroIcon,
    MenuAction,
    Table,
    TColumn,
} from '@components/ui';
import { PackagePeriodInfoFragment } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { usePackagePeriods } from '@share/hooks/package.hooks';

const TITLE_PAGE = 'Thời hạn';

const columns: TColumn<PackagePeriodInfoFragment> = [
    { dataIndex: 'name', key: 'name', label: 'Tên' },
    {
        dataIndex: 'isActive',
        key: 'isActive',
        label: 'Trạng thái',
        render: (value, root) => {
            return (
                <StatusPeriodPackage
                    packagePeriodId={root.id}
                    isChecked={value}
                />
            );
        },
    },
    { dataIndex: 'order', key: 'order', label: 'Thứ tự' },
    { dataIndex: 'createdAt', key: 'createdAt', label: 'Ngày tạo' },
    {
        isNumberic: true,
        dataIndex: 'id',
        key: 'active',
        label: '',
        render: (_, root) => {
            return (
                <MenuAction>
                    <>
                        <UpdatePeriodPackage packagePeriod={root}>
                            <MenuItem>Chỉnh sửa</MenuItem>
                        </UpdatePeriodPackage>
                    </>
                </MenuAction>
            );
        },
    },
];

export default function PackagePeriodPage() {
    const { isLoading, data } = usePackagePeriods();

    const periods = data?.packagePeriods || [];

    return (
        <DashboardLayout showHeading={false} type="admin" title={TITLE_PAGE}>
            <VStack align="stretch" spacing="5">
                <HStack>
                    <Heading>{TITLE_PAGE}</Heading>
                    <Spacer />
                    <UpdatePeriodPackage>
                        <Button
                            colorScheme="blue"
                            leftIcon={<HeroIcon as={PlusIcon} />}
                        >
                            Thêm
                        </Button>
                    </UpdatePeriodPackage>
                </HStack>
                <Card bodyProps={{ p: 0 }}>
                    <Table
                        data={periods}
                        isLoading={isLoading}
                        columns={columns}
                    />
                </Card>
            </VStack>
        </DashboardLayout>
    );
}
