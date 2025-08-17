import { Prisma } from '@prisma/client';
import { middleware } from '@share/graphql/middleware';
import {
    arg,
    idArg,
    inputObjectType,
    list,
    nonNull,
    nullable,
    objectType,
    queryField,
} from 'nexus';

const ContentsInputType = inputObjectType({
    name: 'ContentsInputType',
    definition(t) {
        t.nullable.string('search');
        t.nullable.int('page');
        t.nullable.int('perPage');
    },
});

const ContentsResponseType = objectType({
    name: 'ContentsResponseType',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Content'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

export const ContentsQuery = queryField('contents', {
    type: ContentsResponseType,
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: ContentsInputType }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, search } },
        { prisma, project, workspace }
    ) {
        let where: Prisma.ContentWhereInput = {
            projectId: project?.id,
            workspaceId: workspace?.id,
        };

        if (search) {
            where.title = {
                contains: search,
            };
        }

        const data = await prisma.content.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            where,
        });

        const total = await prisma.content.count({ where });

        return {
            data,
            pagination: {
                page,
                perPage,
                total,
            },
        };
    },
});

export const ContentQuery = queryField('content', {
    type: nullable('Content'),
    authorize: (_, __, ctx) => middleware.auth(ctx),
    args: { id: nonNull(idArg()) },
    resolve(_, { id }, { prisma }) {
        return prisma.content.findFirst({
            where: { id },
        });
    },
});
