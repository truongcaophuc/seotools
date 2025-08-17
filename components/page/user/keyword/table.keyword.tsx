import {
    Button,
    HStack,
    Input,
    MenuItem,
    Tag,
    TagCloseButton,
    TagLabel,
    Text,
} from '@chakra-ui/react';
import {
    AddButton,
    FormField,
    MenuAction,
    Table,
    TableProps,
    TColumn,
} from '@components/ui';
import {
    KeywordInfoFragment,
    SubKeywordInfoFragment,
} from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { useDeleteKeyword, useUpdateKeyword } from '@share/hooks/keyword.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddKeyword } from './add.keyword';
import { DeleteKeyword } from './delete.keyword';

function TagKeyword({ keyword, isSub }: any) {
    const { isLoading, mutate } = useDeleteKeyword();

    function handleClick() {
        if (isLoading) {
            return;
        }

        mutate({ id: keyword.id });
    }

    return (
        <Tag colorScheme="green" key={keyword.id}>
            {isSub ? (
                <TagLabel>{keyword.value}</TagLabel>
            ) : (
                <TagLabel as={Link} href={`/user/keyword/${keyword.id}`}>
                    {keyword.value}
                </TagLabel>
            )}
            <TagCloseButton onClick={handleClick} />
        </Tag>
    );
}

type Props = Omit<TableProps<KeywordInfoFragment>, 'columns'> & {
    isSub?: boolean;
};

function ValueKeyword({ keyword }: { keyword: KeywordInfoFragment }) {
    const { t } = useTranslate();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const { isLoading, mutate } = useUpdateKeyword();
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        defaultValues: {
            value: keyword.value,
        },
    });

    const toggleEdit = () => setIsEdit((v) => !v);

    const onSubmit = handleSubmit((values) => {
        mutate(
            {
                input: {
                    id: keyword.id,
                    data: {
                        value: values.value,
                    },
                },
            },
            {
                onSuccess() {
                    toggleEdit();
                },
            }
        );
    });

    if (isEdit) {
        return (
            <HStack as="form" onSubmit={onSubmit} maxW="300px">
                <FormField error={errors?.value?.message}>
                    <Input
                        rounded="md"
                        size="sm"
                        autoFocus
                        {...register('value', {
                            required: '',
                        })}
                    />
                </FormField>
                <Button
                    size="sm"
                    isLoading={isLoading}
                    colorScheme="green"
                    type="submit"
                >
                    {t('commons.save')}
                </Button>
                <Button
                    disabled={isLoading}
                    onClick={toggleEdit}
                    type="button"
                    size="sm"
                >
                    {t('commons.cancel')}
                </Button>
            </HStack>
        );
    }

    return (
        <Text as="span" onClick={() => toggleEdit()}>
            {keyword.value}
        </Text>
    );
}

export function TableKeyword({ isSub, ...props }: Props) {
    const { t } = useTranslate();
    const columns: TColumn<KeywordInfoFragment> = [
        {
            dataIndex: 'value',
            key: 'value',
            label: t('keywords.table.keyword'),
            render: (_value, root) => {
                return <ValueKeyword keyword={root} />;
            },
        },
        {
            dataIndex: 'subKeywords',
            key: 'subKeywords',
            label: t('keywords.table.sub_keyword'),
            render: (value, root) => {
                return (
                    <>
                        <HStack>
                            {value.map((keyword: SubKeywordInfoFragment) => (
                                <TagKeyword
                                    isSub={isSub}
                                    keyword={keyword}
                                    key={keyword.id}
                                />
                            ))}
                            {isSub && !!root.parentKeyword ? null : (
                                <AddKeyword keywordId={root.id}>
                                    <AddButton
                                        size="xs"
                                        aria-label="Add keyword"
                                    />
                                </AddKeyword>
                            )}
                        </HStack>
                    </>
                );
            },
        },
        {
            dataIndex: 'createdAt',
            key: 'createdAt',
            label: t('commons.table.createdAt'),
            render: formatDate,
        },
        {
            dataIndex: 'id',
            key: 'action',
            label: '',
            isNumberic: true,
            render: function (value) {
                return (
                    <MenuAction>
                        <>
                            <DeleteKeyword keywordId={value}>
                                <MenuItem>{t('commons.delete')}</MenuItem>
                            </DeleteKeyword>
                        </>
                    </MenuAction>
                );
            },
        },
    ];
    return <Table {...props} isNo columns={columns} />;
}
