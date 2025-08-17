import { nonNull, nullable, queryField, stringArg } from 'nexus';

export const CodeQuery = queryField('code', {
    type: nullable('Code'),
    args: { code: nonNull(stringArg()) },
    resolve(_, { code }, { prisma }) {
        return prisma.code.findFirst({
            where: { code },
        });
    },
});
