import { useDisclosure, Button, VStack, Text } from '@chakra-ui/react';
import { Modal } from '@components/ui';

export function ConfirmPaymentHistory() {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onToggle}
                title="Xác nhận thanh toán"
            >
                <VStack>
                    <Button colorScheme="green">Xác nhận</Button>
                </VStack>
            </Modal>
        </>
    );
}
