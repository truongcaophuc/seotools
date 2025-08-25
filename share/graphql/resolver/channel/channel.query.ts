import { Prisma } from '@prisma/client';
import { middleware } from '@share/graphql/middleware';
import { arg, inputObjectType, list, objectType, queryField } from 'nexus';

const PageChannelsResponseData = objectType({
    name: 'PageChannelsResponseData',
    definition(t) {
        t.field({
            name: 'data',
            type: list('PageChannel'),
        });
        t.nullable.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const PageChannelsInputType = inputObjectType({
    name: 'PageChannelsInputType',
    definition(t) {
        t.nullable.boolean('isAll');
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.boolean('isActive');
        t.nullable.field({
            name: 'type',
            type: 'ChannelType',
        });
    },
});

export const PageChannelsQuery = queryField('pageChannels', {
    type: PageChannelsResponseData,
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: PageChannelsInputType }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, isActive, type } },
        { prisma, workspace }
    ) {
        let where: Prisma.PageChannelWhereInput = {
            workspaceId: workspace?.id,
        };

        if (typeof isActive === 'boolean') {
            where.isActive = isActive;
        }

        if (type) {
            where.type = type;
        }

        const data = await prisma.pageChannel.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            where,
        });

        const total = await prisma.pageChannel.count({
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
