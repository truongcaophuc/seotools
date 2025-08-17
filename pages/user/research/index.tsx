import { Button, HStack, Spacer, Text } from '@chakra-ui/react';
import { DashboardLayout } from '@components/layout/dashboard';
import { ListEmbeddingDocument } from '@components/page/user/research/list.embedding.document';
import {
    Card,
    Heading,
    HeroIcon,
    MenuAction,
    MenuItem,
    NotPremium,
    Table,
    TColumn,
} from '@components/ui';
import {
    ConversationInfoFragment,
    ConversationType,
} from '@generated/graphql/query';
import {
    CloudArrowUpIcon,
    DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useConversations } from '@share/hooks/chatbot.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { usePremiumWorkspace } from '@share/hooks/workspace.hooks';
import Link from 'next/link';

export default function ResearchPage() {
    const { t } = useTranslate();
    const { page, perPage } = usePagination();
    const { data, isLoading } = useConversations({
        type: ConversationType.Research,
        page,
        perPage,
    });

    const TITLE_PAGE = t('research.title');

    const isPremium = usePremiumWorkspace();

    if (!isPremium) {
        return (
            <DashboardLayout
                showHeading={false}
                type="customer"
                title={TITLE_PAGE}
                breadcrumb={[{ label: TITLE_PAGE }]}
            >
                <NotPremium />
            </DashboardLayout>
        );
    }

    const conversations = data?.conversations?.data || [];
    const pagination = data?.conversations?.pagination;

    const columns: TColumn<ConversationInfoFragment> = [
        {
            key: 'title',
            dataIndex: 'title',
            label: t('research.table.name'),
            render: (value, root) => (
                <Text
                    w="250px"
                    whiteSpace="normal"
                    as={Link}
                    href={`/user/research/${root.id}`}
                    noOfLines={2}
                >
                    {value}
                </Text>
            ),
        },
        {
            key: 'createdAt',
            dataIndex: 'createdAt',
            label: t('commons.table.createdAt'),
            render: formatDate,
        },
        {
            key: 'action',
            dataIndex: 'id',
            label: '',
            isNumberic: true,
            render: (value) => {
                return (
                    <MenuAction>
                        <>
                            <MenuItem
                                icon={DocumentMagnifyingGlassIcon}
                                as={Link}
                                href={`/user/research/${value}`}
                            >
                                {t('research.research')}
                            </MenuItem>
                        </>
                    </MenuAction>
                );
            },
        },
    ];

    return (
        <DashboardLayout
            showHeading={false}
            type="customer"
            title={TITLE_PAGE}
            breadcrumb={[{ label: TITLE_PAGE }]}
        >
            <HStack>
                <Heading>{TITLE_PAGE}</Heading>
                <Spacer />
                <ListEmbeddingDocument>
                    <Button
                        size="sm"
                        colorScheme="blue"
                        leftIcon={<HeroIcon as={CloudArrowUpIcon} />}
                    >
                        {t('commons.sync')}
                    </Button>
                </ListEmbeddingDocument>
            </HStack>

            <Card bodyProps={{ p: 0 }}>
                <Table
                    isNo
                    data={conversations}
                    isLoading={isLoading}
                    columns={columns}
                    pagination={{
                        values: pagination,
                    }}
                />
            </Card>
        </DashboardLayout>
    );
}
