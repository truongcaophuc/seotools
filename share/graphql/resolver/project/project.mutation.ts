import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
    stringArg,
} from 'nexus';

const ProjectDataInputType = inputObjectType({
    name: 'ProjectDataInputType',
    definition(t) {
        t.nonNull.string('name');
        t.nullable.string('url');
        t.nullable.string('description');
    },
});

export const AddProject = mutationField('addProject', {
    type: nullable('Project'),
    args: { input: arg({ type: ProjectDataInputType }) },
    resolve(_, { input }, { prisma, team, workspace }) {
        return prisma.project.create({
            data: {
                ...input,
                teamId: team?.id,
                workspaceId: workspace?.id,
            },
        });
    },
});

const ChangeDefaultProjectInputType = inputObjectType({
    name: 'ChangeDefaultProjectInputType',
    definition(t) {
        t.id('id');
        t.boolean('default');
    },
});

export const ChangeDefaultProject = mutationField('changeDefaultProject', {
    type: nullable('Project'),
    args: { input: arg({ type: ChangeDefaultProjectInputType }) },
    async resolve(_, { input }, { prisma, team }) {
        if (input.default) {
            await prisma.project.updateMany({
                where: {
                    teamId: team?.id,
                    NOT: {
                        id: input.id,
                    },
                },
                data: {
                    default: false,
                },
            });
        }

        const project = await prisma.project.update({
            where: {
                id: input.id,
            },
            data: {
                default: input.default,
            },
        });

        return project;
    },
});

const UpdateProjectInputType = inputObjectType({
    name: 'UpdateProjectInputType',
    definition(t) {
        t.id('id');
        t.field({
            name: 'data',
            type: ProjectDataInputType,
        });
    },
});

export const UpdateProject = mutationField('updateProject', {
    type: nullable('Project'),
    args: { input: arg({ type: UpdateProjectInputType }) },
    resolve(_, { input: { data, id } }, { prisma }) {
        return prisma.project.update({
            where: { id },
            data,
        });
    },
});

export const DeleteProject = mutationField('deleteProject', {
    type: 'Boolean',
    args: { id: nonNull(stringArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.project.delete({
            where: { id },
        });
        return true;
    },
});
