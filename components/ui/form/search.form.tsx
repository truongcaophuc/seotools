import {
    Box,
    CloseButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputProps,
    InputRightElement,
} from '@chakra-ui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { HeroIcon } from '../icon';

interface Props {
    placeholder?: string;
    onSearch: (text?: string) => void;
    inputProps?: InputProps;
    defaultValue?: string;
}

export function SearchForm({
    placeholder,
    inputProps,
    onSearch,
    defaultValue,
}: Props) {
    const { t } = useTranslate();

    const { register, handleSubmit, watch, setValue } = useForm<{
        text: string;
    }>({
        defaultValues: {
            text: defaultValue,
        },
    });

    function handleClear() {
        setValue('text', undefined);
        onSubmit(undefined);
    }

    const onSubmit = handleSubmit((data) => {
        onSearch(data.text);
    });

    useEffect(() => {
        if (defaultValue) {
            setValue('text', defaultValue);
        }
    }, [defaultValue]);

    const text = watch('text');

    return (
        <Box pos="relative" as="form" onSubmit={onSubmit} noValidate>
            <InputGroup>
                <InputLeftElement
                    pointerEvents="none"
                    children={
                        <HeroIcon as={MagnifyingGlassIcon} color="gray.300" />
                    }
                />
                <Input
                    pr="30px"
                    fontSize="sm"
                    placeholder={placeholder || t('commons.search')}
                    {...register('text')}
                    {...inputProps}
                />
                {text?.length > 0 ? (
                    <InputRightElement
                        children={
                            <CloseButton
                                onClick={handleClear}
                                color="gray.500"
                                _hover={{
                                    color: 'blue.600',
                                }}
                                size="sm"
                                pos="absolute"
                                top="8px"
                                right="5px"
                            />
                        }
                    />
                ) : null}
            </InputGroup>
        </Box>
    );
}
