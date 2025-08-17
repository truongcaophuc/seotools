import {
    FolderImagesInputType,
    ImagesInputType,
    useAddFolderImageMutation,
    useDeleteFolderImageMutation,
    useFolderImageQuery,
    useFolderImagesQuery,
    useGenerateImageWithReplicateMutation,
    useImageQuery,
    useImagesQuery,
    useUpdateFolderImageMutation,
    useUpdateImageMutation,
} from '@generated/graphql/query';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { useToast } from './useToast';
import { useTranslate } from './translate.hooks';

export function useImages(input?: ImagesInputType) {
    return useImagesQuery(client, { input });
}

export function useImage(imageId: string) {
    return useImageQuery(client, {
        id: imageId,
    });
}

export function useUpdateImage() {
    const queryClient = useQueryClient();
    const { toastError, toastSuccess } = useToast();
    const { t } = useTranslate();

    return useUpdateImageMutation(client, {
        onError() {
            toastError(t('upload.messages.file.update.fail'));
        },
        onSuccess() {
            toastSuccess(t('upload.messages.file.update.success'));
            queryClient.invalidateQueries(['Images']);
        },
    });
}

export function useUploadImage() {
    const queryClient = useQueryClient();
    const { toastError, toastSuccess } = useToast();
    const { t } = useTranslate();

    return useMutation(
        (data: FormData) => {
            return fetch('/api/upload', {
                method: 'POST',
                body: data,
            }).then((res) => res.json());
        },
        {
            onError() {
                toastError(t('upload.messages.file.upload.fail'));
            },
            onSuccess() {
                toastSuccess(t('upload.messages.file.upload.success'));
                queryClient.invalidateQueries(['Images']);
            },
        }
    );
}

export function useUpdateFile() {
    const queryClient = useQueryClient();
    const { toastError, toastSuccess } = useToast();
    const { t } = useTranslate();

    return useMutation(
        (data: FormData) => {
            return fetch('/api/upload', {
                method: 'PUT',
                body: data,
            }).then((res) => res.json());
        },
        {
            onError() {
                toastError(t('upload.messages.file.upload.fail'));
            },
            onSuccess() {
                toastSuccess(t('upload.messages.file.upload.success'));
                queryClient.invalidateQueries(['Images']);
            },
        }
    );
}

export function useDeleteImage() {
    const queryClient = useQueryClient();
    const { toastError, toastSuccess } = useToast();
    const { t } = useTranslate();

    // return useDeleteImageMutation(client, {
    //     onError() {
    //         toastError('Đã xảy ra lỗi, vui lòng thử lại');
    //     },
    //     onSuccess() {
    //         toastSuccess('Xoá hình ảnh thành công');
    //         queryClient.invalidateQueries(['Images']);
    //     },
    // });

    return useMutation(
        (data: { imageKey: string; imageId: string }) => {
            const url = `/api/upload?${new URLSearchParams(data)}`;
            return fetch(url, {
                method: 'DELETE',
            }).then((res) => res.json());
        },
        {
            onError() {
                toastError(t('upload.messages.file.delete.fail'));
            },
            onSuccess() {
                toastSuccess(t('upload.messages.file.delete.success'));
                queryClient.invalidateQueries(['Images']);
            },
        }
    );
}

export function useFolderImages(input: FolderImagesInputType) {
    return useFolderImagesQuery(client, {
        input,
    });
}

export function useFolderImage() {
    const router = useRouter();

    const id = router.query.id ? router.query.id.toString() : '';

    return useFolderImageQuery(client, {
        id,
    });
}

export function useAddFolderImage() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useAddFolderImageMutation(client, {
        onError() {
            toastError(t('upload.messages.folder.add.fail'));
        },
        onSuccess() {
            toastSuccess(t('upload.messages.folder.add.success'));
            queryClient.invalidateQueries(['FolderImages']);
        },
    });
}

export function useDeleteFolderImage() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useDeleteFolderImageMutation(client, {
        onError() {
            toastError(t('upload.messages.folder.delete.fail'));
        },
        onSuccess() {
            toastSuccess(t('upload.messages.folder.delete.success'));
            queryClient.invalidateQueries(['FolderImages']);
        },
    });
}

export function useUpdateFolderImage() {
    const { toastSuccess, toastError } = useToast();
    const queryClient = useQueryClient();
    const { t } = useTranslate();

    return useUpdateFolderImageMutation(client, {
        onError() {
            toastError(t('upload.messages.folder.update.fail'));
        },
        onSuccess() {
            toastSuccess(t('upload.messages.folder.update.success'));
            queryClient.invalidateQueries(['FolderImages']);
        },
    });
}

export function useGenerateImageWithReplicate() {
    return useGenerateImageWithReplicateMutation(client);
}
