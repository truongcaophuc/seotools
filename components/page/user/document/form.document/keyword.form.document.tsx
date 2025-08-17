import { HStack, Input, VStack } from '@chakra-ui/react';
import { FormField } from '@components/ui';
import { KeywordInfoFragment } from '@generated/graphql/query';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useDocumentStore } from '@share/store/document.store';
import { SelectKeyword } from '../../keyword';
import { AddKeyword } from '../../keyword/add.keyword';
import { SubKeywordDocument } from './sub-keyword.document';

export function KeywordsFormDocument() {
    const { t } = useTranslate();

    const document = useDocumentStore((state) => state.document);
    const selectKeywordDocument = useDocumentStore(
        (state) => state.selectKeywordDocument
    );

    function handleSelectKeyword(value: KeywordInfoFragment) {
        selectKeywordDocument(value);
    }

    const keyword = document?.keyword;

    return (
        <VStack align="stretch" spacing="5">
            <FormField label={t('posts.detail.main_keyword.label')}>
                <HStack>
                    <SelectKeyword onSelect={handleSelectKeyword}>
                        <Input
                            value={keyword?.value}
                            placeholder={t(
                                'posts.detail.main_keyword.placeholder'
                            )}
                            readOnly
                        />
                    </SelectKeyword>
                    <AddKeyword callback={handleSelectKeyword} />
                </HStack>
            </FormField>

            <FormField label={t('posts.detail.sub_keyword.label')}>
                <SubKeywordDocument keyword={keyword} />
            </FormField>
        </VStack>
    );
}
