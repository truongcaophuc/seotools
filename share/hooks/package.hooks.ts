import {
    usePackagePeriodsQuery,
    usePackagesQuery,
    usePricingQuery,
    useUpdatePackageItemMutation,
    useUpdatePackageMutation,
    useUpdatePackagePeriodMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';

export function usePackages() {
    return usePackagesQuery(client);
}

export function usePackagePeriods() {
    return usePackagePeriodsQuery(client);
}

export function usePricing() {
    return usePricingQuery(client);
}

export function useUpdatePackage() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useUpdatePackageMutation(client, {
        onSuccess() {
            toast.toastSuccess('Cập nhật gói thành công');
            queryClient.invalidateQueries(['Packages']);
        },
        onError() {
            toast.toastError('Cập nhật gói không thành công');
        },
    });
}

export function useUpdatePackagePeriod() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useUpdatePackagePeriodMutation(client, {
        onSuccess() {
            toast.toastSuccess('Cập nhật thời hạn thành công');
            queryClient.invalidateQueries(['PackagePeriods']);
        },
        onError() {
            toast.toastError('Cập nhật thời hạn không thành công');
        },
    });
}

export function useUpdatePackageItem() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useUpdatePackageItemMutation(client, {
        onSuccess() {
            toast.toastSuccess('Cập nhật gói thành công');
            queryClient.invalidateQueries(['Packages']);
        },
        onError() {
            toast.toastError('Cập nhật gói không thành công');
        },
    });
}
