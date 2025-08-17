import {
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { Copy, HeroIcon } from '@components/ui';
import {
    DocumentDuplicateIcon,
    EllipsisHorizontalCircleIcon,
} from '@heroicons/react/24/outline';

export function ActionTreeOutlineDocument({
    //  onCreateContent,
    text,
}: {
    text: string;
    // onCreateContent: () => void;
}) {
    return (
        <Menu>
            <MenuButton
                type="button"
                as={IconButton}
                variant="ghost"
                size="xs"
                aria-label="Action"
                icon={<HeroIcon as={EllipsisHorizontalCircleIcon} />}
            />
            <MenuList minW="0">
                <Copy content={text}>
                    <MenuItem icon={<HeroIcon as={DocumentDuplicateIcon} />}>
                        Sao chép
                    </MenuItem>
                </Copy>
            </MenuList>
        </Menu>
    );
}
