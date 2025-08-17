import { HStack, IconButton, Input } from '@chakra-ui/react';
import { FormField, HeroIcon } from '@components/ui';
import { CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { cloneElement, ReactElement, useState } from 'react';
import { useForm } from 'react-hook-form';

interface Props {
    children: ReactElement;
    value: string;
    onChange: (value: string) => void;
}

export function FormEditTextOutlineDocument({
    children,
    value,
    onChange,
}: Props) {
    const [isEdit, setIsEdit] = useState<boolean>(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            value,
        },
    });

    const onSubmit = handleSubmit((data) => {
        onChange(data.value);
        setIsEdit(false);
    });

    if (isEdit) {
        return (
            <HStack as="form" flex="1" onSubmit={onSubmit}>
                <FormField error={errors?.value?.message}>
                    <Input
                        autoFocus
                        {...register('value', {
                            required: { value: true, message: '' },
                            min: { value: 1, message: '' },
                        })}
                    />
                </FormField>
                <IconButton
                    size="xs"
                    icon={<HeroIcon as={XMarkIcon} />}
                    type="button"
                    onClick={() => setIsEdit(false)}
                    colorScheme="red"
                    aria-label="exit"
                />
                <IconButton
                    aria-label="Submit"
                    icon={<HeroIcon as={CheckIcon} />}
                    size="xs"
                    colorScheme="green"
                    type="submit"
                />
            </HStack>
        );
    }

    return <>{cloneElement(children, { onClick: () => setIsEdit(true) })}</>;
}
