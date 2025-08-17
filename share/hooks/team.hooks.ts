import {
    useAddTeamMutation,
    useChangeDefaultTeamMutation,
    useDeleteTeamMutation,
    useTeamDefaultQuery,
    useTeamQuery,
    useTeamsQuery,
    useUpdateTeamMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useToast } from './useToast';

export function useTeams() {
    return useTeamsQuery(client);
}

export function useTeam() {
    const router = useRouter();
    const id = router.query.id ? router.query.id.toString() : '';
    return useTeamQuery(
        client,
        { id },
        {
            enabled: !!id,
        }
    );
}

export function useTeamDefault() {
    return useTeamDefaultQuery(client);
}

export function useAddTeam() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    return useAddTeamMutation(client, {
        onSuccess() {
            toastSuccess('Thêm nhóm thành công');
            queryClient.invalidateQueries(['Teams']);
        },
        onError() {
            toastError('Thêm nhóm không thành công');
        },
    });
}

export function useUpdateTeam() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    return useUpdateTeamMutation(client, {
        onSuccess() {
            toastSuccess('Cập nhật nhóm thành công');
            queryClient.invalidateQueries(['Teams']);
        },
        onError() {
            toastError('Cập nhật nhóm không thành công');
        },
    });
}

export function useDeleteTeam() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    return useDeleteTeamMutation(client, {
        onSuccess() {
            toastSuccess('Xoá nhóm thành công');
            Promise.all([
                queryClient.invalidateQueries(['Teams']),
                queryClient.invalidateQueries(['TeamDefault']),
            ]);
        },
        onError() {
            toastError('Xoá nhóm không thành công');
        },
    });
}

export function useChangeDefaultTeam() {
    const { toastError, toastSuccess } = useToast();
    const router = useRouter();
    const queryClient = useQueryClient();
    return useChangeDefaultTeamMutation(client, {
        async onSuccess() {
            try {
                await Promise.all([
                    queryClient.invalidateQueries(['Me']),
                    queryClient.invalidateQueries(['Teams']),
                    queryClient.invalidateQueries(['Projects']),
                    queryClient.invalidateQueries(['TeamDefault']),
                    queryClient.invalidateQueries(['ProjectDefault']),
                ]);

                toastSuccess('Chọn team thành công');
                router.push('/user');
            } catch (error) {}
        },
        onError() {
            toastError('Chọn team không thành công');
        },
    });
}
