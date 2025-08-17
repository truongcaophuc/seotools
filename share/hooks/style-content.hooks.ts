import {
    useDeleteStyleContentMutation,
    useStyleContentsQuery,
    useUpdateStyleContentMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useStyleContents() {
    return useStyleContentsQuery(client);
}

export function useUpdateStyleContent() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useUpdateStyleContentMutation(client, {
        onError() {
            toast.toastError('Thêm phong cách không thành công');
        },
        onSuccess() {
            toast.toastSuccess('Thêm phong cách thành công');
            queryClient.invalidateQueries(['StyleContents']);
        },
    });
}

export function useDeleteStyleContent() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useDeleteStyleContentMutation(client, {
        onError() {
            toast.toastError('Xoá phong cách không thành công');
        },
        onSuccess() {
            toast.toastSuccess('Xoá phong cách thành công');
            queryClient.invalidateQueries(['StyleContents']);
        },
    });
}
