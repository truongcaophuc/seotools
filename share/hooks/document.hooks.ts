import {
    DocumentInfoFragment,
    DocumentsInputType,
    useCreateDocumentMutation,
    useDeleteDocumentMutation,
    useDocumentQuery,
    useDocumentsQuery,
    useSaveDraftDocumentMutation,
    useUpdateDocumentMutation,
} from '@generated/graphql/query';
import { $generateHtmlFromNodes } from '@lexical/html';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { graphqlRequestClient as client } from '@lib/react-query';
import { useQueryClient } from '@tanstack/react-query';
import { $getRoot } from 'lexical';
import { useRouter } from 'next/router';
import { useToast } from './useToast';

export function useDocuments(input: DocumentsInputType) {
    return useDocumentsQuery(client, { input });
}

export function useDocument(
    callback?: (document?: DocumentInfoFragment) => void,
    isDraft?: boolean
) {
    const router = useRouter();
    const id = router.query.id ? router.query.id.toString() : '';
    return useDocumentQuery(
        client,
        { id, isDraft: isDraft || false },
        {
            refetchOnWindowFocus: false,
            enabled: !!id,
            onSuccess(data) {
                if (callback) {
                    callback(data?.document);
                }
            },
        }
    );
}

export function useCreateDocument() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useCreateDocumentMutation(client, {
        onError() {
            toast.toastError('Lỗi thêm bài viết');
        },
        onSuccess() {
            toast.toastSuccess('Thêm bài viết thành công');
            queryClient.invalidateQueries(['Documents']);
        },
    });
}

export function useUpdateDocument() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useUpdateDocumentMutation(client, {
        onError() {
            toast.toastError('Lỗi cập nhật bài viết');
        },
        onSuccess() {
            toast.toastSuccess('Cập nhật bài viết thành công');
            queryClient.invalidateQueries(['Documents']);
        },
    });
}

export function useSaveDraftDocument() {
    const toast = useToast();
    const queryClient = useQueryClient();

    return useSaveDraftDocumentMutation(client, {
        onError() {
            toast.toastError('Lỗi lưu nháp bài viết');
        },
        onSuccess() {
            toast.toastSuccess('Lưu nháp bài viết thành công');
            queryClient.invalidateQueries(['Documents']);
        },
    });
}

export function useDeleteDocument() {
    const toast = useToast();
    const queryClient = useQueryClient();
    return useDeleteDocumentMutation(client, {
        onError() {
            toast.toastError('Lỗi xoá bài viết');
        },
        onSuccess() {
            toast.toastSuccess('Xoá bài viết thành công');

            queryClient.invalidateQueries(['Documents']);
        },
    });
}

export function useParseContentDocument() {
    const [editor] = useLexicalComposerContext();

    const stringifiedEditorState = JSON.stringify(
        editor.getEditorState().toJSON()
    );

    const parsedEditorState = editor.parseEditorState(stringifiedEditorState);

    const editorStateTextString = parsedEditorState.read(() =>
        $getRoot().getTextContent()
    );

    const editorStateHtml = parsedEditorState.read(() =>
        $generateHtmlFromNodes(editor, null)
    );

    return {
        editorStateTextString,
        editorStateHtml,
    };
}
