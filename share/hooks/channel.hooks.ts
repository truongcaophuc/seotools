import {
    PageChannelsInputType,
    useConnectFacebookPageMutation,
    useDeletePageChannelMutation,
    usePageChannelsQuery,
    useSyncContentPageChannelMutation,
    useUpdatePageChannelMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function usePageChannels(input: PageChannelsInputType) {
    return usePageChannelsQuery(client, { input });
}

export function useConnectFacebookPage() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useConnectFacebookPageMutation(client, {
        onSuccess() {
            toast.toastSuccess('Liên kết fanpage thành công');
            queryClient.invalidateQueries(['PageChannels']);
        },
        onError() {
            // toast.toastError('Liên kết fanpage không thành công')
        },
    });
}

export function useSyncContentPageChannel() {
    return useSyncContentPageChannelMutation(client);
}

export function useUpdatePageChannel() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useUpdatePageChannelMutation(client, {
        onSuccess() {
            toast.toastSuccess('Cập nhật trang liên kết thành công');
            queryClient.invalidateQueries(['PageChannels']);
        },
        onError() {
            toast.toastError('Cập nhật trang liên kết không thành công');
        },
    });
}

export function useDeletePageChannel() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useDeletePageChannelMutation(client, {
        onSuccess() {
            toast.toastSuccess('Xoá trang liên kết thành công');
            queryClient.invalidateQueries(['PageChannels']);
        },
        onError() {
            toast.toastError('Xoá trang liên kết không thành công');
        },
    });
}
