import { useDisclosure } from '@chakra-ui/react';
import { Modal } from '@components/ui';
import { KeywordInfoFragment } from '@generated/graphql/query';
import { useKeywords } from '@share/hooks/keyword.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { cloneElement, ReactElement } from 'react';
import { TableKeyword } from './table.keyword';

interface Props {
    children: ReactElement;
    onSelect: (keyword: KeywordInfoFragment) => void;
}

export function SelectKeyword({ children, onSelect }: Props) {
    const { isOpen, onToggle } = useDisclosure();
    const { page, setPage, perPage, setPerPage } = usePagination();
    const { isLoading, data } = useKeywords({ page, perPage });

    function handleRowClick(keyword: KeywordInfoFragment) {
        onSelect(keyword);
        onToggle();
    }

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}

            <Modal
                bodyProps={{ p: 0 }}
                title="Chọn từ khoá"
                isOpen={isOpen}
                size="3xl"
                onClose={onToggle}
            >
                <TableKeyword
                    onRowClick={handleRowClick}
                    data={data?.keywords?.data}
                    isLoading={isLoading}
                    pagination={{
                        values: data?.keywords?.pagination,
                        onChangePage: setPage,
                        onChangePerPage: setPerPage,
                    }}
                />
            </Modal>
        </>
    );
}
