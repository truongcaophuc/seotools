import { useToast as useToastUi } from '@chakra-ui/react';

export function useToast() {
    const toast = useToastUi();

    return {
        toastSuccess: (title) =>
            toast({
                title,
                status: 'success',
            }),
        toastError: (title) =>
            toast({
                title,
                status: 'error',
            }),
    };
}
