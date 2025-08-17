import { middleware } from '@share/graphql/middleware';
import {
    inputObjectType,
    mutationField,
    nullable,
    arg,
    nonNull,
    idArg,
} from 'nexus';

const AddCustomFieldInputType = inputObjectType({
    name: 'AddCustomFieldInputType',
    definition(t) {
        t.nullable.id('id');
        t.nonNull.string('title');
        t.nonNull.string('field');
        t.nullable.string('description');
        t.field({
            type: nullable('CustomFieldInputType'),
            name: 'inputType',
        });
    },
});

export const AddCustomFieldMutation = mutationField('addCustomField', {
    type: nullable('CustomField'),
    authorize: (_, __, ctx) => middleware.isAdmin(ctx),
    args: { input: arg({ type: AddCustomFieldInputType }) },
    resolve(_, { input: { id, ...rest } }, { prisma }) {
        if (id) {
            return prisma.customFieldService.update({
                where: { id },
                data: { ...rest },
            });
        }
        return prisma.customFieldService.create({
            data: { ...rest },
        });
    },
});

export const DeleteCustomField = mutationField('deleteCustomField', {
    type: 'Boolean',
    authorize: (_, __, ctx) => middleware.isAdmin(ctx),
    args: { id: nonNull(idArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.customFieldService.delete({
            where: { id },
        });
        return true;
    },
});
