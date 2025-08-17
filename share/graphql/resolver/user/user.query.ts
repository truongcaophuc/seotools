import { Prisma } from '@prisma/client';
import { middleware } from '@share/graphql/middleware';
import {
    arg,
    inputObjectType,
    list,
    nullable,
    objectType,
    queryField,
    stringArg,
} from 'nexus';

const UsersInputType = inputObjectType({
    name: 'UsersInputType',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.string('search');
    },
});

const UsersDataResponse = objectType({
    name: 'UsersDataResponse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('User'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

export const UsersQuery = queryField('users', {
    type: UsersDataResponse,
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: UsersInputType }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, search } },
        { prisma }
    ) {
        let where: Prisma.UserWhereInput = {
            role: {
                notIn: [
                    'RootAdmin',
                    // 'Admin',
                    'Staff',
                    'AdminStaff',
                ],
            },
        };

        if (search) {
            where.OR = [
                {
                    fullname: {
                        contains: search,
                    },
                },
                {
                    phoneNumber: {
                        contains: search,
                    },
                },

                {
                    email: {
                        contains: search,
                    },
                },
            ];
        }

        const data = await prisma.user.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            orderBy: { createdAt: 'desc' },
            where,
        });

        const total = await prisma.user.count({
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

export const UserQuery = queryField('user', {
    type: nullable('User'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { userId: stringArg() },
    resolve(_, { userId }, { prisma }) {
        return prisma.user.findFirst({
            where: { id: userId },
        });
    },
});
