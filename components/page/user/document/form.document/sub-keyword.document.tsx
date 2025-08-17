import { ListItem, OrderedList, Tag, Text } from '@chakra-ui/react';
import { KeywordInfoFragment } from '@generated/graphql/query';
import { useTranslate } from '@share/hooks/translate.hooks';

interface Props {
    keyword: KeywordInfoFragment;
}
export function SubKeywordDocument({ keyword }: Props) {
    const { t } = useTranslate();
    if (keyword?.subKeywords.length === 0) {
        return (
            <Text as="span" color="gray.500" fontSize="sm">
                {t('posts.detail.sub_keyword.no_sub_keyword')}
            </Text>
        );
    }
    return (
        <OrderedList spacing="3">
            {keyword?.subKeywords.map((item) => {
                const childrenKeyword =
                    item.subKeywords.length > 0 ? (
                        <>
                            : {}
                            {item.subKeywords.map((i) => {
                                return (
                                    <Tag
                                        mr="2"
                                        mb="2"
                                        colorScheme="red"
                                        key={i.id}
                                    >
                                        {i.value}
                                    </Tag>
                                );
                            })}
                        </>
                    ) : null;
                return (
                    <ListItem key={item.id}>
                        <Tag colorScheme="green">{item.value}</Tag>{' '}
                        {childrenKeyword}
                    </ListItem>
                );
            })}
        </OrderedList>
    );
}
