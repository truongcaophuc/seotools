import {
    Center,
    HStack,
    IconButton,
    MenuDivider,
    MenuGroup,
    MenuItem,
    Spacer,
} from '@chakra-ui/react';
import { SyncContent } from '@components/page/content/sync.content';
import { HeroIcon, MenuAction } from '@components/ui';
import { ContentTypeEnum } from '@generated/graphql/query';
import { ArrowDownTrayIcon, ArrowLeftIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useDocumentStore } from '@share/store/document.store';
// import dynamic from 'next/dynamic';
import Link from 'next/link';
import { ActionFormDoument } from './action.form.document';
import { ExportMarkdownFormDocument } from './export-markdown.form.document';
import { ToggleSidebarLayoutFormDocument } from './layout.form.document';
import { SubmitFormDocument } from './submit.form.document';
import { TitleFormDocument } from './title.form.document';

// const ExportPdfFormDocument = dynamic(()=> import('./export-pdf.form.document'))

export function HeadingFormDocument() {
    const { t } = useTranslate();

    const document = useDocumentStore((state) => state.document);

    return (
        <HStack bgColor="gray.50" h="60px" px="6" borderBottomWidth="1px">
            <Center
                as={Link}
                href="/user/document"
                pr="2"
                py="1"
                borderRightWidth="1px"
            >
                <HeroIcon color="gray.400" as={ArrowLeftIcon} />
            </Center>

            <TitleFormDocument />

            <Spacer />
            <HStack>
                <SubmitFormDocument isDraft />
                <SubmitFormDocument />
                <MenuAction
                    size="md"
                    button={{
                        children: (
                            <IconButton
                                size="sm"
                                aria-label="Action export"
                                icon={<HeroIcon as={ArrowDownTrayIcon} />}
                                colorScheme="blue"
                            />
                        ),
                    }}
                >
                    <>
                        <MenuGroup title={t('commons.export')}>
                            <ExportMarkdownFormDocument>
                                <MenuItem>Markdown</MenuItem>
                            </ExportMarkdownFormDocument>
                        </MenuGroup>
                        <MenuDivider />
                        <SyncContent
                            contentType={ContentTypeEnum.Document}
                            contentId={document?.id}
                        >
                            <MenuItem>{t('commons.sync')}</MenuItem>
                        </SyncContent>
                        <MenuDivider />
                        <MenuItem>{t('commons.sync_timer')}</MenuItem>
                    </>
                </MenuAction>
                <ActionFormDoument documentId={document?.id} />
                <ToggleSidebarLayoutFormDocument />
            </HStack>
        </HStack>
    );
}
