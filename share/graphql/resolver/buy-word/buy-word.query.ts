import { arg, inputObjectType, list, objectType, queryField } from 'nexus';

const BuyWordsResponseData = objectType({
    name: 'BuyWordsResponseData',
    definition(t) {
        t.field({
            name: 'data',
            type: list('BuyWord'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const ListBuyWordAdminInputType = inputObjectType({
    name: 'ListBuyWordAdminInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
    },
});

export const ListBuyWordAdminQuery = queryField('listBuyWordAdmin', {
    type: BuyWordsResponseData,
    args: { input: arg({ type: ListBuyWordAdminInputType }) },
    async resolve(_, { input: { perPage = 15, page = 1 } }, { prisma }) {
        const data = await prisma.buyWord.findMany({
            take: perPage,
            skip: (page - 1) * perPage,
            where: {},
        });

        const total = await prisma.buyWord.count({
            where: {},
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
