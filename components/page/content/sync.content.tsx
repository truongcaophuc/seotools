import {
    Box,
    Button,
    Checkbox,
    CheckboxGroup,
    HStack,
    Select,
    SimpleGrid,
    Spacer,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { FormField, Loading, Modal } from '@components/ui';
import { ChannelType, ContentTypeEnum } from '@generated/graphql/query';
import { zodResolver } from '@hookform/resolvers/zod';
import {
    usePageChannels,
    useSyncContentPageChannel,
} from '@share/hooks/channel.hooks';
import { useParseContentDocument } from '@share/hooks/document.hooks';
import { cloneElement, ReactElement, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Content } from '../user/ai/form.ai/content';

const schema = z.object({
    channelType: z.enum(
        [ChannelType.Facebook, ChannelType.Zalo, ChannelType.Wordpress],
        {
            errorMap(issue, ctx) {
                return { message: 'Chọn nền tảng đồng bộ' };
            },
        }
    ),
    pageIds: z
        .array(z.string())
        .min(1, 'Chọn trang để đồng bộ nội dung')
        .max(10, 'Số lượng trang chọn đồng bộ phải bé hơn 10'),
});

interface Props {
    contentType?: ContentTypeEnum;
    contentId: string;
    children: ReactElement;
}

export function SyncContent({
    children,
    contentId,
    contentType = ContentTypeEnum.Content,
}: Props) {
    const { editorStateTextString, editorStateHtml } =
        useParseContentDocument();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { isLoading, mutate } = useSyncContentPageChannel();

    const {
        handleSubmit,
        register,
        reset,
        setValue,
        formState: { errors },
        watch,
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: {
            pageIds: [],
        },
    });

    const channelType = watch('channelType');

    const { data, isLoading: isLoadingPageChannel } = usePageChannels({
        isAll: true,
        isActive: true,
        type: channelType,
    });

    useEffect(() => {
        if (channelType) {
            setValue('pageIds', []);
        }
    }, [channelType]);

    function handleCancel() {
        reset();
        onClose();
    }

    const onSubmit = handleSubmit((data) => {
        const content =
            data?.channelType === ChannelType.Wordpress
                ? editorStateHtml
                : editorStateTextString;
        mutate(
            {
                input: {
                    contentId: contentId,
                    content,
                    channelType: data.channelType as ChannelType,
                    pageIds: data.pageIds,
                    contentType,
                },
            },
            {
                onSuccess() {
                    reset();
                    onClose();
                },
            }
        );
    });

    const channels = data?.pageChannels?.data || [];

    function renderListPageChannel() {
        if (isLoadingPageChannel) {
            return <Loading />;
        }

        if (!channelType) {
            return (
                <Text color="gray.500" fontSize="sm" textAlign="center">
                    Vui lòng chọn nền tảng đồng bộ
                </Text>
            );
        }
        if (channels.length === 0) {
            return (
                <Text color="gray.500" fontSize="sm" textAlign="center">
                    Không có dữ liệu
                </Text>
            );
        }

        return (
            <SimpleGrid spacing="2" columns={[2]}>
                {channels.map((item) => (
                    <Checkbox
                        {...register('pageIds')}
                        value={item.id}
                        key={item.id}
                        colorScheme="blue"
                        size="sm"
                    >
                        {item.name}
                    </Checkbox>
                ))}
            </SimpleGrid>
        );
    }

    return (
        <>
            {cloneElement(children, { onClick: onOpen })}
            <Modal size="xl" title="Đồng bộ" isOpen={isOpen} onClose={onClose}>
                <VStack
                    as="form"
                    noValidate
                    align="stretch"
                    spacing="5"
                    onSubmit={onSubmit}
                >
                    <FormField
                        isRequired
                        label="Nền tảng"
                        error={errors?.channelType?.message}
                    >
                        <Select
                            {...register('channelType')}
                            placeholder="Chọn nền tảng"
                        >
                            <option value={ChannelType.Facebook}>
                                Facebook
                            </option>
                            <option value={ChannelType.Wordpress}>
                                Wordpress
                            </option>
                            <option disabled value={ChannelType.Zalo}>
                                Zalo
                            </option>
                        </Select>
                    </FormField>
                    <FormField
                        isRequired
                        label="Chọn trang"
                        error={errors?.pageIds?.message}
                        helpText={
                            !errors?.pageIds?.message
                                ? 'Chọn tối đa 10 trang'
                                : undefined
                        }
                    >
                        <CheckboxGroup colorScheme="green">
                            <Box borderWidth="1px" rounded="md" p="4">
                                {renderListPageChannel()}
                            </Box>
                        </CheckboxGroup>
                    </FormField>

                    <HStack>
                        <Spacer />
                        <Button
                            type="button"
                            variant="ghost"
                            onClick={handleCancel}
                        >
                            Huỷ
                        </Button>
                        <Button
                            isLoading={isLoading}
                            type="submit"
                            colorScheme="green"
                        >
                            Đồng bộ
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
