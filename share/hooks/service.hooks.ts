import {
    ServiceCategoriesInputType,
    ServicesInputType,
    useAddServiceCategoryMutation,
    useAddServiceMutation,
    useDeleteServiceCategoryMutation,
    useDeleteServiceMutation,
    useServiceCategoriesCustomerQuery,
    useServiceCategoriesQuery,
    useServiceCategoryQuery,
    useServiceQuery,
    useServicesDashboardQuery,
    useServicesQuery,
    useUpdateServiceCategoryMutation,
    useUpdateServiceMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useToast } from './useToast';

export function useServiceCategories(input: ServiceCategoriesInputType) {
    return useServiceCategoriesQuery(client, { input });
}

export function useServiceCategoriesCustomer(search?: string) {
    return useServiceCategoriesCustomerQuery(client, { search });
}

export function useServiceCategory() {
    const router = useRouter();
    const id = router.query.id ? router.query.id.toString() : '';
    return useServiceCategoryQuery(client, { id });
}

export function useAddServiceCategory() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();

    return useAddServiceCategoryMutation(client, {
        onError() {
            toastError('Thêm nhóm dịch vụ không thành công');
        },
        onSuccess() {
            toastSuccess('Thêm nhóm dịch vụ thành công');
            queryClient.invalidateQueries(['ServiceCategories']);
        },
    });
}

export function useUpdateServiceCategory() {
    const { toastSuccess, toastError } = useToast();

    return useUpdateServiceCategoryMutation(client, {
        onError() {
            toastError('Cập nhật nhóm dịch vụ không thành công');
        },
        onSuccess() {
            toastSuccess('Cập nhật nhóm dịch vụ thành công');
        },
    });
}

export function useDeleteServiceCategory() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();

    return useDeleteServiceCategoryMutation(client, {
        onError() {
            toastError('Xoá nhóm dịch vụ không thành công');
        },
        onSuccess() {
            toastSuccess('Xoá nhóm dịch vụ thành công');
            queryClient.invalidateQueries(['ServiceCategories']);
        },
    });
}

export function useServices(input: ServicesInputType) {
    return useServicesQuery(client, { input });
}

export function useServicesDashboard(input: ServicesInputType) {
    return useServicesDashboardQuery(client, { input });
}

export function useService() {
    const router = useRouter();
    const id = router.query.id ? router.query.id.toString() : '';
    return useServiceQuery(
        client,
        { id },
        {
            enabled: !!id,
        }
    );
}

export function useAddService() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();

    return useAddServiceMutation(client, {
        onError() {
            toastError('Thêm dịch vụ không thành công');
        },
        onSuccess() {
            toastSuccess('Thêm dịch vụ thành công');
            queryClient.invalidateQueries(['Services']);
        },
    });
}

export function useUpdateService() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();

    return useUpdateServiceMutation(client, {
        onError() {
            toastError('Cập nhật dịch vụ không thành công');
        },
        onSuccess() {
            toastSuccess('Cập nhật dịch vụ thành công');
            queryClient.invalidateQueries(['Services']);
        },
    });
}

export function useDeleteService() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();

    return useDeleteServiceMutation(client, {
        onError() {
            toastError('Xoá dịch vụ không thành công');
        },
        onSuccess() {
            toastSuccess('Xoá dịch vụ thành công');
            queryClient.invalidateQueries(['Services']);
        },
    });
}
