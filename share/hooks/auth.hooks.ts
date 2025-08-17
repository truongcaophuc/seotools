import {
    PackageType,
    useChangeEmailMutation,
    useChangePasswordMutation,
    useForgotPasswordMutation,
    useGetEmailSignupQuery,
    useLoginMutation,
    useLogoutMutation,
    useMeQuery,
    useResetPasswordMutation,
    useSignupMutation,
    useSignupVerifyMutation,
    useSignupWithCodeMutation,
    useUpdateUserMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useAuthStore } from '@share/store/auth.store';
import { useQueryClient } from '@tanstack/react-query';
import { useToast } from './useToast';
import { useTranslate } from './translate.hooks';
import { get } from 'lodash';
import { useUpdateTimeUseGpt4 } from './workspace.hooks';

export function useMe() {
    const { mutate, isLoading } = useUpdateTimeUseGpt4();
    const setUserStore = useAuthStore((state) => state.setUserStore);

    return useMeQuery(client, null, {
        // Add caching configuration for better performance
        staleTime: 5 * 60 * 1000, // 5 minutes
        cacheTime: 10 * 60 * 1000, // 10 minutes
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        refetchOnReconnect: true,
        retry: 2,
        retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
        onSuccess(data) {
            const isPremium =
                get(
                    data,
                    'me.workspace.workspacePackage.packageItem.packageParent.type'
                ) === PackageType.Premium;

            const timeUseGpt4 = get(
                data,
                'me.workspace.workspacePackage.timeUseGpt4'
            );

            const workspacePackageId = get(
                data,
                'me.workspace.workspacePackage.id'
            );

            if (isPremium && typeof timeUseGpt4 !== 'number') {
                mutate({
                    workspacePackageId,
                });
            }

            setUserStore(data?.me);
        },
        onError() {
            setUserStore(null);
        },
    });
}

export function useLogin() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useLoginMutation(client, {
        onError() {
            toast.toastError(t('auth.messages.login.fail'));
        },
        onSuccess(data) {
            if (data?.login) {
                toast.toastSuccess(t('auth.messages.login.success'));
                queryClient.invalidateQueries(['Me']);
            } else {
                toast.toastError(t('auth.messages.login.fail'));
            }
        },
    });
}

export function useSignup() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useSignupMutation(client, {
        onError() {
            toast.toastError(t('auth.messages.sign_up.fail'));
        },
        onSuccess(data) {
            if (data?.signUp) {
                toast.toastSuccess(t('auth.messages.login.success'));
                queryClient.invalidateQueries(['Me']);
            } else {
                toast.toastError(t('auth.messages.sign_up.fail'));
            }
        },
    });
}

export function useSignupWithCode() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useSignupWithCodeMutation(client, {
        onError() {
            toast.toastError(t('auth.messages.sign_up_with_code.fail'));
        },
        onSuccess(data) {
            if (data?.signUpWithCode) {
                toast.toastSuccess(
                    t('auth.messages.sign_up_with_code.success')
                );

                queryClient.invalidateQueries(['Me']);
            } else {
                toast.toastError(t('auth.messages.sign_up_with_code.fail'));
            }
        },
    });
}

export function useSignupVerify() {
    const toast = useToast();
    const { t } = useTranslate();

    return useSignupVerifyMutation(client, {
        onError() {
            toast.toastError(t('auth.messages.sign_up_verify.fail'));
        },
        onSuccess(data) {
            if (data?.signupVerify) {
                toast.toastSuccess(t('auth.messages.sign_up_verify.success'));
            } else {
                toast.toastError(t('auth.messages.sign_up_verify.fail'));
            }
        },
    });
}

export function useForgotPassword() {
    const toast = useToast();
    const { t } = useTranslate();

    return useForgotPasswordMutation(client, {
        onError() {
            toast.toastError(t('auth.messages.forgot_password.fail'));
        },
        onSuccess() {
            toast.toastSuccess(t('auth.messages.forgot_password.success'));
        },
    });
}

export function useResetPassword() {
    const toast = useToast();
    const { t } = useTranslate();

    return useResetPasswordMutation(client, {
        onError() {
            toast.toastError(t('auth.messages.reset_password.fail'));
        },
        onSuccess() {
            toast.toastSuccess(t('auth.messages.reset_password.success'));
        },
    });
}

export function useLogout() {
    const toast = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();
    const setIsLoading = useAuthStore((state) => state.setIsLoading);

    return useLogoutMutation(client, {
        onError() {
            toast.toastError(t('auth.messages.logout.fail'));
        },
        onSuccess(data) {
            if (data?.logout) {
                toast.toastSuccess(t('auth.messages.logout.success'));

                setIsLoading(false);
                queryClient.invalidateQueries(['Me']);
            } else {
                toast.toastError(t('auth.messages.logout.fail'));
            }
        },
    });
}

export function useUpdateUser() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useUpdateUserMutation(client, {
        onError() {
            toast.toastError('Đăng xuất thất bại');
        },
        onSuccess(data) {
            if (data?.updateUser) {
                toast.toastSuccess('Cập nhật thông tin thành công');

                queryClient.invalidateQueries(['Me']);
            } else {
                toast.toastError('Đăng xuất thất bại');
            }
        },
    });
}

export function useChangeEmail() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useChangeEmailMutation(client, {
        onError() {
            toast.toastError('Đổi email thất bại');
        },
        onSuccess(data) {
            if (data?.changeEmail) {
                toast.toastError('Đổi email thành công');
                queryClient.invalidateQueries(['Me']);
            } else {
                toast.toastError('Đổi email thất bại');
            }
        },
    });
}

export function useChangePassword() {
    const { t } = useTranslate();
    const toast = useToast();
    const queryClient = useQueryClient();

    return useChangePasswordMutation(client, {
        onError() {
            toast.toastError(t('auth.message.reset_password.fail'));
        },
        onSuccess(data) {
            if (data?.changePassword) {
                toast.toastSuccess(t('auth.message.reset_password.success'));
                queryClient.invalidateQueries(['Me']);
            } else {
                toast.toastError(t('auth.message.reset_password.fail'));
            }
        },
    });
}

export function useGetEmailSignup(token: string) {
    return useGetEmailSignupQuery(client, { token });
}
