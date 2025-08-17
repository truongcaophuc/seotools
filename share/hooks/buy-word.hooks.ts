import {
    ListBuyWordAdminInputType,
    useConfirmRequestBuyWordMutation,
    useListBuyWordAdminQuery,
    useRequestBuyWordMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useToast } from './useToast';
import { useQueryClient } from '@tanstack/react-query';

export function useListBuyWord(input: ListBuyWordAdminInputType) {
    return useListBuyWordAdminQuery(client, { input });
}

export function useRequestBuyWord() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useRequestBuyWordMutation(client, {
        onSuccess() {
            toast.toastSuccess('Gửi yêu cầu mua từ thành công');
            queryClient.invalidateQueries(['ListBuyWord']);
        },
        onError() {
            toast.toastError('Gửi yêu cầu mua từ không thành công');
        },
    });
}

export function useConfirmRequestBuyWord() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useConfirmRequestBuyWordMutation(client, {
        onSuccess() {
            toast.toastSuccess('Xác nhận khách hàng mua từ thành công');
            queryClient.invalidateQueries(['ListBuyWord']);
        },
        onError() {
            toast.toastError('Xác nhận khách hàng mua từ không thành công');
        },
    });
}
