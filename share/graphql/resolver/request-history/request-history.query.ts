import { Prisma } from '@prisma/client';
import { arg, inputObjectType, list, objectType, queryField } from 'nexus';

const RequestHistoriesResponseData = objectType({
    name: 'RequestHistoriesResponseData',
    definition(t) {
        t.field({
            type: list('RequestHistory'),
            name: 'data',
        });
        t.field({
            type: 'PaginationType',
            name: 'pagination',
        });
    },
});

const RequestHistoriesInputType = inputObjectType({
    name: 'RequestHistoriesInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
    },
});

export const RequestHistoriesQuery = queryField('requestHistories', {
    type: RequestHistoriesResponseData,
    args: { input: arg({ type: RequestHistoriesInputType }) },
    async resolve(_, { input: { page = 1, perPage = 15 } }, { prisma }) {
        let where: Prisma.RequestHistoryWhereInput = {
            createdAt: {
                gte: new Date('2023-03-14').toISOString(),
            },
        };

        const data = await prisma.requestHistory.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            where,
        });

        const total = await prisma.requestHistory.count({
            where,
        });

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
