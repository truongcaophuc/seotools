import { list, nonNull, nullable, queryField, stringArg } from 'nexus';

export const TeamsQuery = queryField('teams', {
    type: list('Team'),
    resolve(_, __, { prisma, user }) {
        return prisma.team.findMany({
            where: {
                memberIds: {
                    hasEvery: [user.id],
                },
            },
        });
    },
});

export const TeamQuery = queryField('team', {
    type: nullable('Team'),
    args: { id: nonNull(stringArg()) },
    resolve(_, { id }, { prisma }) {
        return prisma.team.findFirst({
            where: {
                id,
            },
        });
    },
});

export const TeamDefaultQuery = queryField('teamDefault', {
    type: nullable('Team'),
    resolve(_, __, { team }) {
        return team;
    },
});
