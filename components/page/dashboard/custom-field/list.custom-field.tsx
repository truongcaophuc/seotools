import {
    HStack,
    Icon,
    IconButton,
    MenuItem,
    Spacer,
    Tag,
} from '@chakra-ui/react';
import {
    Card,
    MenuAction,
    SearchForm,
    Table,
    TColumn,
    WarningModal,
} from '@components/ui';
import { CustomFieldInfoFragment } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import {
    useCustomFields,
    useDeleteCustomField,
} from '@share/hooks/custom-field.hooks';
import { ReactElement } from 'react';
import { AddCustomField } from './add.custom-field';

function DeleteCustomField({
    children,
    customFieldId,
}: {
    children: ReactElement;
    customFieldId: string;
}) {
    const { isLoading, isSuccess, mutate } = useDeleteCustomField();
    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            content="Bạn chắc chắn muốn xoá Custom Field?"
            type="warning"
            okProps={{
                async onOk() {
                    mutate({ id: customFieldId });
                },
            }}
        >
            {children}
        </WarningModal>
    );
}

const columns: TColumn<CustomFieldInfoFragment> = [
    { key: 'title', dataIndex: 'title', label: 'Tên' },
    {
        key: 'field',
        dataIndex: 'field',
        label: 'Nội dung',
        render: (field) => <Tag>{field}</Tag>,
    },
    {
        key: 'inputType',
        dataIndex: 'inputType',
        label: 'Loại input',
    },
    { key: 'description', dataIndex: 'description', label: 'Mô tả' },
    {
        key: 'action',
        dataIndex: 'id',
        label: '',
        isNumberic: true,
        render: (id, root) => (
            <MenuAction>
                <>
                    <AddCustomField customField={root}>
                        <MenuItem>Chỉnh sửa</MenuItem>
                    </AddCustomField>
                    <DeleteCustomField customFieldId={id}>
                        <MenuItem>Xoá</MenuItem>
                    </DeleteCustomField>
                </>
            </MenuAction>
        ),
    },
];

export function ListCustomField() {
    const { isLoading, data } = useCustomFields();
    return (
        <Card
            bodyProps={{ p: 0 }}
            bgColor="white"
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={() => {}} />
                        <Spacer />
                        <AddCustomField>
                            <IconButton
                                aria-label="Add"
                                icon={<Icon as={PlusIcon} boxSize="5" />}
                            />
                        </AddCustomField>
                    </HStack>
                ),
            }}
        >
            <Table
                isNo
                columns={columns}
                isLoading={isLoading}
                data={data?.customFields}
                pagination={{
                    values: {
                        page: 1,
                        perPage: 15,
                        total: data?.customFields?.length,
                    },
                }}
            />
        </Card>
    );
}
