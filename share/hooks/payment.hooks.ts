import {
    PaymentHistoriesAdminInputType,
    PaymentHistoriesInputType,
    useCancelPaymentHistoryMutation,
    useConfirmPaymentHistoryMutation,
    useCreatePaymentHistoryMutation,
    useDeletePaymentHistoryMutation,
    usePaymentHistoriesAdminQuery,
    usePaymentHistoriesUserQuery,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useCreatePaymentHistory() {
    const { toastSuccess, toastError } = useToast();
    return useCreatePaymentHistoryMutation(client, {
        onError() {
            toastError('Thanh toán không thành công');
        },
        onSuccess() {
            toastSuccess('Thanh toán thành công');
        },
    });
}

export function usePaymentHistoriesUser(input: PaymentHistoriesInputType) {
    return usePaymentHistoriesUserQuery(client, { input });
}

export function usePaymentHistoriesAdmin(
    input: PaymentHistoriesAdminInputType
) {
    return usePaymentHistoriesAdminQuery(client, { input });
}

export function useConfirmPayment() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();
    return useConfirmPaymentHistoryMutation(client, {
        onError() {
            toastError('Xác nhận thanh toán không thành công');
        },
        onSuccess() {
            toastSuccess('Xác nhận thanh toán thành công');
            queryClient.invalidateQueries(['PaymentHistoriesAdmin']);
        },
    });
}

export function useCancelPayment() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();
    return useCancelPaymentHistoryMutation(client, {
        onError() {
            toastError('Huỷ thanh toán không thành công');
        },
        onSuccess() {
            toastSuccess('Huỷ thanh toán thành công');
            queryClient.invalidateQueries(['PaymentHistoriesAdmin']);
        },
    });
}

export function useDeletePayment() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();
    return useDeletePaymentHistoryMutation(client, {
        onError() {
            toastError('Xoá thanh toán không thành công');
        },
        onSuccess() {
            toastSuccess('Xoá thanh toán thành công');
            queryClient.invalidateQueries(['PaymentHistoriesAdmin']);
        },
    });
}
