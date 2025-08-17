import { Avatar, Box, Center, Spinner, Text, VStack } from '@chakra-ui/react';
import { HeroIcon, Loading } from '@components/ui';
import { TypeFile } from '@generated/graphql/query';
import { ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { getBase64FromFile } from '@share/helps/format-image';
import { useMe } from '@share/hooks/auth.hooks';
import { useUpdateFile, useUploadImage } from '@share/hooks/image.hooks';
import { useProjectDefault } from '@share/hooks/project.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import dynamic from 'next/dynamic';
import { useState, type ChangeEvent } from 'react';

interface Props {
    isUpdate?: boolean;
    isEdit?: boolean;
    folderId?: string;
    callback?: () => void;
    defaultSource?: string;
    type?: TypeFile;
}

const EditorImage = dynamic(
    () => import('@components/ui/image/editor.image/editor.image'),
    { ssr: false }
);

export function UploadImage({
    callback,
    isEdit = false,
    isUpdate = false,
    defaultSource,
    folderId,
    type: typeFile,
}: Props) {
    const { t } = useTranslate();

    const [isErrorSize, setIsErrorSize] = useState<boolean>(false);
    const { data: userData } = useMe();
    const { isLoading, data } = useProjectDefault();

    const [source, setSource] = useState<string | null>(defaultSource);

    const mutationUpload = useUploadImage();
    const mutationUpdate = useUpdateFile();

    function handleUpload(file: File, type: 'upload' | 'update') {
        const formData = new FormData();
        formData.append('files', file);
        formData.append('projectId', data?.projectDefault?.id);

        formData.append('bucket', userData?.me?.workspace?.bucket);

        formData.append('type', type);

        if (folderId) {
            formData.append('folderId', folderId);
        }

        if (type === 'upload') {
            if (typeFile) {
                formData.append('typeFile', typeFile);
            }

            mutationUpload.mutate(formData, {
                onSuccess(data) {
                    if (source) {
                        setSource(null);
                    }
                    if (callback) {
                        callback();
                    }
                },
            });
            return;
        }

        if (type === 'update') {
            mutationUpdate.mutate(formData, {
                onSuccess() {
                    if (source) {
                        setSource(null);
                    }
                    if (callback) {
                        callback();
                    }
                },
            });
            return;
        }
    }

    async function handleChange(e: ChangeEvent<HTMLInputElement>) {
        setIsErrorSize(false);

        const files = e.target.files;
        const size = files[0].size / 1024 / 1024;

        if (typeFile === TypeFile.Document && size > 130) {
            setIsErrorSize(true);
            return;
        }

        if (size > 6) {
            setIsErrorSize(true);
            return;
        }

        if (isEdit) {
            const value = await getBase64FromFile(files[0]);
            setSource(value);
            return;
        }

        if (isUpdate) {
            handleUpload(files[0], 'update');
            return;
        }

        handleUpload(files[0], 'upload');
    }

    function handleCloseEdit() {
        setSource(null);
    }

    function handleUploadImageEdit(file: File) {
        // handleUpload(file, 'update')
        if (isUpdate) {
            handleUpload(file, 'update');
            return;
        }

        handleUpload(file, 'upload');
    }

    if (isLoading) {
        return <Loading />;
    }

    if (!data) {
        return <></>;
    }

    const accept =
        typeFile === TypeFile.Document
            ? '.pdf' // '.doc,.docx,.xml,application/msword,.pdf,.txt'
            : 'image/png, image/jpeg, image/gif';

    function renderUi() {
        if (typeFile === TypeFile.Document) {
            return (
                <Center minH="450px" pos="relative" bgColor="gray.50">
                    <input
                        style={{
                            position: 'absolute',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            top: '0',
                            width: '100%',
                            height: '100%',
                            display: 'inline-block',
                            zIndex: '100',
                            cursor: 'pointer',
                            opacity: 0,
                        }}
                        id="inputFile"
                        onChange={handleChange}
                        type="file"
                        accept={accept}
                    />

                    <VStack>
                        <Avatar icon={<HeroIcon as={ArrowUpTrayIcon} />} />
                        {t('upload.commons.title_upload')}
                        <Text color="gray.500" fontSize="sm">
                            ({accept})
                        </Text>
                        {isErrorSize ? (
                            <Text>{t('upload.commons.accept_upload')}</Text>
                        ) : null}
                        {mutationUpdate.isLoading ? <Spinner /> : null}
                    </VStack>
                </Center>
            );
        }
        return source ? (
            <EditorImage
                source={source}
                onClose={handleCloseEdit}
                upload={handleUploadImageEdit}
            />
        ) : (
            <Center minH="450px" pos="relative" bgColor="gray.50">
                <input
                    style={{
                        position: 'absolute',
                        left: '0',
                        right: '0',
                        bottom: '0',
                        top: '0',
                        width: '100%',
                        height: '100%',
                        display: 'inline-block',
                        zIndex: '100',
                        cursor: 'pointer',
                        opacity: 0,
                    }}
                    id="inputFile"
                    onChange={handleChange}
                    type="file"
                    accept={accept}
                />

                <VStack>
                    <Avatar icon={<HeroIcon as={ArrowUpTrayIcon} />} />
                    <Text fontSize="sm" fontWeight="medium" color="gray.400">
                        {t('upload.commons.title_upload')}
                    </Text>
                    <Text color="gray.500" fontSize="sm">
                        ({accept})
                    </Text>
                    {mutationUpdate.isLoading ? <Spinner /> : null}
                </VStack>
            </Center>
        );
    }

    const isUploading = mutationUpdate.isLoading || mutationUpload.isLoading;

    return (
        <Box
            rounded="md"
            borderWidth="1px"
            borderStyle="dashed"
            bgColor="white"
            minH="450px"
            pos="relative"
        >
            {isUploading ? (
                <Center
                    bgColor="gray.100"
                    opacity="0.8"
                    zIndex="100"
                    pos="absolute"
                    w="full"
                    h="full"
                    left="0"
                    top="0"
                >
                    <Loading />
                </Center>
            ) : null}

            {renderUi()}
        </Box>
    );
}
