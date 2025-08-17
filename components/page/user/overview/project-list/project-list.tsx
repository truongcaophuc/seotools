import { Button, Heading, HStack, Spacer, VStack } from '@chakra-ui/react';
import { HeroIcon, RenderListData, ViewType } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useProjects } from '@share/hooks/project.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useViewType } from '@share/hooks/use.view-type';
import { AddProject } from '../../project/add.project';
import { getColumnProject } from '../../project/table.project';
import { CardProjectList } from './card.project-list';

export function ProjectList() {
    const { t } = useTranslate();
    const { page, perPage, setPage, setPerPage } = usePagination();
    const { viewType, setViewType } = useViewType();
    const { data, isLoading } = useProjects({
        page,
        perPage,
    });

    const projects = data?.projects?.data || [];
    const columns = getColumnProject(t);

    return (
        <VStack spacing="5" align="stretch">
            <HStack>
                <Heading fontSize="xl" as="h3">
                    {t('overview.project')}
                </Heading>
                <Spacer />
                <ViewType type={viewType} onChange={setViewType} />
                <AddProject>
                    <Button
                        size="sm"
                        leftIcon={<HeroIcon as={PlusIcon} />}
                        colorScheme="blue"
                    >
                        {t('commons.add')}
                    </Button>
                </AddProject>
            </HStack>
            <RenderListData
                isLoading={isLoading}
                viewType={viewType}
                columns={columns}
                data={projects}
                pagination={{
                    values: data?.projects?.pagination,
                    onChangePage: setPage,
                    onChangePerPage: setPerPage,
                }}
                renderItems={() =>
                    projects.map((item) => (
                        <CardProjectList key={item.id} project={item} />
                    ))
                }
                numberColumn={5}
            />
        </VStack>
    );
}
