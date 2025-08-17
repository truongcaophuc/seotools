import {
    PackageType,
    useChangeExpiredTimeWorkspaceMutation,
    usePayContentAiMutation,
    usePayRequestAiContentMutation,
    useUpdateTimeUseGpt4Mutation,
    useUpdateWorkspaceAdminMutation,
    useUpdateWorkspaceMutation,
    WorkspaceInfoFragment,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useAuthStore } from '@share/store/auth.store';
import { useQueryClient } from '@tanstack/react-query';
import moment from 'moment';
import { useToast } from './useToast';

export function useUpdateWorkspace() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();

    return useUpdateWorkspaceMutation(client, {
        onError() {
            toastError('Cập nhật workspace không thành công');
        },
        onSuccess() {
            toastSuccess('Cập nhật workspace thành công');
            queryClient.invalidateQueries(['Me']);
        },
    });
}

export function useUpdateWorkspaceAdmin() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();

    return useUpdateWorkspaceAdminMutation(client, {
        onError() {
            toastError('Cập nhật workspace không thành công');
        },
        onSuccess() {
            toastSuccess('Cập nhật workspace thành công');
            queryClient.invalidateQueries(['Users']);
        },
    });
}

export function usePayRequestAiContent() {
    return usePayRequestAiContentMutation(client);
}

export function usePayContentAI() {
    return usePayContentAiMutation(client);
}

export function useChangeExpiredTimeWorkspace() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();

    return useChangeExpiredTimeWorkspaceMutation(client, {
        onError() {
            toastError('Cập nhật workspace không thành công');
        },
        onSuccess() {
            toastSuccess('Cập nhật workspace thành công');
            queryClient.invalidateQueries(['Users']);
        },
    });
}

export function useExpiredWorkspace(
    workspace?: WorkspaceInfoFragment
): Partial<{
    isNotWorkspacePackage: boolean;
    isExpiredPackage: boolean;
    isExpiredWordUsed: boolean;
    numberWord: number;
    isTrial: boolean;
    isExpiredBalance: boolean;
    isExpiredTrialDate: boolean;
}> {
    const workspacePackage = workspace?.workspacePackage;

    if (!workspacePackage) {
        return {
            isNotWorkspacePackage: true,
            isExpiredBalance: workspace?.balance < 0,
            isExpiredTrialDate: workspace?.timeTrial < 0,
        };
    }

    const createdAt = workspacePackage?.createdAt;
    const time = workspacePackage?.time || 0;
    const freeTime = workspacePackage?.freeTime || 0;

    const isTrial =
        workspacePackage?.packageItem?.packageParent?.type ===
        PackageType.Trial;

    const timeNow = moment().valueOf();
    const timeUsed =
        moment(createdAt).valueOf() + (time + freeTime) * (1000 * 60 * 60 * 24);

    const isExpiredPackage = timeNow > timeUsed;

    const startDateWord = workspacePackage?.startDateWord;

    const timeUseWord =
        moment(startDateWord).valueOf() + 30 * 1000 * 60 * 60 * 24;

    const isExpiredWordUsed = timeNow > timeUseWord;

    const numberWord = workspacePackage?.numberWord;

    return {
        isExpiredPackage,
        isExpiredWordUsed,
        numberWord,
        isTrial,
    };
}

export function usePremiumWorkspace(): boolean {
    const { user } = useAuthStore();

    return (
        user?.workspace?.workspacePackage?.packageItem?.packageParent?.type ===
        PackageType.Premium
    );
}

export function useUpdateTimeUseGpt4() {
    return useUpdateTimeUseGpt4Mutation(client);
}
