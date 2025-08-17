import {
    Button,
    HStack,
    IconButton,
    Input,
    useDisclosure,
} from '@chakra-ui/react';
import { FormField, HeroIcon } from '@components/ui';
import { CheckIcon, PlusIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useOutlineStore } from '@share/store/outline.store';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    text: z.string().min(1, ''),
});

export function FormCreateOutlineDocument() {
    const addOutline = useOutlineStore((state) => state.addOutline);
    const { isOpen, onToggle } = useDisclosure();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
    });

    const onSubmit = handleSubmit((data) => {
        addOutline(data.text);
        reset();
        onToggle();
    });

    if (isOpen) {
        return (
            <HStack as="form" onSubmit={onSubmit}>
                <FormField error={errors?.text?.message}>
                    <Input {...register('text')} />
                </FormField>
                <IconButton
                    type="submit"
                    aria-label="Add"
                    colorScheme="green"
                    icon={<HeroIcon as={CheckIcon} />}
                />

                <IconButton
                    aria-label="Cancel"
                    onClick={onToggle}
                    type="button"
                    colorScheme="red"
                    icon={<HeroIcon as={XMarkIcon} />}
                />
            </HStack>
        );
    }

    return (
        <Button
            size="sm"
            bgColor="gray.200"
            onClick={onToggle}
            aria-label="Toggle"
            leftIcon={<HeroIcon as={PlusIcon} />}
        >
            Thêm
        </Button>
    );
}
