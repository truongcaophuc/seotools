import {
    HStack,
    IconButton,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from '@chakra-ui/react';
import { Heading, HeroIcon } from '@components/ui';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { TTreeOutlineItem, useOutlineStore } from '@share/store/outline.store';
import { FormEditTextOutlineDocument } from './form-edit-text.outline.document';
import { SubOutlineDocument } from './sub.outline.document';

interface Props {
    item: TTreeOutlineItem;
}

export function RowOutlineDocument({ item }: Props) {
    const removeOutline = useOutlineStore((state) => state.removeOutline);
    const outline = useOutlineStore((state) => state.outline);
    const setOutline = useOutlineStore((state) => state.setOutline);

    function handleDelete() {
        removeOutline(item.id);
    }

    function handleChange(value: string) {
        const newOutline = outline.map((i) => {
            if (i.id === item.id) {
                return {
                    ...i,
                    title: value,
                };
            }
            return i;
        });
        setOutline(newOutline);
    }

    return (
        <>
            <HStack bgColor="white" p="2" key={item.id}>
                <FormEditTextOutlineDocument
                    value={item.title}
                    onChange={handleChange}
                >
                    <Heading flex="1" fontSize="md">
                        {item.title}
                    </Heading>
                </FormEditTextOutlineDocument>
                <Menu>
                    <MenuButton
                        as={IconButton}
                        type="button"
                        variant="ghost"
                        icon={<HeroIcon as={EllipsisHorizontalCircleIcon} />}
                    />
                    <MenuList>
                        <MenuItem onClick={handleDelete}>Xoá</MenuItem>
                        <MenuItem>Thêm</MenuItem>
                    </MenuList>
                </Menu>
            </HStack>

            <SubOutlineDocument outlineId={item.id} subOutline={item.items} />
        </>
    );
}
