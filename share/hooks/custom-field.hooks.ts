import {
    useAddCustomFieldMutation,
    useCustomFieldsQuery,
    useDeleteCustomFieldMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useCustomFields() {
    return useCustomFieldsQuery(client);
}

export function useAddCustomField() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useAddCustomFieldMutation(client, {
        onError() {
            toast.toastError('Lỗi cập nhật Custom field');
        },
        onSuccess() {
            toast.toastSuccess('Cập nhật Custom field thành công');

            queryClient.invalidateQueries(['CustomFields']);
        },
    });
}

export function useDeleteCustomField() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useDeleteCustomFieldMutation(client, {
        onError() {
            toast.toastError('Lỗi xoá Custom field');
        },
        onSuccess() {
            toast.toastSuccess('Xoá Custom field thành công');

            queryClient.invalidateQueries(['CustomFields']);
        },
    });
}
