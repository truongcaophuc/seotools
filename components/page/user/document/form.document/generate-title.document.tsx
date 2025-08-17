import { Button, Center, Text, useDisclosure, VStack } from '@chakra-ui/react';
import { Modal, Progress } from '@components/ui';
import { useStreamContent } from '@share/hooks/request-content.hooks';
import { cloneElement, ReactElement } from 'react';

interface Props {
    children: ReactElement;
    keyword: string;
}

export function GenerateTitleDocument({ children, keyword }: Props) {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { content, isStreaming, onStream, resetContent } = useStreamContent();

    function handleStream() {
        onStream({
            prompt: `Tạo 3 tiêu đề với từ khoá ${keyword}`,
            max_tokens: 1000,
        });
    }

    function handleOpen() {
        onOpen();
        handleStream();
    }

    function handleClose() {
        resetContent();
        onClose();
    }

    function renderContent() {
        return (
            <VStack align="stretch" spacing="4">
                <Text whiteSpace="pre-line">{content}</Text>
                <Center>
                    {isStreaming ? (
                        <Progress />
                    ) : (
                        <Button colorScheme="blue" onClick={handleStream}>
                            Làm lại
                        </Button>
                    )}
                </Center>
            </VStack>
        );
    }

    return (
        <>
            {cloneElement(children, { onClick: handleOpen })}

            <Modal
                isOpen={isOpen}
                title="Tiêu đề"
                size="2xl"
                onClose={handleClose}
            >
                {renderContent()}
            </Modal>
        </>
    );
}
