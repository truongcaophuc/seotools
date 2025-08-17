import { middleware } from '@share/graphql/middleware';
import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
} from 'nexus';

const UpdateLanguageInputType = inputObjectType({
    name: 'UpdateLanguageInputType',
    definition(t) {
        t.nullable.id('id');
        t.nullable.string('label');
        t.nullable.string('value');
        t.nullable.boolean('isDefault');
    },
});

export const UpdateLanguage = mutationField('updateLanguage', {
    type: nullable('Language'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: UpdateLanguageInputType }) },
    async resolve(
        _,
        { input: { id, label, value, isDefault = false } },
        { prisma, user }
    ) {
        if (isDefault) {
            await prisma.language.updateMany({
                data: { isDefault: false },
            });
        }
        if (id) {
            return await prisma.language.update({
                where: { id },
                data: { label, isDefault, value },
            });
        }

        return await prisma.language.create({
            data: { label, value, createdById: user?.id, isDefault },
        });
    },
});

export const DeleteLanguage = mutationField('deleteLanguage', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { id: nonNull(idArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.language.update({
            where: { id },
            data: {
                isDelete: true,
            },
        });
        return true;
    },
});
