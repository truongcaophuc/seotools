import {
    useDisclosure,
    VStack,
    Text,
    Button,
    ButtonProps,
    HStack,
    Avatar,
} from '@chakra-ui/react';
import {
    CheckIcon,
    ExclamationCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement, useEffect } from 'react';
import { Heading } from '../heading';
import { HeroIcon } from '../icon';
import { Modal } from './modal';

type TWarningModal = 'success' | 'error' | 'warning';

type TModalButton = Partial<ButtonProps>;

interface Props {
    children: ReactElement;
    type: TWarningModal;
    title?: string;
    content: string;
    okProps?: {
        onOk?: () => Promise<void>;
        okText?: string;
        btnProps?: TModalButton;
    };
    cancelProps?: {
        cancelText?: string;
        btnProps?: TModalButton;
    };
    callback?: () => void;
    isLoading?: boolean;
    isSuccess?: boolean;
}

const warningSettings: {
    [key in TWarningModal]: {
        color: string;
        colorSchemeBtn: string;
        icon: any;
    };
} = {
    success: {
        color: 'green.600',
        colorSchemeBtn: 'green',
        icon: CheckIcon,
    },
    warning: {
        color: 'orange.600',
        colorSchemeBtn: 'orange',
        icon: ExclamationCircleIcon,
    },
    error: {
        color: 'red.600',
        colorSchemeBtn: 'red',
        icon: ExclamationTriangleIcon,
    },
};

function getIcon(type: TWarningModal) {
    return warningSettings[type].icon;
}

function getColor(type: TWarningModal) {
    return warningSettings[type].color;
}

function getColorSchemeBtn(type: TWarningModal) {
    return warningSettings[type].colorSchemeBtn;
}

export function WarningModal({
    children,
    type,
    title,
    content,
    cancelProps,
    okProps,
    callback,
    isSuccess,
    isLoading,
}: Props) {
    const { t } = useTranslate();
    const { isOpen, onToggle, onClose } = useDisclosure();
    const icon = getIcon(type);
    const color = getColor(type);
    const colorSchemeBtn = getColorSchemeBtn(type);

    async function handleOk() {
        if (okProps.onOk) {
            await okProps.onOk();
            if (callback) callback();
        }
    }

    useEffect(() => {
        if (isSuccess) {
            onClose();
        }
    }, [isSuccess]);

    return (
        <>
            {cloneElement(children, { onClick: onToggle })}
            <Modal isOpen={isOpen} onClose={onToggle}>
                <VStack py="8" spacing="4" textAlign="center">
                    <Avatar
                        size="lg"
                        bgColor="gray.100"
                        icon={<HeroIcon boxSize="8" as={icon} color={color} />}
                    />
                    {title ? <Heading>{title}</Heading> : null}

                    <Text color="gray.600">{content}</Text>

                    <HStack>
                        <Button
                            disabled={isLoading}
                            type="button"
                            variant="ghost"
                            {...cancelProps?.btnProps}
                            onClick={onClose}
                        >
                            {cancelProps?.cancelText || t('commons.cancel')}
                        </Button>

                        <Button
                            isLoading={isLoading}
                            type="button"
                            colorScheme={colorSchemeBtn}
                            {...okProps?.btnProps}
                            onClick={handleOk}
                        >
                            {okProps?.okText || t('commons.ok')}
                        </Button>
                    </HStack>
                </VStack>
            </Modal>
        </>
    );
}
