import {
    Box,
    Center,
    HStack,
    Spinner,
    Table as TableUi,
    TableContainer,
    type TableProps as TableUIProps,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useRouter } from 'next/router';
import { ReactElement, useEffect } from 'react';
import { Pagination, PaginationProps } from '../pagination';
// import { ActionsSelect, IActionSelectTable } from './actions.select';
import { CheckboxTd } from './checkbox.td';
import { CheckboxTh } from './checkbox.th';
import { NoData } from './no-data';
import { useStoreTable } from './store.table';

type ColumItem<T> = {
    key: string;
    width?: string;
    dataIndex?: keyof T;
    label: string;
    isNumberic?: boolean;
    render?: (
        data: any,
        root: T,
        index: number
    ) => ReactElement | string | number;
};

export type TColumn<T> = Array<ColumItem<T>>;

export interface TableProps<T> extends TableUIProps {
    isLoading?: boolean;
    data: Array<T>;
    columns: TColumn<T>;
    onRowClick?: (item: T) => void;
    isSelect?: boolean;
    isNo?: boolean;
    // actionsSelect?: Array<IActionSelectTable>;
    pagination?: PaginationProps;
    onSelectData?: (data: { selected: Array<T> }) => void;
}

export const Table = <T extends { id?: string }>({
    isLoading,
    data = [],
    columns,
    onRowClick,
    isSelect,
    // actionsSelect,
    isNo,
    pagination,
    onSelectData,
    ...rest
}: TableProps<T>) => {
    const { t } = useTranslate();
    const { selected, onSelect, reset } = useStoreTable<T>();

    const router = useRouter();

    useEffect(() => {
        if (onSelectData) {
            onSelectData({ selected });
        }
    }, [selected, onSelectData]);

    useEffect(() => {
        reset();
    }, [router.pathname]);

    const renderTr = () => {
        const hasColumnFirst = isSelect || isNo ? 1 : 0;
        const columnLength = columns.length + hasColumnFirst;

        if (data.length === 0) {
            return (
                <Tr>
                    <Td border="none" colSpan={columnLength}>
                        <NoData />
                    </Td>
                </Tr>
            );
        }

        return data.map((item, index) => {
            const handleRowClick = () => {
                if (onRowClick) onRowClick(item);
            };

            const handleSelect = (value: boolean) => {
                const items = value
                    ? [...selected, item]
                    : selected.filter((i) => i.id !== item.id);
                onSelect(items);
            };

            const renderFistTd = () => {
                if (isSelect) {
                    return (
                        <Td>
                            <CheckboxTd
                                itemId={item.id}
                                onSelect={handleSelect}
                            />
                        </Td>
                    );
                }
                if (isNo) {
                    return (
                        <Td
                            fontSize="sm"
                            fontWeight="medium"
                            color="gray.500"
                            textAlign="center"
                        >
                            {index +
                                1 +
                                pagination?.values?.perPage *
                                    (pagination?.values?.page - 1)}
                        </Td>
                    );
                }
                return null;
            };

            return (
                <Tr
                    key={index}
                    onClick={handleRowClick}
                    cursor={onRowClick ? 'pointer' : 'auto'}
                    color="gray.500"
                    fontSize="sm"
                    fontWeight="medium"
                >
                    {renderFistTd()}
                    {columns.map((column) => {
                        const { isNumberic, dataIndex, render, key } = column;
                        const data = dataIndex ? item[dataIndex] : undefined;

                        if (dataIndex) {
                            if (!render) {
                                return (
                                    <Td key={key} isNumeric={isNumberic}>
                                        {/* @ts-ignore */}
                                        {item[dataIndex]}
                                    </Td>
                                );
                            }
                            return (
                                <Td key={key} isNumeric={isNumberic}>
                                    {render(data, item, index)}
                                </Td>
                            );
                        }

                        return (
                            <Td isNumeric={isNumberic} key={column.key}>
                                {render(data, item, index)}
                            </Td>
                        );
                    })}
                </Tr>
            );
        });
    };

    const handleSelectAll = (value: boolean) => {
        const items = value ? data : [];
        onSelect(items);
    };

    const renderFirstTh = () => {
        if (isSelect) {
            return (
                <Th>
                    <HStack>
                        <CheckboxTh
                            onChange={handleSelectAll}
                            totalItem={data.length}
                        />
                    </HStack>
                </Th>
            );
        }
        if (isNo) {
            return (
                <Th fontSize="xs" width="40px" textAlign="center">
                    {t('commons.table.no')}
                </Th>
            );
        }
    };

    return (
        <Box pos="relative">
            {isLoading ? (
                <Center
                    zIndex="modal"
                    pos="absolute"
                    inset="0"
                    bgColor="whiteAlpha.700"
                >
                    <Spinner />
                </Center>
            ) : null}

            <TableContainer overflowY="auto">
                <TableUi {...rest}>
                    <Thead>
                        <Tr>
                            {renderFirstTh()}
                            {columns.map(({ isNumberic, key, label }) => (
                                <Th
                                    fontSize="xs"
                                    isNumeric={isNumberic}
                                    key={key}
                                >
                                    {label}
                                </Th>
                            ))}
                        </Tr>
                    </Thead>
                    <Tbody>{renderTr()}</Tbody>
                    {!isLoading &&
                    pagination &&
                    pagination?.values?.total > 0 ? (
                        <Tfoot>
                            <Tr>
                                <Td
                                    bgColor="gray.50"
                                    py="2"
                                    border="none"
                                    roundedBottomLeft="lg"
                                    colSpan={columns.length + 1}
                                >
                                    <Pagination {...pagination} />
                                </Td>
                            </Tr>
                        </Tfoot>
                    ) : null}
                </TableUi>
            </TableContainer>
        </Box>
    );
};
