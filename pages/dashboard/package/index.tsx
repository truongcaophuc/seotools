import {
    Button,
    HStack,
    IconButton,
    MenuItem,
    Spacer,
    Tag,
    VStack,
} from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { UpdatePackage } from '@components/page/dashboard/package';
import { UpdatePackageItem } from '@components/page/dashboard/package/update.package-item';
import {
    Card,
    Heading,
    HeroIcon,
    MenuAction,
    Table,
    TColumn,
} from '@components/ui';
import {
    PackageInfoFragment,
    PackageItemInfoFragment,
} from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { usePackages } from '@share/hooks/package.hooks';

const TITLE_PAGE = 'Tất cả gói';

const columns: TColumn<PackageInfoFragment> = [
    { dataIndex: 'name', key: 'name', label: 'Tên' },
    { dataIndex: 'type', key: 'type', label: 'Loại' },
    { dataIndex: 'isActive', key: 'isActive', label: 'Trạng thái' },
    {
        dataIndex: 'packageItems',
        key: 'packageItems',
        label: 'Thời hạn',
        render: (value: Array<PackageItemInfoFragment>) => {
            return (
                <HStack>
                    {value.map((item) => (
                        <UpdatePackageItem key={item.id} packageItem={item}>
                            <Tag colorScheme="blue">
                                {item?.packagePeriod?.name}
                            </Tag>
                        </UpdatePackageItem>
                    ))}
                    <UpdatePackageItem>
                        <IconButton
                            size="xs"
                            aria-label="Add package item"
                            icon={<HeroIcon as={PlusIcon} />}
                        />
                    </UpdatePackageItem>
                </HStack>
            );
        },
    },
    {
        dataIndex: 'createdAt',
        key: 'createdAt',
        label: 'Ngày tạo',
        render: formatDate,
    },
    {
        dataIndex: 'id',
        isNumberic: true,
        key: 'action',
        label: '',
        render: (_, root) => (
            <MenuAction>
                <>
                    <UpdatePackage package={root}>
                        <MenuItem>Chỉnh sửa</MenuItem>
                    </UpdatePackage>
                </>
            </MenuAction>
        ),
    },
];

export default function PackgesPage() {
    const { data, isLoading } = usePackages();

    const packages = data?.packages;

    return (
        <DashboardLayout
            showHeading={false}
            title={TITLE_PAGE}
            breadcrumb={[{ label: TITLE_PAGE }]}
            type="admin"
        >
            <VStack align="stretch" spacing="5">
                <HStack>
                    <Heading>{TITLE_PAGE}</Heading>
                    <Spacer />
                    <UpdatePackage>
                        <Button
                            leftIcon={<HeroIcon as={PlusIcon} />}
                            colorScheme="blue"
                        >
                            Thêm
                        </Button>
                    </UpdatePackage>
                </HStack>
                <Card bodyProps={{ p: 0 }}>
                    <Table
                        data={packages}
                        columns={columns}
                        isLoading={isLoading}
                    />
                </Card>
            </VStack>
        </DashboardLayout>
    );
}
