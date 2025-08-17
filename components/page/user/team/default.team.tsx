import { Switch } from '@chakra-ui/react';
import { TeamInfoFragment } from '@generated/graphql/query';
import { useMe } from '@share/hooks/auth.hooks';
import { useChangeDefaultTeam } from '@share/hooks/team.hooks';

interface Props {
    team: TeamInfoFragment;
}

export function DefaultTeam({ team }: Props) {
    const { data } = useMe();
    const { mutate, isLoading } = useChangeDefaultTeam();

    const handleChange = () => {
        mutate({
            teamId: team.id,
        });
    };

    const isChecked = data?.me?.defaultTeamId === team.id;

    return (
        <Switch
            isDisabled={isLoading}
            isChecked={isChecked}
            onChange={handleChange}
        />
    );
}
