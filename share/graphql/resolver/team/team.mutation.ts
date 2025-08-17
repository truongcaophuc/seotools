import { middleware } from '@share/graphql/middleware';
import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
    stringArg,
} from 'nexus';

const DataTeamInputType = inputObjectType({
    name: 'DataTeamInputType',
    definition(t) {
        t.string('name');
    },
});

export const AddTeam = mutationField('addTeam', {
    type: nullable('Team'),
    authorize: (_, __, context) => middleware.isOwner(context),
    args: {
        input: arg({
            type: DataTeamInputType,
        }),
    },
    async resolve(_, { input: { name } }, { prisma, user }) {
        const team = await prisma.team.create({
            data: {
                name,
                ownerId: user.id,
                memberIds: [user.id],
                workspaceId: user?.workspaceId,
            },
        });

        await prisma.project.create({
            data: {
                teamId: team.id,
                name: 'Dự án mặc định',
                default: true,
                workspaceId: user?.workspaceId,
            },
        });

        return team;
    },
});

const UpdateTeamInputType = inputObjectType({
    name: 'UpdateTeamInputType',
    definition(t) {
        t.field({
            name: 'data',
            type: DataTeamInputType,
        });
        t.id('id');
    },
});

export const UpdateTeam = mutationField('updateTeam', {
    type: nullable('Team'),
    args: { input: arg({ type: UpdateTeamInputType }) },
    resolve(_, { input: { id, data } }, { prisma }) {
        return prisma.team.update({
            where: { id },
            data,
        });
    },
});

export const ChangeDefaultTeam = mutationField('changeDefaultTeam', {
    type: nullable('User'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { teamId: idArg() },
    resolve(_, { teamId }, { prisma, user }) {
        return prisma.user.update({
            where: { id: user.id },
            data: {
                defaultTeamId: teamId,
                defaultProjectId: null,
            },
        });
    },
});

export const DeleteTeam = mutationField('deleteTeam', {
    type: 'Boolean',
    args: { teamId: nonNull(idArg()) },
    async resolve(_, { teamId }, { prisma }) {
        await prisma.team.delete({
            where: {
                id: teamId,
            },
        });
        return true;
    },
});
