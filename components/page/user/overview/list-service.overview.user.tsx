import { ListService, Loading } from '@components/ui';
import { useServices } from '@share/hooks/service.hooks';
import { useUserOverviewStore } from './oveview.store';

export function ListServiceOverViewUser() {
    const categoryId = useUserOverviewStore((state) => state.categorySelectId);
    const { isLoading, data } = useServices({
        page: 1,
        perPage: 50,
        categoryId,
    });

    if (isLoading) {
        return <Loading />;
    }

    const services = data.services.data;

    return <ListService services={services} />;
}
