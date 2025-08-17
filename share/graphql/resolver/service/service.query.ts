import { Prisma } from '@prisma/client';
import { middleware } from '@share/graphql/middleware';
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

const ServicesResponseType = objectType({
    name: 'ServicesResponseType',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Service'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const ServicesInputType = inputObjectType({
    name: 'ServicesInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.string('search');
        t.nullable.string('categoryId');
    },
});

export const ServicesQuery = queryField('services', {
    type: ServicesResponseType,
    args: { input: arg({ type: ServicesInputType }) },
    async resolve(
        _,
        { input: { search, categoryId, page = 1, perPage = 15 } },
        { prisma }
    ) {
        let where: Prisma.ServiceWhereInput = {
            isDelete: false,
        };
        if (search) {
            where.title = {
                contains: search,
            };
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        const data = await prisma.service.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.service.count({
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

export const ServicesDashboardQuery = queryField('servicesDashboard', {
    type: ServicesResponseType,
    args: { input: arg({ type: ServicesInputType }) },
    async resolve(
        _,
        { input: { search, categoryId, page = 1, perPage = 15 } },
        { prisma }
    ) {
        let where: Prisma.ServiceWhereInput = {
            isDelete: false,
        };
        if (search) {
            where.title = {
                contains: search,
            };
        }

        if (categoryId) {
            where.categoryId = categoryId;
        }

        const data = await prisma.service.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.service.count({
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

export const ServiceQuery = queryField('service', {
    type: nullable('Service'),
    args: { id: nonNull(stringArg()) },
    // authorize: (_, __, context) => middleware.isAdmin(context),
    resolve(_, { id }, { prisma }) {
        return prisma.service.findFirst({
            where: { id },
        });
    },
});
