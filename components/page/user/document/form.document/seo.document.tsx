import { Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import { useSeoCheck } from '@share/seo/seo.hooks';
import { useDocumentStore } from '@share/store/document.store';
import pick from 'lodash/pick';
import { NlpDocument } from './nlp.document';
import { SeoCheckDocument } from './seo-check.document';

import { useParseContentDocument } from '@share/hooks/document.hooks';

export function SeoDocument() {
    const document = useDocumentStore((state) => state.document);

    const { title, description, slug, url } = pick(document, [
        'title',
        'description',
        'slug',
        'keyword',
        'url',
    ]);

    const { editorStateTextString, editorStateHtml } =
        useParseContentDocument();

    const { data, score } = useSeoCheck({
        title,
        content: editorStateTextString,
        description,
        keywords: document?.keyword?.value,
        url: slug ? `${url}/${slug}` : `${url}`,
        html: editorStateHtml,
    });

    return (
        <Tabs variant="soft-rounded" colorScheme="green">
            <TabList justifyContent="center" borderBottomWidth="1px" py="6">
                <Tab>SEO</Tab>
                <Tab>NLP</Tab>
            </TabList>
            <TabPanels>
                <TabPanel p="0">
                    <SeoCheckDocument list={data} />
                </TabPanel>
                <TabPanel>
                    <NlpDocument score={score} />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );
}
