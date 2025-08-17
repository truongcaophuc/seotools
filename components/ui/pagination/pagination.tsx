import {
    Box,
    HStack,
    Icon,
    IconButton,
    NumberInput,
    NumberInputField,
    Select,
    Spacer,
    Text,
} from '@chakra-ui/react';
import { PaginationInfoFragment } from '@generated/graphql/query';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ChangeEvent } from 'react';

export interface PaginationProps {
    values: Partial<Pick<PaginationInfoFragment, 'total' | 'page' | 'perPage'>>;
    onChangePage?: (page: number) => void;
    onChangePerPage?: (value: number) => void;
}

export function Pagination({
    values,
    onChangePage,
    onChangePerPage,
}: PaginationProps) {
    const { t } = useTranslate();

    const handleNext = () => {
        if (values.total === 1) return;
        onChangePage(values.page + 1);
    };
    const handlePrev = () => {
        onChangePage(values.page - 1);
    };

    const handleChangePerPage = (value: number) => {
        if (onChangePerPage) {
            onChangePerPage(value);
        }
    };

    if (!values || values.total === 0) {
        return null;
    }

    const { total, page, perPage } = values;

    const firstNumberPage = (page - 1) * perPage + 1;
    const afterNumberPage =
        total < perPage ? total : firstNumberPage - 1 + perPage;
    const disabledNext = page === Math.ceil(total / perPage);
    const disabledPrev = page === 1;

    return (
        <HStack>
            <Text color="gray" fontWeight="medium" fontSize="sm">
                {`${t('commons.pagination.show')} ${firstNumberPage} ${t(
                    'commons.pagination.to'
                )} ${afterNumberPage} ${t('commons.pagination.of')} ${total}`}
            </Text>
            <Spacer />
            <HStack>
                <Text fontSize="sm" color="gray" fontWeight="medium">
                    {t('commons.pagination.page')}
                </Text>
                <HStack>
                    <IconButton
                        disabled={page === 1}
                        isDisabled={disabledPrev}
                        onClick={handlePrev}
                        size="sm"
                        icon={<Icon as={ChevronLeftIcon} />}
                        aria-label="Left"
                    />
                    <NumberInput
                        onChange={(value) => {
                            if (disabledNext || disabledPrev) return;
                            onChangePage(+value);
                        }}
                        value={page}
                        size="sm"
                        min={1}
                        rounded="md"
                    >
                        <NumberInputField width="80px" rounded="md" />
                    </NumberInput>
                    <IconButton
                        isDisabled={disabledNext}
                        onClick={handleNext}
                        size="sm"
                        icon={<Icon as={ChevronRightIcon} />}
                        aria-label="Left"
                    />
                </HStack>
                <Box>
                    <PerPage perPage={perPage} onChange={handleChangePerPage} />
                </Box>
            </HStack>
        </HStack>
    );
}

interface PerPageProps {
    perPage?: number;
    onChange: (perPage: number) => void;
}

export function PerPage({ onChange, perPage = 25 }: PerPageProps) {
    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        onChange(+e.target.value);
    };

    return (
        <Select value={perPage} size="sm" rounded="md" onChange={handleChange}>
            <option value="15">15</option>
            <option value="25">25</option>
            <option value="50">50</option>
        </Select>
    );
}
