import {
    useAddCustomerMutation,
    useAddMemberMutation,
    useDeleteMemberMutation,
    UsersInputType,
    useUsersQuery,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useCustomers(input: UsersInputType) {
    return useUsersQuery(client, { input });
}

export function useAddCustomer() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useAddCustomerMutation(client, {
        onError() {
            toast.toastError('Lỗi thêm khách hàng');
        },
        onSuccess() {
            toast.toastSuccess('Thêm khách hàng thành công');

            queryClient.invalidateQueries(['Users']);
        },
    });
}

export function useAddMember() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useAddMemberMutation(client, {
        onError() {
            toast.toastError('Lỗi thêm thành viên');
        },
        onSuccess() {
            toast.toastSuccess('Thêm thành viên thành công');

            queryClient.invalidateQueries(['Team']);
        },
    });
}

export function useDeleteMember() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useDeleteMemberMutation(client, {
        onError() {
            toast.toastError('Lỗi thêm thành viên');
        },
        onSuccess() {
            toast.toastSuccess('Thêm thành viên thành công');

            queryClient.invalidateQueries(['Team']);
        },
    });
}
