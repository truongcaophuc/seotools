import {
    Box,
    Button,
    Checkbox,
    HStack,
    MenuItem,
    Skeleton,
    Spacer,
    StackDivider,
    Text,
    VStack,
} from '@chakra-ui/react';

import { Heading, HeroIcon, MenuAction } from '@components/ui';
import { PlusIcon } from '@heroicons/react/24/outline';
import { formatDate } from '@share/helps/format-date';
import { useTeams } from '@share/hooks/team.hooks';
import { useTranslate } from '@share/hooks/translate.hooks';
import Link from 'next/link';
import { AddTeam } from '../../team/add.team';

export function TeamWorkspace() {
    const { t } = useTranslate();
    const { isLoading, data } = useTeams();

    const teams = data?.teams || [];

    return (
        <Skeleton isLoaded={!isLoading}>
            <VStack align="stretch" spacing="5">
                <HStack>
                    <Box>
                        <Heading mb="0" lineHeight="1">
                            Team
                        </Heading>
                        <Text as="small" fontWeight="medium" color="gray.500">
                            {teams.length} teams
                        </Text>
                    </Box>

                    <Spacer />

                    <AddTeam>
                        <Button leftIcon={<HeroIcon as={PlusIcon} />}>
                            {t('commons.add')}
                        </Button>
                    </AddTeam>
                </HStack>
                <VStack align="stretch" divider={<StackDivider />}>
                    {teams.map((item) => (
                        <HStack key={item.id}>
                            <Box>
                                <Text
                                    as={Link}
                                    color="gray.600"
                                    fontWeight="semibold"
                                    fontSize="sm"
                                    href={`/user/team/${item.id}`}
                                >
                                    {item.name}
                                </Text>
                                <br />
                                <Text as="span" color="gray.400" fontSize="sm">
                                    {t('commons.created_at')}{' '}
                                    {formatDate(item.createdAt)}
                                </Text>
                            </Box>
                            <Spacer />

                            <Checkbox
                                isChecked={item.default}
                                colorScheme="green"
                            />
                            <MenuAction>
                                <>
                                    <MenuItem
                                        as={Link}
                                        href={`/user/team/${item.id}`}
                                    >
                                        {t('commons.detail')}
                                    </MenuItem>
                                </>
                            </MenuAction>
                        </HStack>
                    ))}
                </VStack>
            </VStack>
        </Skeleton>
    );
}
