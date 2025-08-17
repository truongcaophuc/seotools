import { Button, HStack, Spacer, Text, VStack } from '@chakra-ui/react';
import { PackageType } from '@generated/graphql/query';
import { formatMoney, formatNumber } from '@share/helps/format-number';
import {
    getDateExpired,
    getWorkspacePackageType,
    packageTypes,
} from '@share/helps/workspace';
import { useTranslate } from '@share/hooks/translate.hooks';
import { usePremiumWorkspace } from '@share/hooks/workspace.hooks';
import { useAuthStore } from '@share/store/auth.store';
import pick from 'lodash/pick';
import { Heading } from '../heading';
import { UpgradeLink } from '../upgrade-link';

export function BalanceUserMenu() {
    const { t } = useTranslate();
    const user = useAuthStore((state) => state.user);
    const workspace = user?.workspace;

    const isPremiumWorkspace = usePremiumWorkspace();

    if (workspace?.workspacePackage) {
        const { isExpired, date } = getDateExpired(workspace?.workspacePackage);

        const workspacePackageType = getWorkspacePackageType(
            workspace?.workspacePackage
        );

        const labelStatusDate = isExpired
            ? t('dashboard.heading.expired')
            : date;

        return (
            <VStack align="stretch" px="4" py="1" w="full">
                <HStack>
                    <Heading color={`${workspacePackageType?.color}.500`}>
                        {workspacePackageType?.label}
                    </Heading>
                    <Spacer />
                    <UpgradeLink>
                        <Button colorScheme="orange" size="xs" rounded="full">
                            {t('commons.upgrade')}
                        </Button>
                    </UpgradeLink>
                </HStack>
                <VStack align="stretch">
                    {isPremiumWorkspace ? null : (
                        <Text as="span" color="gray.600" fontSize="xs">
                            {`${t(
                                'dashboard.heading.word_count'
                            )}: ${formatNumber(
                                workspace?.workspacePackage?.numberWord
                            )}`}
                        </Text>
                    )}
                    <Text as="span" color="gray.600" fontSize="xs">
                        {`${t(
                            'dashboard.heading.expiration_date'
                        )}: ${labelStatusDate}`}
                    </Text>
                </VStack>
            </VStack>
        );
    }

    const { isTrial, isOwner, timeTrial } = pick(workspace, [
        'isTrial',
        'isOwner',
        'timeTrial',
    ]);

    // const label = isTrial ? 'Dùng thử' : 'Trả phí';

    const content = isTrial
        ? `Thời gian ${timeTrial} ngày`
        : `Số dư ${formatMoney(workspace?.balance)}`;

    // const color = isTrial ? 'orange.600' : 'blue.600';

    // function renderAction() {
    //     if (isTrial) {
    //         return (
    //             <Button colorScheme="orange" size="xs" rounded="full">
    //                 Nâng cấp
    //             </Button>
    //         );
    //     }
    //
    //     return (
    //         <Button colorScheme="blue" size="xs" rounded="full">
    //             Nạp thêm
    //         </Button>
    //     );
    // }

    const { color, label } = packageTypes[PackageType.Trial];

    const timeLabel =
        workspace?.workspacePackage?.numberWord > 0
            ? workspace?.workspacePackage?.numberWord
            : 0;

    const timeTrialLabel = `Thời gian ${
        timeTrial < 0 ? 'hết hạn' : `${timeTrial} ngày`
    }`;

    return (
        <VStack align="stretch" px="4" py="1" w="full">
            <HStack>
                <Heading color={`${color}.500`}>{label}</Heading>
                <Spacer />
                {isOwner ? (
                    <UpgradeLink>
                        <Button colorScheme={color} size="xs" rounded="full">
                            {t('commons.upgrade')}
                        </Button>
                    </UpgradeLink>
                ) : null}
            </HStack>

            <VStack align="stretch" spacing="1">
                <Text as="span" color="gray.600" fontSize="xs">
                    {`Số dư ${formatMoney(workspace?.balance)}`}
                </Text>
                <Text as="span" color="gray.600" fontSize="xs">
                    {timeTrialLabel}
                </Text>
            </VStack>
        </VStack>
    );

    //TODO: remove comment code

    // return (
    //     <HStack px="4" py="1" w="full">
    //         <Box>
    //             <Text fontWeight="semibold" color={color} fontSize="sm">
    //                 {label}
    //             </Text>
    //             <Text as="span" color="gray.600" fontSize="xs">
    //                 {content}
    //             </Text>
    //         </Box>
    //         <Spacer />
    //
    //         {isOwner ? renderAction() : null}
    //     </HStack>
    // );
}
