import {
    Collapse,
    HStack,
    Icon,
    Spacer,
    Tag,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {
    CheckCircleIcon,
    ChevronDownIcon,
    ChevronUpIcon,
    XCircleIcon,
} from '@heroicons/react/24/solid';
import { type IValidateItem } from '@share/seo/seo.hooks';

function ValidateMessage({ label, valid }: { label: string; valid: boolean }) {
    return (
        <HStack>
            <Icon
                color={valid ? 'green' : 'red'}
                as={valid ? CheckCircleIcon : XCircleIcon}
                boxSize="5"
            />
            <Text as="span" fontSize="sm" color="gray.500">
                {label}
            </Text>
        </HStack>
    );
}

function ErrorTag({ errorNumber }: { errorNumber: number }) {
    const isError = errorNumber > 0;
    const label = isError ? `${errorNumber} errors` : 'All done';
    const colorScheme = isError ? 'red' : 'green';
    return (
        <Tag colorScheme={colorScheme} size="sm">
            {label}
        </Tag>
    );
}

function ValidateSeo({ validate }: { validate: IValidateItem }) {
    const { isOpen, onToggle } = useDisclosure();

    const errorNumber = validate.list.filter((i) => !i.valid).length;

    return (
        <>
            <HStack
                px="6"
                py="4"
                onClick={onToggle}
                borderBottomWidth="1px"
                bgColor={isOpen ? 'gray.50' : 'white'}
            >
                <Text as="span" fontWeight="medium">
                    {validate.label}
                </Text>

                <ErrorTag errorNumber={errorNumber} />

                <Spacer />
                <Icon as={isOpen ? ChevronUpIcon : ChevronDownIcon} />
            </HStack>

            <Collapse in={isOpen} animateOpacity>
                <VStack
                    p="6"
                    borderBottomWidth="1px"
                    align="stretch"
                    spacing="1"
                >
                    {validate.list.map((i) => (
                        <ValidateMessage
                            key={i.label}
                            label={i.label}
                            valid={i.valid}
                        />
                    ))}
                </VStack>
            </Collapse>
        </>
    );
}

export function SeoCheckDocument({ list }: { list: Array<IValidateItem> }) {
    return (
        <>
            {list.map((item) => (
                <ValidateSeo key={item.id} validate={item} />
            ))}
        </>
    );
}
