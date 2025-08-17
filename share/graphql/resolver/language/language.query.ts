import { middleware } from '@share/graphql/middleware';
import { list, queryField } from 'nexus';

export const LanguagesQuery = queryField('languages', {
    type: list('Language'),
    authorize: (_, __, context) => middleware.auth(context),
    resolve(_, __, { prisma }) {
        return prisma.language.findMany({
            where: { isDelete: false },
        });
    },
});
