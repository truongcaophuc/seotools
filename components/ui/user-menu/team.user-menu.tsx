import { Select, Skeleton } from '@chakra-ui/react';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { useTeamDefault } from '@share/hooks/team.hooks';
import { HeroIcon } from '../icon';

export function TeamUserMenu() {
    const { isLoading, data } = useTeamDefault();

    return (
        <Skeleton isLoaded={!isLoading} w="full">
            <>
                <Select
                    isReadOnly
                    icon={<HeroIcon as={ChevronUpDownIcon} />}
                    placeholder={data?.teamDefault?.name || 'Chọn team'}
                    size="sm"
                    rounded="md"
                ></Select>
            </>
        </Skeleton>
    );
}
