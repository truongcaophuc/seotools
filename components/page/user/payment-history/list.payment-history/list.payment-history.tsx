import { Card } from '@components/ui';
import { usePagination } from '@share/hooks/pagination.hooks';
import { usePaymentHistoriesUser } from '@share/hooks/payment.hooks';
import { TablePaymentHistory } from '../table.payment-history';

export function ListPaymentHistory() {
    const { page, perPage, setPage, setPerPage } = usePagination();

    const { isLoading, data } = usePaymentHistoriesUser({ page, perPage });

    return (
        <Card bodyProps={{ p: 0 }}>
            <TablePaymentHistory
                isNo
                isLoading={isLoading}
                data={data?.paymentHistoriesUser?.data}
                pagination={{
                    values: data?.paymentHistoriesUser?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </Card>
    );
}
