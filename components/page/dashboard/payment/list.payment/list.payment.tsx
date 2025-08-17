import { Card } from '@components/ui';
import { usePagination } from '@share/hooks/pagination.hooks';
import { usePaymentHistoriesAdmin } from '@share/hooks/payment.hooks';
import { TablePayment } from '../table.payment';

export function ListPayment() {
    const { page, perPage, setPage, setPerPage } = usePagination();

    const { isLoading, data } = usePaymentHistoriesAdmin({
        page,
        perPage,
    });

    return (
        <Card bodyProps={{ p: 0 }}>
            <TablePayment
                data={data?.paymentHistoriesAdmin?.data}
                pagination={{
                    values: data?.paymentHistoriesAdmin?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
                isNo
                isLoading={isLoading}
            />
        </Card>
    );
}
