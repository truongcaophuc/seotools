import {
    Box,
    Center,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Menu,
    MenuItem,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverContentProps,
    PopoverTrigger,
    Spinner,
    Text,
} from '@chakra-ui/react';
import {
    ChevronDownIcon,
    ChevronUpIcon,
    FolderIcon,
} from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ReactNode, useRef } from 'react';
import { SearchForm } from '../form';
import { HeroIcon } from '../icon';

export interface IOptionSelect {
    id: string;
    name: string;
}

interface Props {
    children?: ReactNode;
    data: Array<IOptionSelect>;
    onSelect: (value?: IOptionSelect | null) => void;
    onSearch?: (value: string) => void;
    containerProps?: PopoverContentProps;
    total?: number;
    hasArrow?: boolean;
    value?: IOptionSelect;
    placeholder?: string;
    isLoading?: boolean;
}

export function Select({
    data,
    value,
    onSelect,
    isLoading,
    onSearch,
    placeholder,
    containerProps,
    total = 0,
    hasArrow,
}: Props) {
    const { t } = useTranslate();
    const initRef = useRef<any>();

    function renderRightElement(isOpen: boolean) {
        if (isLoading) {
            return <Spinner color="gray.200" size="sm" />;
        }
        return (
            <HeroIcon
                boxSize="4"
                as={isOpen ? ChevronUpIcon : ChevronDownIcon}
                color="gray.300"
            />
        );
    }

    const placeholderValue = placeholder || t('commons.all');

    return (
        <Popover closeOnBlur initialFocusRef={initRef}>
            {({ isOpen, onClose }) => (
                <>
                    <PopoverTrigger>
                        <InputGroup cursor="pointer">
                            <InputLeftElement
                                children={
                                    <HeroIcon
                                        as={FolderIcon}
                                        color="gray.300"
                                    />
                                }
                            />
                            {!!value ? (
                                <Input
                                    fontSize="sm"
                                    isReadOnly
                                    placeholder={placeholderValue}
                                    value={value?.name}
                                />
                            ) : (
                                <Input
                                    fontSize="sm"
                                    isReadOnly
                                    placeholder={placeholder}
                                    value=""
                                />
                            )}
                            <InputRightElement
                                onClick={onClose}
                                children={renderRightElement(isOpen)}
                            />
                        </InputGroup>
                    </PopoverTrigger>

                    <PopoverContent maxW="250px" {...containerProps}>
                        {hasArrow ? <PopoverArrow /> : null}
                        <PopoverBody px="0" pb="0">
                            {onSearch ? (
                                <Box px="3" pb="2" borderBottomWidth="1px">
                                    <SearchForm onSearch={onSearch} />
                                </Box>
                            ) : null}
                            <Box pb="2">
                                <Menu>
                                    <MenuItem
                                        py="1"
                                        fontSize="sm"
                                        color="gray.600"
                                        _hover={{ bgColor: 'gray.100' }}
                                        onClick={() => onSelect(null)}
                                    >
                                        {placeholder}
                                    </MenuItem>

                                    {data.map((item) => {
                                        function handleClick() {
                                            onSelect(item);
                                            onClose();
                                        }
                                        return (
                                            <MenuItem
                                                py="1"
                                                fontSize="sm"
                                                color="gray.600"
                                                _hover={{ bgColor: 'gray.100' }}
                                                onClick={handleClick}
                                                key={item.id}
                                            >
                                                {item.name}
                                            </MenuItem>
                                        );
                                    })}
                                </Menu>
                            </Box>
                            {total > 0 ? (
                                <Center py="2" borderTopWidth="1px">
                                    <Text
                                        fontWeight="medium"
                                        as="span"
                                        fontSize="xs"
                                        color="gray.500"
                                    >
                                        {t('commons.quantity')} {total}
                                    </Text>
                                </Center>
                            ) : null}
                        </PopoverBody>
                    </PopoverContent>
                </>
            )}
        </Popover>
    );
}
