import { Text } from '@chakra-ui/react';
import { useDocumentStore } from '@share/store/document.store';

export function TitleFormDocument() {
    const document = useDocumentStore((state) => state.document);

    const isDraft = document?.parentId;

    const title = `${document?.title}${isDraft ? ' - bản nháp' : ''}`;

    return (
        <Text noOfLines={1} fontSize="lg">
            {title}
        </Text>
    );
}
