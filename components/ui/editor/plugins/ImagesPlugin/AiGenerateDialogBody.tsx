import { Box, HStack, Image, VStack, Button } from '@chakra-ui/react';
import { SearchForm } from '@components/ui/form';
import { Loading } from '@components/ui/loading';
import { useGenerateImageWithReplicate } from '@share/hooks/image.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useState } from 'react';
import { InsertImagePayload } from '.';

interface Props {
    onClick: (payload: InsertImagePayload) => void;
}

export function AiGenerateDialogBody({ onClick }: Props) {
    const { t } = useTranslate();

    const [search, setSearch] = useState<string>();

    const { isLoading, mutate, data } = useGenerateImageWithReplicate();

    function handleSearch(text: string) {
        setSearch(text);

        mutate({
            prompt: text,
        });
    }

    function handleReCreate() {
        mutate({
            prompt: search,
        });
    }

    function renderContent() {
        if (isLoading) return <Loading />;
        if (data) {
            const src = data.generateImageWithReplicate;
            function handleInsert() {
                onClick({
                    src,
                    altText: '',
                });
            }
            return (
                <VStack spacing="6">
                    <Image boxSize="300px" objectFit="cover" src={src} />
                    <HStack>
                        <Button
                            size="sm"
                            colorScheme="blue"
                            onClick={handleReCreate}
                        >
                            {t('commons.editor.ai.re_create')}
                        </Button>
                        <Button
                            size="sm"
                            colorScheme="green"
                            onClick={handleInsert}
                        >
                            {t('commons.editor.ai.accept')}
                        </Button>
                    </HStack>
                </VStack>
            );
        }
        return null;
    }

    return (
        <VStack spacing="6" align="stretch" maxW="1200px" minW="768px">
            <SearchForm onSearch={handleSearch} />
            <Box flex="1" minH="300px">
                {renderContent()}
            </Box>
        </VStack>
    );
}
