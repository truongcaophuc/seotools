import {
    Box,
    Collapse,
    HStack,
    Spacer,
    useDisclosure,
    IconButton,
    VStack,
} from '@chakra-ui/react';
import { Heading, HeroIcon } from '@components/ui';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { SubTTreeOutlineItem } from './sub.tree.outline.document';
import { TTreeOutlineItem } from './tree.outline.document';

export function ItemTreeOutlineDocument({
    outlineItem,
}: {
    outlineItem: TTreeOutlineItem;
}) {
    const { isOpen, onToggle } = useDisclosure({
        defaultIsOpen: true,
    });

    const icon = isOpen ? ChevronUpIcon : ChevronDownIcon;

    return (
        <Box py="2">
            <HStack px="3">
                <Heading fontSize="sm" as="h3" fontWeight="medium">
                    {outlineItem.title}
                </Heading>
                <Spacer />
                <IconButton
                    size="sm"
                    onClick={onToggle}
                    icon={<HeroIcon as={icon} boxSize="4" />}
                    aria-label="Toggle"
                />
            </HStack>

            <Collapse in={isOpen} animateOpacity>
                <VStack p="2" align="stretch">
                    {outlineItem.items.map((i) => (
                        <SubTTreeOutlineItem text={i.text} key={i.id} />
                    ))}
                </VStack>
            </Collapse>
        </Box>
    );
}
