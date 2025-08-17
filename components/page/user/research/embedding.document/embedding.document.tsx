import {
    Box,
    Button,
    Center,
    HStack,
    Text,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { Heading, Modal, WarningModal } from '@components/ui';

import { ImageInfoFragment } from '@generated/graphql/query';
import { formatUrlImage } from '@share/helps/format-url-image';
import {
    useEmbeddedDocument,
    useGetTotalTokenDoc,
} from '@share/hooks/chatbot.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { cloneElement, ReactElement, useEffect } from 'react';

interface Props {
    children: ReactElement;
    doc: ImageInfoFragment;
}
export function EmbeddingDocument({ children, doc }: Props) {
    const { t } = useTranslate();
    const { isLoading, mutate, isSuccess } = useEmbeddedDocument();

    return (
        <WarningModal
            isLoading={isLoading}
            isSuccess={isSuccess}
            title={t('research.embedded.title')}
            content={t('research.embedded.content')}
            type="warning"
            okProps={{
                okText: t('commons.sync'),
                async onOk() {
                    mutate({ documentId: doc.id });
                },
            }}
        >
            {children}
        </WarningModal>
    );
}

export function EmbeddingDocument1({ children, doc }: Props) {
    const user = useAuthStore((state) => state.user);
    const { onToggle, isOpen } = useDisclosure();
    const { t } = useTranslate();

    const { isLoading, mutate, data } = useGetTotalTokenDoc();
    const { isLoading: embedLoading, mutate: embedMutate } =
        useEmbeddedDocument();

    useEffect(() => {
        if (isOpen) {
            const url = formatUrlImage(doc.src);
            mutate({ url });
        }
    }, [isOpen]);

    function handleClose() {
        if (embedLoading) return;
        onToggle();
    }

    function handleEmbedding() {
        embedMutate(
            {
                documentId: doc.id,
            },
            {
                onSuccess() {
                    onToggle();
                },
            }
        );
    }

    function renderContent() {
        // if (isLoading) {
        //     return <Loading />;
        // }

        const totalPrice = data?.getTotalTokenDoc?.totalPrice;
        const balance = user?.workspace?.balance;

        const isDisabled = totalPrice > balance;

        return (
            <Center>
                <VStack spacing="5">
                    <Heading>Đồng bộ tài liệu</Heading>
                    <Text textAlign="center" color="gray.500">
                        Bạn có muốn đồng bộ không?
                    </Text>

                    <HStack>
                        <Button
                            isDisabled={embedLoading}
                            onClick={handleClose}
                            colorScheme="red"
                        >
                            T Huỷ
                        </Button>
                        <Button
                            isLoading={embedLoading}
                            onClick={handleEmbedding}
                            colorScheme="green"
                        >
                            Đồng bộ ngay
                        </Button>
                    </HStack>
                    {isDisabled ? (
                        <>
                            {
                                // <Text>
                                //     Số dư tài khoản không đủ để đồng bộ tài liệu. Vui
                                //     lòng nạp thêm vào tài khoản.
                                // </Text>
                            }
                        </>
                    ) : null}
                </VStack>
            </Center>
        );
    }

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}

            <Modal isOpen={isOpen} onClose={handleClose}>
                <Box py="10">{renderContent()}</Box>
            </Modal>
        </>
    );
}
