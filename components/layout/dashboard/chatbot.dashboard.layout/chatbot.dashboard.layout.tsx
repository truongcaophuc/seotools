import { Box, Button, Flex } from '@chakra-ui/react';
import {
    DashboardLayout,
    DashboardLayoutProps,
} from '@components/layout/dashboard';
import {
    AddConversation,
    ListConversation,
} from '@components/page/user/chatbot';
import { HeroIcon, NotValidBalance } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useValidWorkspace } from '@share/hooks/account.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';

export function ChatbotDashboardLayout({
    children,
    ...props
}: DashboardLayoutProps) {
    const { t } = useTranslate();
    const isValidBalance = useValidWorkspace();

    if (!isValidBalance) {
        return (
            <DashboardLayout
                type="customer"
                title="Tài khoản không đủ"
                showHeading={false}
                breadcrumb={[{ label: 'Chatbot' }]}
            >
                <NotValidBalance />
            </DashboardLayout>
        );
    }

    return (
        <DashboardLayout
            type="customer"
            showHeading={false}
            layout="full"
            showChatbot={false}
            {...props}
        >
            <Flex h="full">
                <Box
                    borderRightWidth="1px"
                    p="5"
                    w="full"
                    overflowY="auto"
                    maxW="250px"
                >
                    <Box mb="5">
                        <AddConversation>
                            <Button
                                colorScheme="green"
                                size="sm"
                                leftIcon={<HeroIcon as={PlusIcon} />}
                                w="full"
                            >
                                {t('commons.add')}
                            </Button>
                        </AddConversation>
                    </Box>

                    <ListConversation />
                </Box>
                {children}
            </Flex>
        </DashboardLayout>
    );
}
