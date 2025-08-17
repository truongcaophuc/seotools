import {
    Button,
    ButtonProps,
    IconButton,
    PlacementWithLogical,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Text,
} from '@chakra-ui/react';
import { HeroIcon, Social } from '@components/ui';
import { LifebuoyIcon } from '@heroicons/react/24/outline';
import { useTranslate } from '@share/hooks/translate.hooks';
import { ReactElement } from 'react';

interface Props extends ButtonProps {
    children?: ReactElement;
    isSmall?: boolean;
    placement?: PlacementWithLogical;
}

export function SupportDashboardLayout({
    isSmall,
    placement,
    children,
    ...rest
}: Props) {
    const icon = <HeroIcon as={LifebuoyIcon} />;

    const { t } = useTranslate();

    return (
        <Popover placement={placement} size="sm">
            <PopoverTrigger>
                {children ? (
                    children
                ) : isSmall ? (
                    <IconButton
                        colorScheme="blue"
                        aria-label="Support"
                        icon={icon}
                        {...rest}
                    />
                ) : (
                    <Button
                        colorScheme="blue"
                        aria-label="Support"
                        leftIcon={<HeroIcon boxSize="6" as={LifebuoyIcon} />}
                        {...rest}
                    >
                        {t('commons.support.btn')}
                    </Button>
                )}
            </PopoverTrigger>
            <PopoverContent minW="0" w="240px">
                <PopoverArrow />
                <PopoverBody
                    px="3"
                    py="4"
                    textAlign="center"
                    fontSize="xs"
                    color="gray.500"
                >
                    <Text mb="4">{t('commons.support.content')}</Text>
                    <Social />
                </PopoverBody>
            </PopoverContent>
        </Popover>
    );
}
