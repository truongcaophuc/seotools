import {
    Badge,
    Box,
    Button,
    HStack,
    ListItem,
    Skeleton,
    Spacer,
    StackDivider,
    Text,
    UnorderedList,
    VStack,
} from '@chakra-ui/react';
import { Card, Heading, UpgradeLink } from '@components/ui';
import { PackageType } from '@generated/graphql/query';
import { formatDate } from '@share/helps/format-date';
import { formatMoney, formatNumber } from '@share/helps/format-number';
import { getWorkspacePackageType } from '@share/helps/workspace';
import { useMe } from '@share/hooks/auth.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import { useExpiredWorkspace } from '@share/hooks/workspace.hooks';
import moment from 'moment';
import Link from 'next/link';
import { BuyWordWorkspace } from '../buy-word.workspace';

export function BalanceWorkspace() {
    const { t } = useTranslate();
    const { data, isLoading } = useMe();
    const workspace = data?.me?.workspace;
    const balance = workspace?.balance || 0;
    const isOwner = workspace?.isOwner;

    const { isNotWorkspacePackage, numberWord } =
        useExpiredWorkspace(workspace);

    if (isNotWorkspacePackage) {
        return (
            <Skeleton isLoaded={!isLoading}>
                <Card>
                    <HStack>
                        <Box>
                            <HStack mb="4">
                                <Heading>
                                    {t('workspace.balance.remaining_balance')}
                                </Heading>
                                <Badge colorScheme={'orange'}>Trial</Badge>
                            </HStack>
                            <HStack align="baseline">
                                <Text
                                    lineHeight="1"
                                    as="span"
                                    color={
                                        balance > 0 ? 'green.600' : 'gray.300'
                                    }
                                    fontWeight="semibold"
                                    fontSize="5xl"
                                >
                                    {formatMoney(balance, '')}
                                </Text>
                                <Text
                                    color="gray.500"
                                    fontWeight="medium"
                                    as="small"
                                    transform="translateY(-2px)"
                                >
                                    VND
                                </Text>
                            </HStack>
                            {isOwner ? (
                                <Text
                                    as={Link}
                                    href="/user/payment-history"
                                    fontSize="xs"
                                    color="gray.400"
                                    _hover={{ color: 'yellow.500' }}
                                >
                                    ({t('workspace.balance.payment_history')})
                                </Text>
                            ) : null}
                        </Box>
                        <Spacer />
                        {isOwner ? (
                            <UpgradeLink>
                                <Button colorScheme="orange">
                                    {t('commons.upgrade')}
                                </Button>
                            </UpgradeLink>
                        ) : null}
                        {/* {isOwner ? (
                            <PaymentWorkspace isUpgrade={isTrial}>
                                {isTrial ? (
                                    <Button colorScheme="orange">
                                        Nâng cấp
                                    </Button>
                                ) : (
                                    <Button colorScheme="green">
                                        Nạp tiền
                                    </Button>
                                )}
                            </PaymentWorkspace>
                        ) : null} */}
                    </HStack>
                </Card>
            </Skeleton>
        );
    }

    const { color, label } = getWorkspacePackageType(
        workspace?.workspacePackage
    );

    // if (isTrial) {
    //     return (
    //         <VStack align="stretch" spacing="5">
    //             <Heading>Workspace</Heading>
    //             <Card>
    //                 <HStack>
    //                     <Heading>{label}</Heading>
    //                     <Spacer />
    //                     <UpgradeLink>
    //                         <Button
    //                             size="sm"
    //                             rounded="full"
    //                             colorScheme={color}
    //                         >
    //                             Nâng cấp
    //                         </Button>
    //                     </UpgradeLink>
    //                 </HStack>
    //             </Card>
    //         </VStack>
    //     );
    // }

    const timeStart = moment(workspace?.workspacePackage?.createdAt).valueOf();
    const timeUsed =
        (workspace?.workspacePackage?.time +
            workspace?.workspacePackage?.freeTime) *
            (1000 * 60 * 60 * 24) +
        timeStart;

    const timeStartWord = moment(
        workspace?.workspacePackage?.startDateWord
    ).valueOf();
    const timeEndWord = timeStartWord + 30 * 1000 * 60 * 60 * 24;

    return (
        <VStack align="stretch" spacing="5">
            <Heading>Workspace</Heading>
            <Card>
                <VStack spacing="5" divider={<StackDivider />} align="stretch">
                    <VStack align="stretch">
                        <HStack>
                            <Heading>
                                {t('workspace.balance.package')}{' '}
                                {
                                    workspace?.workspacePackage?.packageItem
                                        ?.packageParent?.name
                                }{' '}
                                {
                                    workspace?.workspacePackage?.packageItem
                                        ?.packagePeriod?.name
                                }
                            </Heading>
                            <Spacer />
                            <UpgradeLink>
                                <Button
                                    size="sm"
                                    rounded="full"
                                    colorScheme={color}
                                >
                                    {t('commons.upgrade')}
                                </Button>
                            </UpgradeLink>
                        </HStack>

                        <UnorderedList
                            spacing="1"
                            fontSize="sm"
                            color="gray.500"
                            stylePosition="inside"
                        >
                            <ListItem>
                                {`${t(
                                    'workspace.balance.activation_date'
                                )}: ${formatDate(
                                    workspace?.workspacePackage?.createdAt
                                )}`}
                            </ListItem>
                            <ListItem>
                                {`${t(
                                    'workspace.balance.expired_date'
                                )}: ${moment(timeUsed).format('DD/MM/YYYY')}`}
                            </ListItem>
                        </UnorderedList>
                    </VStack>

                    <VStack align="stretch">
                        <HStack>
                            {data?.me?.workspace?.workspacePackage?.packageItem
                                ?.packageParent?.type ===
                            PackageType.Premium ? (
                                <Heading>
                                    {t('workspace.balance.number_word.label')}:{' '}
                                    {t('workspace.balance.number_word.value')}
                                </Heading>
                            ) : (
                                <Heading>
                                    {`${t(
                                        'workspace.balance.number_word.label'
                                    )}: ${formatNumber(numberWord)} `}
                                </Heading>
                            )}
                            <Spacer />
                            <BuyWordWorkspace>
                                <Button
                                    size="sm"
                                    rounded="full"
                                    colorScheme="blue"
                                >
                                    {t('workspace.balance.buy_more')}
                                </Button>
                            </BuyWordWorkspace>
                        </HStack>
                        <UnorderedList
                            spacing="1"
                            fontSize="sm"
                            color="gray.500"
                            stylePosition="inside"
                        >
                            <ListItem>
                                {`${t(
                                    'workspace.balance.start_date'
                                )}: ${formatDate(
                                    workspace?.workspacePackage?.startDateWord
                                )}`}
                            </ListItem>
                            <ListItem>
                                {`${t('workspace.balance.end_date')}: ${moment(
                                    timeEndWord
                                ).format('DD/MM/YYYY')}`}
                            </ListItem>
                        </UnorderedList>
                    </VStack>
                </VStack>
            </Card>
        </VStack>
    );
}
