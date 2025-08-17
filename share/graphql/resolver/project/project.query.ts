import { Prisma } from '@prisma/client';
import {
    arg,
    inputObjectType,
    list,
    nonNull,
    nullable,
    objectType,
    queryField,
    stringArg,
} from 'nexus';

const ProjectsInputType = inputObjectType({
    name: 'ProjectsInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.string('search');
    },
});

const ProjectsResponseType = objectType({
    name: 'ProjectsResponseType',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Project'),
        });
        t.field({
            type: 'PaginationType',
            name: 'pagination',
        });
    },
});

export const ProjectsQuery = queryField('projects', {
    type: ProjectsResponseType,
    args: { input: arg({ type: ProjectsInputType }) },
    async resolve(
        _,
        { input: { page, perPage, search } },
        { prisma, team, workspace }
    ) {
        if (!team) {
            return {
                data: [],
                pagination: {
                    total: 0,
                    page,
                    perPage,
                },
            };
        }

        const where: Prisma.ProjectWhereInput = {
            workspaceId: workspace.id,
        };

        if (team) {
            where.teamId = team.id;
        }

        if (search) {
            where.name = {
                contains: search,
            };
        }

        const data = await prisma.project.findMany({
            where,
        });
        const total = await prisma.project.count({
            where,
        });

        return {
            data,
            pagination: {
                total,
                page,
                perPage,
            },
        };
    },
});

export const ProjectQuery = queryField('project', {
    type: nullable('Project'),
    args: { id: nonNull(stringArg()) },
    resolve(_, { id }, { prisma }) {
        return prisma.project.findFirst({
            where: {
                id,
            },
        });
    },
});

export const ProjectDefaultQuery = queryField('projectDefault', {
    type: nullable('Project'),
    resolve(_, __, { project }) {
        return project;
    },
});
