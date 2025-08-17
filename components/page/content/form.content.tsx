import {
    Box,
    Button,
    Container,
    HStack,
    Input,
    MenuItem,
    Spacer,
    VStack,
} from '@chakra-ui/react';
import {
    Editor,
    FormField,
    HeroIcon,
    LexicalComposerInit,
    MenuAction,
} from '@components/ui';
import { ContentInfoFragment } from '@generated/graphql/query';
import {
    ArrowLeftIcon,
    ArrowPathRoundedSquareIcon,
} from '@heroicons/react/24/outline';
import { zodResolver } from '@hookform/resolvers/zod';
import { useUpdateContent } from '@share/hooks/content.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { pick } from 'lodash';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { CopyContent } from './copy.content';
import { DeleteContent } from './delete.content';
import { SyncContent } from './sync.content';

interface Props {
    content: ContentInfoFragment;
}

export function FormContent({ content }: Props) {
    const { t } = useTranslate();
    const { mutate, isLoading } = useUpdateContent();

    const schema = z.object({
        title: z
            .string()
            .min(1, t('contents.detail.form.title.error.required')),
        content: z.string().optional(),
        link: z.union([
            z.literal(''),
            z.string().url(t('contents.detail.form.link.error.required')),
        ]),
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: pick(content, ['title', 'content', 'link']),
    });

    function handleChange(value: string) {
        setValue('content', value);
    }

    const onSubmit = handleSubmit((data) => {
        mutate({
            input: {
                id: content.id,
                ...data,
            },
        });
    });

    return (
        <LexicalComposerInit content={content?.content}>
            <Box as="form" noValidate onSubmit={onSubmit}>
                <Container pb="10" maxW="5xl">
                    <HStack h="60px" borderBottomWidth="1px">
                        <Button
                            size="sm"
                            leftIcon={<HeroIcon as={ArrowLeftIcon} />}
                            variant="link"
                            as={Link}
                            href={`/user/content`}
                        >
                            {t('commons.back')}
                        </Button>

                        <Spacer />
                        <SyncContent contentId={content?.id}>
                            <Button
                                colorScheme="orange"
                                size="sm"
                                leftIcon={
                                    <HeroIcon as={ArrowPathRoundedSquareIcon} />
                                }
                                type="button"
                            >
                                {t('commons.sync')}
                            </Button>
                        </SyncContent>

                        <Button
                            size="sm"
                            colorScheme="green"
                            type="submit"
                            isLoading={isLoading}
                        >
                            {t('commons.save')}
                        </Button>
                        <MenuAction size="sm">
                            <>
                                <CopyContent type="text">
                                    <MenuItem>
                                        {t('contents.copy_content')}
                                    </MenuItem>
                                </CopyContent>
                                <CopyContent type="html">
                                    <MenuItem>
                                        {t('contents.copy_html')}
                                    </MenuItem>
                                </CopyContent>
                                <DeleteContent contentId={content?.id}>
                                    <MenuItem>{t('commons.delete')}</MenuItem>
                                </DeleteContent>
                            </>
                        </MenuAction>
                    </HStack>
                    <VStack align="stretch" py="8" spacing="5">
                        <FormField
                            isRequired
                            label={t('contents.detail.form.title.label')}
                            error={errors?.title?.message}
                        >
                            <Input
                                {...register('title')}
                                placeholder={t(
                                    'contents.detail.form.title.placeholder'
                                )}
                            />
                        </FormField>
                        <FormField
                            label={t('contents.detail.form.link.label')}
                            error={errors?.link?.message}
                        >
                            <Input
                                {...register('link')}
                                placeholder={t(
                                    'contents.detail.form.link.placeholder'
                                )}
                            />
                        </FormField>

                        <FormField
                            label={t('contents.detail.form.content.label')}
                        >
                            <Box borderWidth="1px" rounded="md">
                                <Editor onChange={handleChange} />
                            </Box>
                        </FormField>
                        <HStack spacing="6">
                            <Spacer />
                            <Button
                                size="sm"
                                variant="link"
                                as={Link}
                                href="/user/content"
                            >
                                {t('commons.back')}
                            </Button>
                            <Button
                                size="sm"
                                colorScheme="green"
                                type="submit"
                                isLoading={isLoading}
                            >
                                {t('commons.save')}
                            </Button>
                        </HStack>
                    </VStack>
                </Container>
            </Box>
        </LexicalComposerInit>
    );
}
