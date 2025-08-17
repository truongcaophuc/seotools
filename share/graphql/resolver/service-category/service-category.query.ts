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

const ServiceCategoriesResponseType = objectType({
    name: 'ServiceCategoriesResponseType',
    definition(t) {
        t.field({
            name: 'data',
            type: list('ServiceCategory'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const ServiceCategoriesInputType = inputObjectType({
    name: 'ServiceCategoriesInputType',
    definition(t) {
        t.nullable.string('search');
        t.nullable.int('page');
        t.nullable.int('perPage');
    },
});

export const ServiceCategoriesQuery = queryField('serviceCategories', {
    type: ServiceCategoriesResponseType,
    args: { input: arg({ type: ServiceCategoriesInputType }) },
    async resolve(
        _,
        { input: { search, page = 1, perPage = 15 } },
        { prisma }
    ) {
        let where: Prisma.ServiceCategoryWhereInput = {};

        if (search) {
            where.title = {
                contains: search,
            };
        }

        const data = await prisma.serviceCategory.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            where,
        });

        const total = await prisma.serviceCategory.count({
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

export const ServiceCategoriesCustomerQuery = queryField(
    'serviceCategoriesCustomer',
    {
        type: list('ServiceCategory'),
        args: { search: nullable(stringArg()) },
        async resolve(_, { search }, { prisma }) {
            let where: Prisma.ServiceWhereInput = {};

            if (search) {
                where.title = {
                    contains: search,
                    mode: 'insensitive',
                };
                where.isDelete = false;
            }

            return prisma.serviceCategory.findMany({
                orderBy: { order: 'asc' },
                include: {
                    services: {
                        where: {
                            ...where,
                            isDelete: false,
                        },
                    },
                },
            });
        },
    }
);

export const ServiceCategoryQuery = queryField('serviceCategory', {
    type: nullable('ServiceCategory'),
    args: { id: nonNull(stringArg()) },
    resolve(_, { id }, { prisma }) {
        return prisma.serviceCategory.findFirst({
            where: { id },
            include: {
                services: true,
            },
        });
    },
});
