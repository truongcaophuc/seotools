import {
    Box,
    HStack,
    Icon,
    Spacer,
    Text,
    Tooltip,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { useDashboardStore } from '@components/layout/dashboard/dashboard.store';
import { HeroIcon, Modal } from '@components/ui';
import {
    ChevronUpDownIcon,
    EllipsisHorizontalIcon,
} from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { ListProject } from './list.project';

export function DefaultProject() {
    const { t } = useTranslate();
    const isOpenLayout = useDashboardStore((state) => state.isOpen);
    const user = useAuthStore((state) => state.user);
    const { onToggle, isOpen } = useDisclosure();

    const label =
        user?.defaultProject?.name ||
        t('dashboard.sidebar.customer.select_project');

    return (
        <>
            {isOpenLayout ? (
                <Box px="4">
                    <HStack
                        px="3"
                        py="2"
                        borderWidth="1px"
                        rounded="md"
                        borderColor="blue.700"
                        onClick={onToggle}
                        color="gray.100"
                        cursor="pointer"
                    >
                        <Text fontSize="sm" as="span">
                            {label}
                        </Text>
                        <Spacer />
                        <HeroIcon color="gray.300" as={ChevronUpDownIcon} />
                    </HStack>
                </Box>
            ) : (
                <Tooltip label={label} placement="right">
                    <VStack spacing="0" onClick={onToggle} cursor="pointer">
                        <Icon
                            color="white"
                            as={EllipsisHorizontalIcon}
                            boxSize="6"
                        />
                        <Text noOfLines={1} fontSize="xs" color="gray.100">
                            {t('dashboard.sidebar.customer.project')}
                        </Text>
                    </VStack>
                </Tooltip>
            )}

            <Modal
                size="2xl"
                title="Chọn dự án"
                isOpen={isOpen}
                onClose={onToggle}
            >
                <ListProject />
            </Modal>
        </>
    );
}
