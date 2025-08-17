import { Button } from '@chakra-ui/react';
import { WarningModal } from '@components/ui';
import { DocumentDataInputType } from '@generated/graphql/query';
import {
    useSaveDraftDocument,
    useUpdateDocument,
} from '@share/hooks/document.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useDocumentStore } from '@share/store/document.store';
import { useQueryClient } from '@tanstack/react-query';
import pick from 'lodash/pick';
import { useRouter } from 'next/router';

interface Props {
    isDraft?: boolean;
}

export function SubmitFormDocument({ isDraft = false }: Props) {
    const { t } = useTranslate();
    const queryClient = useQueryClient();
    const document = useDocumentStore((state) => state.document);
    const mutationSave = useUpdateDocument();
    const mutationSaveDraft = useSaveDraftDocument();
    const router = useRouter();

    const hasDraft = document?.hasDraft;

    function saveDocument() {
        let data = pick(document, [
            'title',
            'description',
            'url',
            'slug',
            'keywordId',
            'content',
            'outline',
        ]) as DocumentDataInputType;

        if (isDraft) {
            data.isDraft = true;

            mutationSaveDraft.mutate(
                {
                    input: {
                        id: document.id,
                        data,
                    },
                },
                {
                    onSuccess() {
                        queryClient.invalidateQueries([
                            'Document',
                            {
                                id: document.id,
                            },
                        ]);

                        if (!isDraft) {
                            router.push(`${router.asPath}/draft`);
                        }
                    },
                }
            );
        } else {
            mutationSave.mutate(
                {
                    input: {
                        id: document.id,
                        data,
                    },
                },
                {
                    onSuccess() {
                        queryClient.invalidateQueries([
                            'Document',
                            {
                                id: document.id,
                            },
                        ]);
                    },
                }
            );
        }
    }

    const colorScheme = isDraft ? 'gray' : 'green';
    const label = isDraft ? t('commons.save_draft') : t('commons.save');

    const isDisabled = isDraft
        ? mutationSave.isLoading
        : mutationSaveDraft.isLoading;
    const isLoading = isDraft
        ? mutationSaveDraft.isLoading
        : mutationSave.isLoading;
    const isSuccess = isDraft
        ? mutationSaveDraft.isSuccess
        : mutationSave.isSuccess;

    const content = isDraft
        ? t('posts.detail.save_message.is_draft')
        : !isDraft && hasDraft
        ? t('posts.detail.save_message.has_draft')
        : t('posts.detail.save_message.default');

    const title = isDraft ? t('commons.save_draft') : t('commons.save');
    const okText = isDraft ? t('commons.save_draft') : t('commons.save');

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            okProps={{
                okText,
                async onOk() {
                    saveDocument();
                },
            }}
            type="warning"
            content={content}
            title={title}
        >
            <Button
                size="sm"
                isDisabled={isDisabled}
                colorScheme={colorScheme}
                isLoading={isLoading}
                type="button"
                // onClick={saveDocument}
            >
                {label}
            </Button>
        </WarningModal>
    );
}
