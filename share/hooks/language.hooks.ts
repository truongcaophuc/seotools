import {
    useDeleteLanguageMutation,
    useLanguagesQuery,
    useUpdateLanguageMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useLanguages() {
    return useLanguagesQuery(client);
}

export function useUpdateLanguage() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useUpdateLanguageMutation(client, {
        onError() {
            toast.toastError('Thêm ngôn ngữ không thành công');
        },
        onSuccess() {
            toast.toastSuccess('Thêm ngôn ngữ thành công');
            queryClient.invalidateQueries(['Languages']);
        },
    });
}

export function useDeleteLanguage() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useDeleteLanguageMutation(client, {
        onError() {
            toast.toastError('Xoá ngôn ngữ không thành công');
        },
        onSuccess() {
            toast.toastSuccess('Xoá ngôn ngữ thành công');
            queryClient.invalidateQueries(['Languages']);
        },
    });
}
