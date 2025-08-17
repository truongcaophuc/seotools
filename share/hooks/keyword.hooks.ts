import {
    KeywordsInputType,
    SubKeywordsInputType,
    useAddKeywordMutation,
    useDeleteKeywordMutation,
    useKeywordQuery,
    useKeywordsQuery,
    useSubKeywordsQuery,
    useUpdateKeywordMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useAddKeyword() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    return useAddKeywordMutation(client, {
        onSuccess() {
            toastSuccess('Thêm từ khoá thành công');
            queryClient.invalidateQueries(['Keywords']);
            queryClient.invalidateQueries(['SubKeywords']);
        },
        onError() {
            toastError('Lỗi thêm từ khoá thành công');
        },
    });
}

export function useUpdateKeyword() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    return useUpdateKeywordMutation(client, {
        onSuccess() {
            toastSuccess('Cập nhật từ khoá thành công');
            queryClient.invalidateQueries(['Keywords']);
        },
        onError() {
            toastError('Lỗi cập nhật từ khoá thành công');
        },
    });
}

export function useDeleteKeyword() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    return useDeleteKeywordMutation(client, {
        onSuccess() {
            toastSuccess('Xoá từ khoá thành công');
            queryClient.invalidateQueries(['Keywords']);
            queryClient.invalidateQueries(['SubKeywords']);
        },
        onError() {
            toastError('Lỗi xoá từ khoá thành công');
        },
    });
}

export function useKeywords(input: KeywordsInputType) {
    return useKeywordsQuery(client, {
        input,
    });
}

export function useSubKeywords(input: SubKeywordsInputType) {
    return useSubKeywordsQuery(client, {
        input,
    });
}

export function useKeyword(keywordId?: string) {
    return useKeywordQuery(
        client,
        {
            id: keywordId,
        },
        { enabled: !!keywordId }
    );
}
