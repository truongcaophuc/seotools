import {
    ContentsInputType,
    useContentQuery,
    useContentsQuery,
    useDeleteContentMutation,
    useUpdateContentMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useContents(input: ContentsInputType) {
    return useContentsQuery(client, { input });
}

export function useContent(id?: string) {
    return useContentQuery(client, { id }, { enabled: !!id });
}

export function useUpdateContent() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useUpdateContentMutation(client, {
        onError() {
            toast.toastError('Lỗi cập nhật nội dung');
        },
        onSuccess() {
            toast.toastSuccess('Cập nhật nội dung thành công');

            queryClient.invalidateQueries(['Contents']);
        },
    });
}

export function useDeleteContent() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useDeleteContentMutation(client, {
        onError() {
            toast.toastError('Lỗi xoá nội dung');
        },
        onSuccess() {
            toast.toastSuccess('Xoá nội dung thành công');

            queryClient.invalidateQueries(['Contents']);
        },
    });
}
