import { Card } from '@components/ui';
import { useSubKeywords } from '@share/hooks/keyword.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useState } from 'react';
import { TableKeyword } from './table.keyword';

interface Props {
    keywordId: string;
}

export function SubKeyword({ keywordId }: Props) {
    const { page, perPage, setPage, setPerPage } = usePagination();
    const [search, setSearch] = useState<string>();

    const { isLoading, data } = useSubKeywords({
        parentId: keywordId,
        query: {
            page,
            perPage,
            search,
        },
    });

    return (
        <Card bodyProps={{ p: 0 }}>
            <TableKeyword
                isSub
                isLoading={isLoading}
                data={data?.subKeywords?.data}
                pagination={{
                    values: data?.subKeywords?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
