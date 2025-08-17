import { Button } from '@chakra-ui/react';
import { HeroIcon } from '@components/ui';
import { StopIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { cloneElement, ReactElement } from 'react';
import { useContextConversation } from './context.conversation';

interface Props {
    children?: ReactElement;
}

export function StopGenerating({ children }: Props) {
    const { t } = useTranslate();
    const { onCloseStream, isStreaming } = useContextConversation();

    if (!isStreaming) return <></>;

    if (!children) {
        return (
            <Button
                onClick={onCloseStream}
                size="sm"
                colorScheme="red"
                leftIcon={<HeroIcon as={StopIcon} />}
            >
                {t('commons.stop_generating')}
            </Button>
        );
    }

    return cloneElement(children, { onClick: onCloseStream });
}
