import { Avatar, Badge, Box, HStack, Text } from '@chakra-ui/react';
import { PackageType } from '@generated/graphql/query';
import { ChevronUpDownIcon } from '@heroicons/react/24/outline';
import { getWorkspacePackageType, packageTypes } from '@share/helps/workspace';
import { useMobile } from '@share/hooks/size.hooks';
import { useExpiredWorkspace } from '@share/hooks/workspace.hooks';
import { useAuthStore } from '@share/store/auth.store';
import { HeroIcon } from '../icon';

export function InfoUserMenu() {
    const user = useAuthStore((state) => state.user);
    const isMobile = useMobile();

    const { isNotWorkspacePackage } = useExpiredWorkspace(user?.workspace);

    function renderLabelPackageWorkspace() {
        if (isNotWorkspacePackage) {
            const { color, label } = packageTypes[PackageType.Trial];
            return <Badge colorScheme={color}>{label}</Badge>;
        }

        const workspacePackageType = getWorkspacePackageType(
            user?.workspace?.workspacePackage
        );

        if (workspacePackageType) {
            return (
                <Badge colorScheme={workspacePackageType?.color}>
                    {workspacePackageType?.label}
                </Badge>
            );
        }
        return null;
    }

    return (
        <HStack>
            <Avatar name={user?.fullname} size="sm" />
            {isMobile ? null : (
                <Box textAlign="left">
                    <HStack spacing="1">
                        <Text
                            maxW="120px"
                            noOfLines={1}
                            fontSize="xs"
                            fontWeight="semibold"
                        >
                            {user?.fullname}
                        </Text>
                        {renderLabelPackageWorkspace()}
                    </HStack>
                    <Text color="gray.500" fontSize="xs">
                        {user?.email}
                    </Text>
                </Box>
            )}
            <HeroIcon boxSize="4" as={ChevronUpDownIcon} />
        </HStack>
    );
}
