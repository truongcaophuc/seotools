import { Prisma } from '@prisma/client';
import { middleware } from '@share/graphql/middleware';
import { arg, inputObjectType, list, objectType, queryField } from 'nexus';

const PaymentHistoriesResponse = objectType({
    name: 'PaymentHistoriesResponse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('PaymentHistory'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const PaymentHistoriesInputType = inputObjectType({
    name: 'PaymentHistoriesInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.boolean('isConfirm');
    },
});

export const PaymentHistoriesUserQuery = queryField('paymentHistoriesUser', {
    type: PaymentHistoriesResponse,
    authorize: (_, __, ctx) => middleware.auth(ctx),
    args: { input: arg({ type: PaymentHistoriesInputType }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, isConfirm } },
        { prisma, user }
    ) {
        const where: Prisma.PaymentHistoryWhereInput = {
            workspaceId: user.workspaceId,
        };

        if (typeof isConfirm !== 'undefined') {
            where.isConfirm = isConfirm;
        }

        const data = await prisma.paymentHistory.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.paymentHistory.count({
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

const PaymentHistoriesAdminInputType = inputObjectType({
    name: 'PaymentHistoriesAdminInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.boolean('isConfirm');
    },
});

export const PaymentHistoriesAdminQuery = queryField('paymentHistoriesAdmin', {
    type: PaymentHistoriesResponse,
    authorize: (_, __, ctx) => middleware.isAdmin(ctx),
    args: { input: arg({ type: PaymentHistoriesAdminInputType }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, isConfirm } },
        { prisma }
    ) {
        let where: Prisma.PaymentHistoryWhereInput = {};

        const data = await prisma.paymentHistory.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            orderBy: { createdAt: 'desc' },
            where,
        });

        const total = await prisma.paymentHistory.count({
            where,
        });

        return {
            data,
            pagination: {
                perPage,
                page,
                total,
            },
        };
    },
});
