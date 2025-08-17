import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';
import { IconButton } from '@components/ui';
import { KeywordInfoFragment } from '@generated/graphql/query';
import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline';
import { useDeleteKeyword } from '@share/hooks/keyword.hooks';
import { useRouter } from 'next/router';

interface Props {
    keyword: KeywordInfoFragment;
}

export function MenuActionKeyword({ keyword }: Props) {
    const router = useRouter();
    const { isLoading, mutate } = useDeleteKeyword();

    function handleRemoveKeyword() {
        mutate(
            {
                id: keyword.id,
            },
            {
                onSuccess() {
                    router.push('/user/keyword');
                },
            }
        );
    }

    return (
        <Menu>
            <MenuButton type="button">
                <IconButton aria-label="Action" icon={EllipsisHorizontalIcon} />
            </MenuButton>
            <MenuList minW="auto" w="120px">
                <MenuItem isDisabled={isLoading} onClick={handleRemoveKeyword}>
                    Xoá
                </MenuItem>
            </MenuList>
        </Menu>
    );
}
