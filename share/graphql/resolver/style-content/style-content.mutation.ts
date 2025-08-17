import { middleware } from '@share/graphql/middleware';
import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
} from 'nexus';

const UpdateStyleContentInputType = inputObjectType({
    name: 'UpdateStyleContentInputType',
    definition(t) {
        t.nullable.id('id');
        t.string('label');
        t.string('value');
    },
});

export const UpdateStyleContent = mutationField('updateStyleContent', {
    type: nullable('StyleContent'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: UpdateStyleContentInputType }) },
    resolve(_, { input: { id, label, value } }, { prisma, user }) {
        if (id) {
            return prisma.styleContent.update({
                where: { id },
                data: { label, value },
            });
        }

        return prisma.styleContent.create({
            data: { value, label, createdById: user?.id },
        });
    },
});

export const DeleteStyleContent = mutationField('deleteStyleContent', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { id: nonNull(idArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.styleContent.update({
            where: { id },
            data: {
                isDelete: true,
            },
        });
        return true;
    },
});
