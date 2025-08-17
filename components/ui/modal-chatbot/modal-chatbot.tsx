import {
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    IconButton,
    Tooltip,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {
    ChatConversation,
    ListMessageConversation,
    StopGenerating,
} from '@components/page/user/chatbot';
import { ContextConversationProvider } from '@components/page/user/chatbot/context.conversation';
import { ChatBubbleBottomCenterTextIcon } from '@heroicons/react/24/outline';
import { useConversationDefault } from '@share/hooks/chatbot.hooks';
import { useMobile } from '@share/hooks/size.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { HeroIcon } from '../icon';
import { Loading } from '../loading';

export function ModalChatbot() {
    const { t } = useTranslate();

    const { isOpen, onClose, onOpen } = useDisclosure();

    const user = useAuthStore((state) => state.user);

    const { isLoading, data } = useConversationDefault(user?.defaultProjectId);

    const isMobile = useMobile();

    const LABEL = t('dashboard.heading.assistant');

    function renderContent() {
        if (isLoading) {
            return <Loading />;
        }

        return (
            <ContextConversationProvider>
                <VStack align="stretch" h="full">
                    <Box flex="1" p="6" overflowY="auto">
                        <ListMessageConversation
                            showTitle={false}
                            conversation={data?.conversationDefault}
                        />
                    </Box>
                    <Box py="4" px="6" borderTopWidth="1px">
                        <VStack align="stretch" spacing="4">
                            <VStack>
                                <StopGenerating />
                            </VStack>
                            <ChatConversation
                                conversation={data?.conversationDefault}
                            />
                        </VStack>
                    </Box>
                </VStack>
            </ContextConversationProvider>
        );
    }

    return (
        <>
            <Tooltip label={LABEL}>
                {isMobile ? (
                    <IconButton
                        bgColor="gray.100"
                        rounded="full"
                        size="sm"
                        onClick={onOpen}
                        aria-label="Toggle"
                        color="teal.500"
                        icon={<HeroIcon as={ChatBubbleBottomCenterTextIcon} />}
                    />
                ) : (
                    <Button
                        rounded="full"
                        size="sm"
                        onClick={onOpen}
                        aria-label="Toggle"
                        colorScheme="teal"
                        leftIcon={
                            <HeroIcon as={ChatBubbleBottomCenterTextIcon} />
                        }
                    >
                        {LABEL}
                    </Button>
                )}
            </Tooltip>

            <Drawer onClose={onClose} size="md" isOpen={isOpen}>
                <DrawerOverlay />

                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">{LABEL}</DrawerHeader>
                    <DrawerBody px="0">{renderContent()}</DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    );
}
