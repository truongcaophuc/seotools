import {
    useAiSettingAppsQuery,
    useCreateAiSettingAppMutation,
    useSettingQuery,
    useUpdateSettingMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function useAiSettingApps() {
    return useAiSettingAppsQuery(client);
}

export function useAddOrEditAiSettingApp() {
    return useCreateAiSettingAppMutation(client);
}

export function useUpdateSetting() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();

    return useUpdateSettingMutation(client, {
        onError() {
            toastError('Cập nhật cài đặt không thành công');
        },
        onSuccess() {
            toastSuccess('Cập nhật cài đặt thành công');
            queryClient.invalidateQueries(['Setting']);
        },
    });
}

export function useSetting() {
    return useSettingQuery(client);
}
