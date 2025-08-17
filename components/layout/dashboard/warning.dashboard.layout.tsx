import {
    Box,
    Button,
    Center,
    CloseButton,
    HStack,
    Text,
} from '@chakra-ui/react';
import { UpgradeLink } from '@components/ui';
import { useMe } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useExpiredWorkspace } from '@share/hooks/workspace.hooks';
import { useDashboardStore } from './dashboard.store';

export function WarningDashboardLayout() {
    const { t } = useTranslate();
    const { data } = useMe();
    const isShowWarning = useDashboardStore((state) => state.isShowWarning);
    const setIsShowWarning = useDashboardStore(
        (state) => state.setIsShowWarning
    );

    const {
        isExpiredPackage,
        isNotWorkspacePackage,
        isExpiredWordUsed,
        numberWord,
        isExpiredBalance,
        isExpiredTrialDate,
    } = useExpiredWorkspace(data?.me?.workspace);

    function handleClose() {
        setIsShowWarning(false);
    }

    if (!isShowWarning) {
        return null;
    }

    const isOwner = data?.me?.workspace?.isOwner;

    const btnUpgrade = isOwner ? (
        <UpgradeLink>
            <Button size="sm" bgColor="red.200">
                {t('commons.upgrade')}
            </Button>
        </UpgradeLink>
    ) : null;

    function getContentWaringHasWorkspacePackage({
        isExpiredPackage,
        isExpiredWordUsed,
        numberWord,
    }): string {
        if (isExpiredPackage) {
            return t('dashboard.warning.expired');
        }

        if (!isExpiredWordUsed && numberWord === 0) {
            return t('dashboard.warning.number_word');
        }

        return '';
    }

    function renderContent() {
        if (isNotWorkspacePackage) {
            const content = isExpiredTrialDate
                ? t('dashboard.warning.expired')
                : isExpiredBalance
                ? t('dashboard.warning.balance')
                : '';

            return (
                <HStack>
                    <Text fontWeight="semibold" fontSize="sm" color="white">
                        {content}
                    </Text>
                    {btnUpgrade}
                </HStack>
            );
        }

        const content = getContentWaringHasWorkspacePackage({
            isExpiredPackage,
            isExpiredWordUsed,
            numberWord,
        });

        return (
            <HStack>
                <Text fontWeight="semibold" fontSize="sm" color="white">
                    {content}
                </Text>
                {btnUpgrade}
            </HStack>
        );
    }

    return (
        <Center
            bgColor="red.500"
            borderBottomWidth="1px"
            px="6"
            py="2"
            pos="relative"
        >
            {renderContent()}
            <Box pos="absolute" right="4">
                <CloseButton color="red.100" onClick={handleClose} />
            </Box>
        </Center>
    );
}
