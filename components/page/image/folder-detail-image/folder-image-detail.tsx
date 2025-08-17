import {
    Box,
    Button,
    Collapse,
    Flex,
    HStack,
    Spacer,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {
    Heading,
    HeroIcon,
    RenderListData,
    SearchForm,
    ViewType,
} from '@components/ui';
import { FolderImageInfoFragment } from '@generated/graphql/query';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useImages } from '@share/hooks/image.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useViewType } from '@share/hooks/use.view-type';
import { useState } from 'react';
import { CardImage } from '../list.images/card.image';
import { createColumnsImage } from '../list.images/table.image';
import { UploadImage } from '../upload.image';
import { FormFolderImage } from './form-folder-image';

interface Props {
    folder: FolderImageInfoFragment;
}

export function FolderImageDetail({ folder }: Props) {
    const { t } = useTranslate();
    const columns = createColumnsImage(t);
    const { viewType, setViewType } = useViewType();
    const { isOpen, onToggle } = useDisclosure();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const [search, setSearch] = useState<string>();

    const { data, isLoading } = useImages({
        page,
        perPage,
        search,
        folderId: folder.id,
    });

    const images = data?.images?.data || [];
    const pagination = data?.images?.pagination;

    return (
        <Flex>
            <Box flex="1">
                <VStack align="stretch" p="6" spacing="6">
                    <HStack>
                        <Heading>Hình ảnh</Heading>
                        <Spacer />
                        <Button
                            onClick={onToggle}
                            colorScheme="green"
                            leftIcon={<HeroIcon as={PlusIcon} />}
                        >
                            Upload
                        </Button>
                    </HStack>

                    {isOpen && (
                        <Collapse in>
                            <UploadImage isEdit folderId={folder.id} />
                        </Collapse>
                    )}

                    <HStack>
                        <SearchForm onSearch={setSearch} />
                        <Spacer />
                        <ViewType type={viewType} onChange={setViewType} />
                    </HStack>

                    <RenderListData
                        renderItems={() =>
                            images.map((item) => (
                                <CardImage key={item.id} image={item} />
                            ))
                        }
                        columns={columns}
                        data={data?.images?.data}
                        isLoading={isLoading}
                        pagination={{
                            values: pagination,
                            onChangePage: setPage,
                            onChangePerPage: setPerPage,
                        }}
                        viewType={viewType}
                    />
                </VStack>
            </Box>
            <VStack
                align="stretch"
                minH="calc(100vh - 60px)"
                spacing="5"
                bgColor="gray.100"
                px="8"
                py="8"
            >
                <Box>
                    <Heading fontSize="2xl">{folder?.name}</Heading>
                    <Text color="gray.400" fontSize="xs">
                        ngày tạo {formatDate(folder?.createdAt)}
                    </Text>
                </Box>

                <FormFolderImage folder={folder} />
            </VStack>
        </Flex>
    );
}
