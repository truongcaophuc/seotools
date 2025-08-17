import {
    Box,
    Grid,
    GridItem,
    HStack,
    Input,
    InputGroup,
    InputLeftAddon,
    MenuItem,
    Stack,
    Textarea,
    VStack,
} from '@chakra-ui/react';
import { FormField, MenuAction } from '@components/ui';
import { TypeAiSettingApp } from '@generated/graphql/query';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useDocumentStore } from '@share/store/document.store';
import { ChangeEvent } from 'react';
import {
    AIGenerateDocument,
    ReWriteAIGenerateDocument,
} from './ai-generate.document';
import { PreviewGoogle } from './preview-google';

const inputConfig = {
    bgColor: 'white',
};

export function MetaFormDocument() {
    const { t } = useTranslate();
    const document = useDocumentStore((state) => state.document);
    const changeTitleDocument = useDocumentStore(
        (state) => state.changeTitleDocument
    );
    const changeDescriptionDocument = useDocumentStore(
        (state) => state.changeDescriptionDocument
    );
    const changeUrlDocument = useDocumentStore(
        (state) => state.changeUrlDocument
    );
    const changeSlugDocument = useDocumentStore(
        (state) => state.changeSlugDocument
    );

    function handleChangeTitle(e: ChangeEvent<HTMLInputElement>) {
        changeTitleDocument(e.target.value);
    }

    function handleChangeDescription(e: ChangeEvent<HTMLTextAreaElement>) {
        changeDescriptionDocument(e.target.value);
    }

    function handleChangeUrl(e: ChangeEvent<HTMLInputElement>) {
        changeUrlDocument(e.target.value);
    }
    function handleChangeSlug(e: ChangeEvent<HTMLInputElement>) {
        changeSlugDocument(e.target.value);
    }

    const keyword = document?.keyword;

    const keywordValue = keyword?.value;
    const subKeywordArr = keyword?.subKeywords || [];
    const subKeyword = subKeywordArr.map((item) => item.value).join(', ');

    return (
        <Box p="6">
            <PreviewGoogle />
            <VStack mt="5" spacing="6" align="stretch" maxW="4xl">
                <Box>
                    <FormField label={t('posts.form.title.label')}>
                        <HStack>
                            <Input
                                {...inputConfig}
                                value={document?.title}
                                onChange={handleChangeTitle}
                                placeholder={t('posts.form.title.placeholder')}
                            />

                            <MenuAction size="md">
                                <>
                                    <ReWriteAIGenerateDocument
                                        type={TypeAiSettingApp.Title}
                                        keyword={keywordValue}
                                        content={document?.title}
                                    >
                                        <MenuItem isDisabled={!document?.title}>
                                            {t('commons.editor.ai.refresh')}
                                        </MenuItem>
                                    </ReWriteAIGenerateDocument>
                                    <AIGenerateDocument
                                        type={TypeAiSettingApp.Title}
                                        keyword={keywordValue}
                                        title={document?.title}
                                    >
                                        <MenuItem>
                                            {t('commons.editor.ai.create_new')}
                                        </MenuItem>
                                    </AIGenerateDocument>
                                </>
                            </MenuAction>
                        </HStack>
                    </FormField>
                </Box>

                <Box>
                    <FormField label={t('posts.form.url.label')} />
                    <Grid templateColumns="repeat(12, 1fr)" gap={6}>
                        <GridItem colSpan={7}>
                            <Stack spacing={4}>
                                <InputGroup>
                                    <InputLeftAddon
                                        bgColor="gray.200"
                                        children="https://"
                                    />
                                    <Input
                                        {...inputConfig}
                                        onChange={handleChangeUrl}
                                        value={document?.url}
                                        placeholder={t(
                                            'posts.form.description.placeholder'
                                        )}
                                    />
                                </InputGroup>
                            </Stack>
                        </GridItem>
                        <GridItem colSpan={5}>
                            <Stack spacing={4}>
                                <InputGroup>
                                    <InputLeftAddon
                                        bgColor="gray.200"
                                        children="/"
                                    />
                                    <Input
                                        placeholder="slug"
                                        onChange={handleChangeSlug}
                                        value={document?.slug}
                                        {...inputConfig}
                                    />
                                </InputGroup>
                            </Stack>
                        </GridItem>
                    </Grid>
                </Box>

                <Box>
                    <FormField label={t('posts.form.description.label')}>
                        <HStack>
                            <Textarea
                                placeholder={t(
                                    'posts.form.description.placeholder'
                                )}
                                rows={5}
                                value={document?.description}
                                onChange={handleChangeDescription}
                                {...inputConfig}
                            />
                            {document?.title?.length > 0 && (
                                <MenuAction size="md">
                                    <>
                                        <ReWriteAIGenerateDocument
                                            type={TypeAiSettingApp.Description}
                                            keyword={keywordValue}
                                            content={document?.description}
                                        >
                                            <MenuItem
                                                isDisabled={
                                                    !document?.description
                                                }
                                            >
                                                {t('commons.editor.ai.refresh')}
                                            </MenuItem>
                                        </ReWriteAIGenerateDocument>
                                        <AIGenerateDocument
                                            type={TypeAiSettingApp.Description}
                                            keyword={keywordValue}
                                            subKeyword={subKeyword}
                                            title={document?.title}
                                        >
                                            <MenuItem>
                                                {t(
                                                    'commons.editor.ai.create_new'
                                                )}
                                            </MenuItem>
                                        </AIGenerateDocument>
                                    </>
                                </MenuAction>
                            )}
                        </HStack>
                    </FormField>
                </Box>
            </VStack>
        </Box>
    );
}
