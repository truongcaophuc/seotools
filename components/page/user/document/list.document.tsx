import {
    Button,
    Checkbox,
    HStack,
    MenuItem,
    Spacer,
    Text,
    TextProps,
} from '@chakra-ui/react';
import {
    Card,
    HeroIcon,
    MenuAction,
    SearchForm,
    Table,
    TColumn,
} from '@components/ui';
import {
    CreatedByInfoFragment,
    DocumentInfoFragment,
} from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useDocuments } from '@share/hooks/document.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { useState } from 'react';
import { TagKeyword } from '../keyword/tag.keyword';
import { DeleteDocument } from './delete.document';
import { NewDocument } from './new.document';

interface Props {
    projectId?: string;
}

export function ListDocument({ projectId }: Props) {
    const { t } = useTranslate();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const [search, setSearch] = useState<string>();
    const { isLoading, data } = useDocuments({
        page,
        perPage,
        search,
        projectId,
    });

    const columns: TColumn<DocumentInfoFragment> = [
        {
            key: 'title',
            dataIndex: 'title',
            label: t('posts.table.title'),
            render: (title, root) => {
                const label = title || t('posts.table.no_title');
                const textProps: TextProps = {
                    whiteSpace: 'normal',
                    noOfLines: 3,
                    _hover: {
                        textDecoration: 'underline',
                    },
                };

                if (!title) {
                    textProps.color = 'gray.300';
                }

                return (
                    <Text
                        as={Link}
                        href={`/user/document/${root.id}`}
                        {...textProps}
                    >
                        {label}
                    </Text>
                );
            },
        },
        {
            key: 'keyword',
            dataIndex: 'keyword',
            label: t('posts.table.keyword'),
            render: (keyword) => keyword && <TagKeyword keyword={keyword} />,
        },

        {
            key: 'url',
            dataIndex: 'url',
            label: t('posts.table.url'),
        },
        {
            key: 'hasDraft',
            dataIndex: 'hasDraft',
            label: t('posts.table.draft'),
            render: (value: boolean) => <Checkbox isChecked={value} />,
        },

        {
            key: 'createdBy',
            dataIndex: 'createdBy',
            label: t('posts.table.createdBy'),
            render: (value: CreatedByInfoFragment) => value?.fullname,
        },

        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            label: t('commons.table.createdAt'),
            render: formatDate,
        },

        {
            key: 'ation',
            dataIndex: 'id',
            label: '',
            isNumberic: true,
            render: (id) => (
                <MenuAction>
                    <>
                        <MenuItem as={Link} href={`/user/document/${id}`}>
                            {t('commons.detail')}
                        </MenuItem>
                        <DeleteDocument id={id}>
                            <MenuItem>{t('commons.delete')}</MenuItem>
                        </DeleteDocument>
                    </>
                </MenuAction>
            ),
        },
    ];
    return (
        <Card
            bgColor="white"
            bodyProps={{
                p: 0,
            }}
            headerProps={{
                children: (
                    <HStack>
                        <SearchForm onSearch={setSearch} />
                        <Spacer />
                        <NewDocument>
                            <Button
                                colorScheme="blue"
                                leftIcon={<HeroIcon as={PlusIcon} />}
                            >
                                {t('commons.add')}
                            </Button>
                        </NewDocument>
                    </HStack>
                ),
            }}
        >
            <Table
                isNo
                columns={columns}
                isLoading={isLoading}
                data={data?.documents?.data}
                pagination={{
                    values: data?.documents?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
