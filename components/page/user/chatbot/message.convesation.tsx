import {
    Avatar,
    AvatarProps,
    Box,
    HStack,
    Text,
    VStack,
} from '@chakra-ui/react';
import { Copy, HeroIcon, Markdown } from '@components/ui';
import { ConversationItemInfoFragment } from '@generated/graphql/query';
import {
    ClipboardDocumentIcon,
    CpuChipIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { useDeleteMessageInConversation } from '@share/hooks/chatbot.hooks';
import { useState } from 'react';

interface MessageProps {
    message: ConversationItemInfoFragment;
}

function AvatarChat({ fullname }: { fullname: string }) {
    const avatarProps: AvatarProps = {
        rounded: 'md',
        size: 'sm',
    };

    if (!fullname) {
        return (
            <Avatar
                icon={<HeroIcon as={CpuChipIcon} />}
                {...avatarProps}
                bgColor="green.500"
            />
        );
    }

    return <Avatar name={fullname} {...avatarProps} />;
}

export function DeleteMessageConversation({ message }: MessageProps) {
    const { isLoading, mutate } = useDeleteMessageInConversation();

    function handleDeleteMessage() {
        if (isLoading) return;
        mutate({
            messageId: message.id,
        });
    }

    const color = isLoading ? 'gray.300' : 'gray.400';

    return (
        <HeroIcon
            onClick={handleDeleteMessage}
            cursor={isLoading ? 'progress' : 'pointer'}
            as={XMarkIcon}
            color={color}
            _hover={{
                color: isLoading ? 'gray.300' : 'gray.500',
            }}
        />
    );
}

export function MessageConversation({ message }: MessageProps) {
    const [isHover, setIsHover] = useState<boolean>(false);
    const name = message?.createdBy
        ? message?.createdBy?.fullname
        : 'Ai Assistant';

    return (
        <HStack
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            align="start"
            spacing="5"
        >
            <AvatarChat fullname={message?.createdBy?.fullname} />

            <Box flex="1">
                <Box mb="2">
                    <Text
                        as="span"
                        fontSize="sm"
                        fontWeight="semibold"
                        color="gray.500"
                    >
                        {name}
                    </Text>
                </Box>

                <Markdown content={message.message} />
            </Box>

            <Box flexShrink="0" w="30px" pos="relative">
                {isHover ? (
                    <VStack spacing="1.5" pos="absolute" top="-5px" right="0">
                        <Copy content={message.message}>
                            <HeroIcon
                                cursor="pointer"
                                as={ClipboardDocumentIcon}
                                color="gray.400"
                                _hover={{
                                    color: 'gray.500',
                                }}
                            />
                        </Copy>

                        <DeleteMessageConversation message={message} />
                    </VStack>
                ) : null}
            </Box>
        </HStack>
    );
}
