import { middleware } from '@share/graphql/middleware';
import { queryField, list } from 'nexus';

export const CustomFieldsQuery = queryField('customFields', {
    type: list('CustomField'),
    authorize: (_, __, ctx) => middleware.auth(ctx),
    resolve(_, __, { prisma }) {
        return prisma.customFieldService.findMany({});
    },
});
