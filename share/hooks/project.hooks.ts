import {
    ProjectsInputType,
    useAddProjectMutation,
    useChangeDefaultProjectMutation,
    useChangeDefaultProjectUserMutation,
    useDeleteProjectMutation,
    useProjectDefaultQuery,
    useProjectQuery,
    useProjectsQuery,
    useUpdateProjectMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useProjectStore } from '@share/store/project.store';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useToast } from './useToast';

export function useProjects(input: ProjectsInputType) {
    return useProjectsQuery(client, { input });
}

export function useProject() {
    const router = useRouter();
    const id = router.query.id ? router.query.id.toString() : '';
    return useProjectQuery(
        client,
        { id },
        {
            enabled: !!id,
        }
    );
}

export function useProjectDefault() {
    return useProjectDefaultQuery(client);
}

export function useChangeDefaultProject() {
    const setLoading = useProjectStore((state) => state.setLoading);
    const router = useRouter();

    const queryClient = useQueryClient();

    return useChangeDefaultProjectMutation(client, {
        async onSuccess() {
            try {
                setLoading(true);
                await Promise.all([
                    queryClient.invalidateQueries(['Projects']),
                    queryClient.invalidateQueries(['ProjectDefault']),
                ]);
                router.push('/user');
            } catch (error) {
            } finally {
                setLoading(false);
            }
        },
    });
}

export function useAddProject() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();

    return useAddProjectMutation(client, {
        onSuccess() {
            toastSuccess('Thêm dự án thành công');
            queryClient.invalidateQueries(['Projects']);
        },
        onError() {
            toastError('Thêm dự án không thành công');
        },
    });
}

export function useDeleteProject() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();

    return useDeleteProjectMutation(client, {
        onSuccess() {
            toastSuccess('Xoá dự án thành công');
            queryClient.invalidateQueries(['Projects']);
        },
        onError() {
            toastError('Xoá dự án không thành công');
        },
    });
}

export function useUpdateProject() {
    const { toastError, toastSuccess } = useToast();
    const queryClient = useQueryClient();
    return useUpdateProjectMutation(client, {
        onSuccess() {
            toastSuccess('Cập nhật dự án thành công');
            queryClient.invalidateQueries(['Projects']);
        },
        onError() {
            toastError('Cập nhật dự án không thành công');
        },
    });
}

export function useChangeDefaultProjectUser() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useChangeDefaultProjectUserMutation(client, {
        onError() {
            toast.toastError('Lỗi chọn dự án mặc định');
        },
        onSuccess() {
            toast.toastSuccess('Chọn dự án mặc định thành công');

            queryClient.invalidateQueries(['Me']);
            queryClient.invalidateQueries(['Images']);
            queryClient.invalidateQueries(['FolderImages']);
            queryClient.invalidateQueries(['Keywords']);
        },
    });
}
