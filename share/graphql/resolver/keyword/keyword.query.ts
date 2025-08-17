import { Prisma } from '@prisma/client';
import {
    arg,
    inputObjectType,
    list,
    nullable,
    objectType,
    queryField,
    stringArg,
} from 'nexus';

const KeywordsResponse = objectType({
    name: 'KeywordsResponse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Keyword'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const KeywordsInputType = inputObjectType({
    name: 'KeywordsInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.string('search');
    },
});

export const KeywordsQuery = queryField('keywords', {
    type: KeywordsResponse,
    args: {
        input: arg({
            type: KeywordsInputType,
        }),
    },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, search } },
        { prisma, project }
    ) {
        let where: Prisma.KeywordWhereInput = {
            isDelete: false,
            projectId: project?.id,
            isMain: true,
        };

        if (search) {
            where.value = {
                contains: search,
            };
        }

        const data = await prisma.keyword.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.keyword.count({
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

const SubKeywordsInputType = inputObjectType({
    name: 'SubKeywordsInputType',
    definition(t) {
        t.nonNull.id('parentId');
        t.field({
            type: KeywordsInputType,
            name: 'query',
        });
    },
});

export const SubKeywordsQuery = queryField('subKeywords', {
    type: KeywordsResponse,
    args: {
        input: arg({
            type: SubKeywordsInputType,
        }),
    },
    async resolve(
        _,
        {
            input: {
                parentId,
                query: { page, perPage, search },
            },
        },
        { prisma, project }
    ) {
        let where: Prisma.KeywordWhereInput = {
            projectId: project.id,
            parentId,
        };

        if (search) {
            where.value = {
                contains: search,
            };
        }

        const data = await prisma.keyword.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.keyword.count({
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

export const KeywordQuery = queryField('keyword', {
    type: nullable('Keyword'),
    args: { id: stringArg() },
    resolve(_, { id }, { prisma }) {
        return prisma.keyword.findFirst({
            where: { id },
        });
    },
});
