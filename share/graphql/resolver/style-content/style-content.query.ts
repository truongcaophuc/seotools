import { middleware } from '@share/graphql/middleware';
import { list, queryField } from 'nexus';

export const StyleContentsQuery = queryField('styleContents', {
    type: list('StyleContent'),
    authorize: (_, __, context) => middleware.auth(context),
    resolve(_, __, { prisma }) {
        return prisma.styleContent.findMany({
            where: { isDelete: false },
        });
    },
});
