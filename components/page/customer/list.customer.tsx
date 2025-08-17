import {
    Avatar,
    Badge,
    Button,
    Checkbox,
    HStack,
    IconButton,
    Input,
    Spacer,
    Switch,
    Text,
    useDisclosure,
    useNumberInput,
    VStack,
} from '@chakra-ui/react';
import {
    Card,
    EditBtn,
    FormField,
    HeroIcon,
    Modal,
    SearchForm,
    Table,
    TColumn,
} from '@components/ui';
import {
    UserInfoFragment,
    WorkspaceInfoFragment,
} from '@generated/graphql/query';
import {
    CheckIcon,
    Cog6ToothIcon,
    PencilSquareIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { formatMoney } from '@share/helps/format-number';
import { useCustomers } from '@share/hooks/customer.hooks';
import {
    useChangeExpiredTimeWorkspace,
    useUpdateWorkspaceAdmin,
} from '@share/hooks/workspace.hooks';
import { useCustomerStore } from '@share/store/customer.store';
import moment from 'moment';
import { useForm } from 'react-hook-form';

function EditWorkspace({ workspace }: { workspace: WorkspaceInfoFragment }) {
    const { isOpen, onClose, onOpen } = useDisclosure();

    const { isLoading, mutate } = useUpdateWorkspaceAdmin();

    const { getInputProps } = useNumberInput({
        step: 1,
        defaultValue: Math.round(workspace?.balance) || 0,
        min: 0,
    });

    const { handleSubmit, register, reset } = useForm<{ isTrial: boolean }>({
        defaultValues: {
            isTrial: workspace?.isTrial,
        },
    });

    const input = getInputProps();

    const onSubmit = handleSubmit((data) => {
        console.log(data, input);
        mutate(
            {
                input: {
                    id: workspace.id,
                    balance: +input.value,
                    isTrial: data.isTrial,
                },
            },
            {
                onSuccess() {
                    reset();
                    onClose();
                },
            }
        );
    });

    return (
        <>
            <IconButton
                size="xs"
                aria-label="Edit workspace"
                onClick={onOpen}
                icon={<HeroIcon as={PencilSquareIcon} />}
            />
            <Modal title="Cập nhật workspace" isOpen={isOpen} onClose={onClose}>
                <VStack
                    spacing="5"
                    align="stretch"
                    as="form"
                    onSubmit={onSubmit}
                >
                    <FormField label="Balance">
                        <Input {...input} />
                    </FormField>
                    <FormField>
                        <Checkbox {...register('isTrial')}>Trial</Checkbox>
                    </FormField>
                    <HStack>
                        <Spacer />
                        <Button
                            isDisabled={isLoading}
                            type="button"
                            variant="ghost"
                        >
                            Huỷ
                        </Button>
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            colorScheme="green"
                        >
                            Lưu
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}

function WorkspaceExpired({ workspace }: { workspace: WorkspaceInfoFragment }) {
    const { isLoading, mutate } = useChangeExpiredTimeWorkspace();
    const { isOpen, onToggle } = useDisclosure();

    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            // expiredAt: workspace.expiredAt
            //     ? moment(workspace.expiredAt).format('YYYY-MM-DD')
            //     : undefined,

            expiredAt: moment(workspace.expiredAt).format('YYYY-MM-DD'),
        },
    });

    const onSubmit = handleSubmit((data) => {
        const expiredAt = new Date(
            moment(data.expiredAt, 'YYYY-MM-DD').valueOf()
        ).toISOString();

        mutate(
            {
                input: {
                    workspaceId: workspace.id,
                    expiredAt,
                },
            },
            {
                onSuccess() {
                    reset();
                    onToggle();
                },
            }
        );
    });

    if (isOpen) {
        return (
            <HStack as="form" onSubmit={onSubmit}>
                <Input
                    {...register('expiredAt')}
                    size="sm"
                    rounded="md"
                    type="date"
                />

                <IconButton
                    aria-label="Cancel"
                    type="submit"
                    colorScheme="green"
                    size="sm"
                    icon={<HeroIcon as={CheckIcon} />}
                />
                <IconButton
                    aria-label="Save"
                    type="button"
                    colorScheme="red"
                    size="sm"
                    icon={<HeroIcon as={XMarkIcon} />}
                />
            </HStack>
        );
    }

    return (
        <HStack>
            {workspace?.expiredAt ? (
                <Text as="span">{formatDate(workspace.expiredAt)}</Text>
            ) : null}

            <IconButton
                aria-label="Edit"
                onClick={onToggle}
                size="sm"
                icon={<HeroIcon as={Cog6ToothIcon} />}
            />
        </HStack>
    );
}

