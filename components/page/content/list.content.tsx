import {
    Button,
    HStack,
    MenuItem,
    Spacer,
    Text,
    VStack,
} from '@chakra-ui/react';
import {
    Card,
    HeroIcon,
    LexicalComposerInit,
    MenuAction,
    SearchForm,
    Table,
    TColumn,
} from '@components/ui';
import {
    ContentInfoFragment,
    CreatedByInfoFragment,
    ServiceInfoFragment,
} from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useContents } from '@share/hooks/content.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { useState } from 'react';
import { CopyContent } from './copy.content';
import { DeleteContent } from './delete.content';
import { SyncContent } from './sync.content';

export function ListContent() {
    const { t } = useTranslate();
    const [search, setSearch] = useState<string>();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const { isLoading, data } = useContents({ page, perPage, search });

    const columns: TColumn<ContentInfoFragment> = [
        {
            key: 'title',
            label: t('contents.table.title'),
            dataIndex: 'title',
            render: (_, { title, id }) => (
                <Text
                    as={Link}
                    _hover={{
                        textDecoration: 'underline',
                    }}
                    href={`/user/content/${id}`}
                >
                    {title}
                </Text>
            ),
        },
        {
            key: 'link',
            dataIndex: 'link',
            label: t('contents.table.url'),
        },
        {
            key: 'createdBy',
            label: t('contents.table.createdBy'),
            dataIndex: 'createdBy',
            render: (value: CreatedByInfoFragment) => value?.fullname,
        },
        {
            key: 'service',
            label: t('contents.table.service'),
            dataIndex: 'service',
            render: (value: ServiceInfoFragment) => value?.title,
        },
        {
            key: 'createdAt',
            label: t('commons.table.createdAt'),
            dataIndex: 'createdAt',
            isNumberic: true,
            render: formatDate,
        },
        {
            key: 'action',
            label: '',
            dataIndex: 'id',
            isNumberic: true,
            render: (id, root) => {
                return (
                    <LexicalComposerInit content={root?.content}>
                        <MenuAction>
                            <>
                                <MenuItem
                                    as={Link}
                                    href={`/user/content/${id}`}
                                >
                                    {t('commons.edit')}
                                </MenuItem>
                                <CopyContent type="text">
                                    <MenuItem>
                                        {t('contents.copy_content')}
                                    </MenuItem>
                                </CopyContent>
                                <CopyContent type="html">
                                    <MenuItem>
                                        {t('contents.copy_html')}
                                    </MenuItem>
                                </CopyContent>
                                <SyncContent contentId={id}>
                                    <MenuItem>{t('commons.sync')}</MenuItem>
                                </SyncContent>
                                <DeleteContent contentId={id}>
                                    <MenuItem>{t('commons.delete')}</MenuItem>
                                </DeleteContent>
                            </>
                        </MenuAction>
                    </LexicalComposerInit>
                );
            },
        },
    ];

    return (
        <VStack spacing="5" align="stretch">
            <HStack>
                <SearchForm onSearch={setSearch} />
                <Spacer />
                <Button
                    aria-label="Add content"
                    leftIcon={<HeroIcon as={PlusIcon} />}
                    as={Link}
                    href="/user/ai"
                    colorScheme="blue"
                >
                    {t('commons.add')}
                </Button>
            </HStack>
            <Card bgColor="white" bodyProps={{ p: 0 }}>
                <Table
                    isNo
                    columns={columns}
                    isLoading={isLoading}
                    data={data?.contents?.data}
                    pagination={{
                        values: data?.contents?.pagination,
                        onChangePage: setPage,
                        onChangePerPage: setPerPage,
                    }}
                />
            </Card>
        </VStack>
    );
}
