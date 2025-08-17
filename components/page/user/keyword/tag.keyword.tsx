import { Tag, TagCloseButton, TagLabel } from '@chakra-ui/react';
import { KeywordInfoFragment } from '@generated/graphql/query';
import { Keyword } from '@prisma/client';
import { useDeleteKeyword } from '@share/hooks/keyword.hooks';
import Link from 'next/link';

interface Props {
    keyword: Pick<KeywordInfoFragment, 'id' | 'value'>;
    isSub?: boolean;
    isEdit?: boolean;
}

type TagKeywordLabelProps = Pick<Props, 'keyword' | 'isSub'>;

function TagKeywordLabel({ isSub, keyword }: TagKeywordLabelProps) {
    if (isSub) return <TagLabel>{keyword.value}</TagLabel>;

    return (
        <TagLabel as={Link} href={`/user/keyword/${keyword.id}`}>
            {keyword.value}
        </TagLabel>
    );
}

export function TagKeyword({ keyword, isSub, isEdit = true }: Props) {
    const { isLoading, mutate } = useDeleteKeyword();

    function handleClick() {
        if (isLoading) {
            return;
        }

        mutate({ id: keyword.id });
    }

    const colorScheme = isSub ? 'red' : 'green';

    return (
        <Tag colorScheme={colorScheme} size="sm" key={keyword.id} mr="2">
            <TagKeywordLabel keyword={keyword} />
            <TagCloseButton onClick={handleClick} />
        </Tag>
    );
}
