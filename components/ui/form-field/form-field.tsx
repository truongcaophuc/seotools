import {
    FormControl,
    FormControlProps,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    HStack,
    Spacer,
    Box,
} from '@chakra-ui/react';
import { ReactNode } from 'react';

interface Props extends FormControlProps {
    label?: string;
    extra?: ReactNode;
    error?: string;
    helpText?: string | ReactNode;
    layout?: 'vertical' | 'horizontal';
    widthLabel?: string;
}

export function FormField({
    label,
    extra,
    helpText,
    children,
    error,
    layout = 'vertical',
    widthLabel,
    ...props
}: Props) {
    const renderLabel = () => {
        if (!label) return null;

        if (extra) {
            return (
                <HStack mb="3" align="flex-end">
                    <FormLabel
                        fontSize="sm"
                        mb="0"
                        fontWeight="medium"
                        color="gray.600"
                    >
                        {label}
                    </FormLabel>
                    <Spacer />
                    {extra}
                </HStack>
            );
        }

        return (
            <FormLabel
                w={widthLabel}
                fontWeight="medium"
                color="gray.600"
                fontSize="sm"
            >
                {label}
            </FormLabel>
        );
    };

    if (layout === 'horizontal') {
        return (
            <FormControl as={HStack} isInvalid={!!error} {...props}>
                {renderLabel()}
                <Box flex="1">
                    {children}
                    {helpText ? (
                        <FormHelperText fontSize="xs" color="gray.600">
                            {helpText}
                        </FormHelperText>
                    ) : null}
                    {error ? (
                        <FormErrorMessage>{error}</FormErrorMessage>
                    ) : null}
                </Box>
            </FormControl>
        );
    }

    return (
        <FormControl isInvalid={!!error} {...props}>
            {renderLabel()}
            {children}
            {helpText ? (
                <FormHelperText fontSize="xs" color="gray.600">
                    {helpText}
                </FormHelperText>
            ) : null}
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
}
