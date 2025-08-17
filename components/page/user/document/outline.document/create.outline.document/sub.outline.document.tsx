import {
    Box,
    HStack,
    IconButton,
    Input,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, HeroIcon } from '@components/ui';
import { PlusIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { TSubOutlineItem, useOutlineStore } from '@share/store/outline.store';
import { useForm } from 'react-hook-form';
import { FormEditTextOutlineDocument } from './form-edit-text.outline.document';

function AddSubOutlineDocument({ outlineId }: { outlineId: number }) {
    const addSubOutline = useOutlineStore((state) => state.addSubOutline);

    const { isOpen, onToggle } = useDisclosure();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<{ text: string }>();

    const onSubmit = handleSubmit(function (data) {
        addSubOutline({ outlineId, text: data.text });
        reset();
        onToggle();
    });

    if (isOpen) {
        return (
            <HStack as="form" onSubmit={onSubmit}>
                <FormField error={errors?.text?.message}>
                    <Input
                        autoFocus
                        {...register('text', {
                            required: '',
                        })}
                    />
                </FormField>
                <IconButton
                    type="submit"
                    aria-label="Add"
                    icon={<HeroIcon as={PlusIcon} />}
                />
                <IconButton
                    onClick={onToggle}
                    aria-label="Delete"
                    icon={<HeroIcon as={XMarkIcon} />}
                />
            </HStack>
        );
    }

    return (
        <Text
            color="gray.400"
            fontWeight="medium"
            fontSize="sm"
            onClick={onToggle}
        >
            Thêm...
        </Text>
    );
}

interface Props {
    subOutline: Array<TSubOutlineItem>;
    outlineId: number;
}

export function SubOutlineDocument({ subOutline, outlineId }: Props) {
    const removeSubOutline = useOutlineStore((state) => state.removeSubOutline);
    const setOutline = useOutlineStore((state) => state.setOutline);
    const outline = useOutlineStore((state) => state.outline);

    return (
        <VStack align="stretch">
            {subOutline.map((i, idx) => {
                function handleDeleteSubOutline() {
                    removeSubOutline({ idx, outlineId });
                }

                function handleChange(value: string) {
                    const newOutline = outline.map((item) => {
                        if (item.id === outlineId) {
                            const items = item.items.map((m) => {
                                if (m.id === i.id)
                                    return {
                                        ...m,
                                        text: value,
                                    };

                                return m;
                            });

                            return {
                                ...item,
                                items,
                            };
                        }
                        return item;
                    });

                    setOutline(newOutline);
                }

                return (
                    <HStack px="4" key={idx}>
                        <FormEditTextOutlineDocument
                            value={i.text}
                            onChange={handleChange}
                        >
                            <Text>{i.text}</Text>
                        </FormEditTextOutlineDocument>

                        <IconButton
                            onClick={handleDeleteSubOutline}
                            size="xs"
                            icon={<HeroIcon as={TrashIcon} />}
                            aria-label="Delete"
                        />
                    </HStack>
                );
            })}

            <Box px="4">
                <AddSubOutlineDocument outlineId={outlineId} />
            </Box>
        </VStack>
    );
}