const columns: TColumn<UserInfoFragment> = [
    {
        key: 'fullname',
        dataIndex: 'fullname',
        label: 'Tên',
        render: (fullname, root) => {
            return (
                <HStack>
                    <Avatar name={fullname} size="sm"></Avatar>
                    <VStack align="stretch" spacing="0">
                        <Text fontWeight="semibold" color="gray.700">
                            {fullname}
                        </Text>
                        <Text as="span">{root.email}</Text>
                        <Text as="span">{root.phoneNumber}</Text>
                    </VStack>
                </HStack>
            );
        },
    },
    {
        key: 'workspace',
        dataIndex: 'workspace',
        label: 'Workspace',
        render: (workspace: WorkspaceInfoFragment) => (
            <VStack align="stretch" spacing="0">
                <HStack>
                    <Text color="gray.700">{workspace.name}</Text>
                    {workspace?.isTrial ? (
                        <Badge colorScheme="red">Trial</Badge>
                    ) : null}
                    <EditWorkspace workspace={workspace} />
                </HStack>
                <Text as="span">{formatMoney(workspace?.balance)}</Text>{' '}
                {workspace?.isTrial ? (
                    <Text>
                        Thời gian còn lại:
                        {workspace.timeTrial}
                    </Text>
                ) : null}
            </VStack>
        ),
    },
    {
        key: 'status',
        dataIndex: 'active',
        label: 'Trạng thái',
        render: (active) => <Switch isChecked={active} />,
    },
    {
        key: 'expiredAt',
        dataIndex: 'workspace',
        label: 'Hết hạn',
        render: (workspace: WorkspaceInfoFragment) => (
            <WorkspaceExpired workspace={workspace} />
        ),
    },
    {
        key: 'createdAt',
        dataIndex: 'createdAt',
        label: 'Ngày tạo',
        render: (date) => formatDate(date),
    },
    {
        key: 'action',
        dataIndex: 'id',
        label: '',
        isNumberic: true,
        render: (_id) => {
            return (
                <HStack justify="flex-end">
                    <EditBtn />
                </HStack>
            );
        },
    },
];

export function ListCustomer() {
    const search = useCustomerStore((state) => state.search);
    const setSearch = useCustomerStore((state) => state.setSearch);
    const page = useCustomerStore((state) => state.page);
    const setPage = useCustomerStore((state) => state.setPage);
    const perPage = useCustomerStore((state) => state.perPage);
    const setPerPage = useCustomerStore((state) => state.setPerPage);

    const { isLoading, data } = useCustomers({ search, page, perPage });

    return (
        <Card
            bodyProps={{ p: 0 }}
            bgColor="white"
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={setSearch} />
                        <Spacer />
                        {
                            // <Button
                            //     as={Link}
                            //     href="/dashboard/customer/new"
                            //     leftIcon={<Icon as={UserPlusIcon} boxSize="5" />}
                            //     colorScheme="blue"
                            // >
                            //     Thêm
                            // </Button>
                        }
                    </HStack>
                ),
            }}
        >
            <Table
                isNo
                columns={columns}
                isLoading={isLoading}
                data={data?.users.data}
                pagination={{
                    values: data?.users?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
