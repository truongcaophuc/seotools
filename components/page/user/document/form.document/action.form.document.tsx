import { MenuDivider, MenuItem } from '@chakra-ui/react';
import { Copy, MenuAction } from '@components/ui';
import { useParseContentDocument } from '@share/hooks/document.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useDocumentStore } from '@share/store/document.store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ReactElement } from 'react';
import { DeleteDocument } from '../delete.document';

interface Props {
    documentId: string;
}

function CopyContentDocument({
    children,
    type = 'html',
}: {
    children: ReactElement;
    type?: 'html' | 'content';
}) {
    const { editorStateTextString, editorStateHtml } =
        useParseContentDocument();

    let content = type === 'content' ? editorStateTextString : editorStateHtml;

    return <Copy content={content}>{children}</Copy>;
}

export function ActionFormDoument({ documentId }: Props) {
    const { t } = useTranslate();
    const documentData = useDocumentStore((state) => state.document);
    const router = useRouter();

    function handleRedirect() {
        router.push('/user/document');
    }

    const hasDraft = !!documentData?.hasDraft;
    const isDraft = !!documentData?.parentId;

    return (
        <MenuAction size="sm">
            <>
                {!isDraft && hasDraft ? (
                    <>
                        <MenuItem
                            as={Link}
                            href={`/user/document/${documentId}/draft`}
                        >
                            {t('posts.detail.view_draft')}
                        </MenuItem>
                        <MenuDivider />
                    </>
                ) : null}
                {isDraft ? (
                    <>
                        <MenuItem
                            as={Link}
                            href={`/user/document/${documentId}`}
                        >
                            {t('posts.detail.view_the_original')}
                        </MenuItem>
                        <MenuDivider />
                    </>
                ) : null}

                <CopyContentDocument type="content">
                    <MenuItem>{t('posts.detail.copy_content')}</MenuItem>
                </CopyContentDocument>

                <CopyContentDocument type="html">
                    <MenuItem>{t('posts.detail.copy_html')}</MenuItem>
                </CopyContentDocument>

                <MenuDivider />
                <DeleteDocument id={documentId} callback={handleRedirect}>
                    <MenuItem fontWeight="medium">
                        {t('posts.detail.delete_post')}
                    </MenuItem>
                </DeleteDocument>
            </>
        </MenuAction>
    );
}
