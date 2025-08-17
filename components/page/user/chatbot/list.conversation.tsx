import {
    Box,
    HStack,
    IconButton,
    Input,
    MenuItem,
    StackDivider,
    Text,
    Tooltip,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, HeroIcon, Loading, MenuAction } from '@components/ui';
import { ConversationInfoFragment } from '@generated/graphql/query';
import {
    CheckIcon,
    EllipsisHorizontalCircleIcon,
    EllipsisHorizontalIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    useConversations,
    useUpdateConversation,
} from '@share/hooks/chatbot.hooks';
import { usePagination } from '@share/hooks/pagination.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RemoveConversation } from './remove.conversation';

function ConversationItem({
    conversation,
}: {
    conversation: ConversationInfoFragment;
}) {
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { t } = useTranslate();
    const router = useRouter();
    const { isLoading, mutate } = useUpdateConversation();

    const schema = z.object({
        title: z.string().min(1, ''),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: conversation?.title,
        },
    });

    const onSubmit = handleSubmit((data) => {
        if (isLoading) return;

        mutate(
            {
                input: {
                    id: conversation.id,
                    title: data.title,
                },
            },
            {
                onSuccess() {
                    onClose();
                },
            }
        );
    });

    if (isOpen) {
        return (
            <HStack as="form" noValidate onSubmit={onSubmit}>
                <FormField error={errors?.title?.message}>
                    <Input {...register('title')} size="xs" rounded="md" />
                </FormField>
                <IconButton
                    type="button"
                    isDisabled={isLoading}
                    size="xs"
                    colorScheme="red"
                    aria-label="Exit"
                    onClick={onClose}
                    icon={<HeroIcon as={XMarkIcon} />}
                />
                <IconButton
                    type="submit"
                    isLoading={isLoading}
                    size="xs"
                    colorScheme="green"
                    aria-label="Exit"
                    onClick={onClose}
                    icon={<HeroIcon as={CheckIcon} />}
                />
            </HStack>
        );
    }

    const conversationId = router.query.id;
    const isActive = conversationId === conversation.id;
    const bgColor = isActive ? 'blue.100' : 'transparent';
    const color = isActive ? 'blue.600' : 'gray.500';
    const icon = isActive
        ? EllipsisHorizontalCircleIcon
        : EllipsisHorizontalIcon;

    const title =
        conversation.title !== 'Default'
            ? conversation.title
            : t('commons.default');

    return (
        <HStack
            rounded="md"
            cursor="pointer"
            bgColor={bgColor}
            _hover={{
                bgColor: isActive ? 'blue.200' : 'gray.50',
            }}
        >
            <Tooltip label={title}>
                <Text
                    flex="1"
                    as={Link}
                    display="block"
                    px="3"
                    py="1"
                    href={`/user/chatbot/${conversation.id}`}
                    noOfLines={1}
                    fontSize="sm"
                    color={color}
                    fontWeight="semibold"
                >
                    {title}
                </Text>
            </Tooltip>
            <MenuAction
                button={{
                    children: (
                        <IconButton
                            size="sm"
                            bg="transparent"
                            aria-label="Action"
                            icon={<HeroIcon color="gray.500" as={icon} />}
                        />
                    ),
                }}
            >
                <>
                    <MenuItem onClick={onOpen}>{t('commons.edit')}</MenuItem>

                    <RemoveConversation conversationId={conversation.id}>
                        <MenuItem>{t('commons.delete')}</MenuItem>
                    </RemoveConversation>
                </>
            </MenuAction>
        </HStack>
    );
}

export function ListConversation() {
    const { t } = useTranslate();
    const { page, perPage } = usePagination();
    const { isLoading, data } = useConversations({
        page: page,
        perPage,
    });

    const total = data?.conversations?.pagination?.total || 0;

    if (total === 0) return null;

    return (
        <VStack align="stretch" divider={<StackDivider />}>
            <HStack>
                <Text fontWeight="semibold" fontSize="sm">
                    {t('commons.list')}
                </Text>
            </HStack>
            <Box>
                <VStack align="stretch">
                    {data?.conversations.data?.map((item) => (
                        <ConversationItem conversation={item} key={item.id} />
                    ))}
                    {isLoading ? <Loading /> : null}
                </VStack>
            </Box>
        </VStack>
    );
}
