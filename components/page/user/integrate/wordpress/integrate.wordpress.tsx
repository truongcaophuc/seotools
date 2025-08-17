import { Button, HStack, Spacer, VStack } from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import { ChannelType } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { usePageChannels } from '@share/hooks/channel.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ListPageWordpress } from './list-page.wordpress';
import { UpdatePageWordpress } from './upadte-page.wordpress';

export function IntegrateWordpress() {
    const { t } = useTranslate();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const { isLoading, data } = usePageChannels({
        type: ChannelType.Wordpress,
        page,
        perPage,
    });

    const pages = data?.pageChannels?.data;
    const pagination = data?.pageChannels?.pagination;

    return (
        <VStack align="stretch">
            <HStack>
                <Spacer />
                <UpdatePageWordpress>
                    <Button
                        aria-label="Add new"
                        colorScheme="blue"
                        leftIcon={<HeroIcon as={PlusIcon} />}
                    >
                        {t('commons.add')}
                    </Button>
                </UpdatePageWordpress>
            </HStack>

            <ListPageWordpress
                isNo
                isLoading={isLoading}
                data={pages}
                pagination={{
                    values: pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
            />
        </VStack>
    );
}
