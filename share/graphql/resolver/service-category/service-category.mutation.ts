import { middleware } from '@share/graphql/middleware';
import { slugify } from '@share/helps/slugify';
import {
    arg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
    stringArg,
} from 'nexus';

const AddServiceCategoryInputType = inputObjectType({
    name: 'AddServiceCategoryInputType',
    definition(t) {
        t.string('title');
        t.nullable.string('description');
    },
});

export const AddServiceCategoryMutation = mutationField('addServiceCategory', {
    type: nullable('ServiceCategory'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: AddServiceCategoryInputType }) },
    async resolve(_, { input: { title, description } }, { prisma }) {
        let slug = slugify(title);

        //check slug
        const count = await prisma.serviceCategory.count({
            where: {
                slug,
            },
        });

        if (count > 0) {
            slug = `${slug}-${count}`;
        }

        const total = await prisma.serviceCategory.count({});

        return await prisma.serviceCategory.create({
            data: {
                title,
                slug,
                description,
                order: total + 1,
            },
        });
    },
});

const UpdateServiceCategoryInputType = inputObjectType({
    name: 'UpdateServiceCategoryInputType',
    definition(t) {
        t.nonNull.id('id');
        t.field({ name: 'data', type: AddServiceCategoryInputType });
        t.nullable.int('order');
    },
});

export const UpdateServiceCategoryMutation = mutationField(
    'updateServiceCategory',
    {
        type: nullable('ServiceCategory'),
        authorize: (_, __, context) => middleware.isAdmin(context),
        args: { input: arg({ type: UpdateServiceCategoryInputType }) },
        resolve(_, { input: { id, data, order } }, { prisma }) {
            return prisma.serviceCategory.update({
                where: { id },
                data: {
                    ...data,
                    order,
                },
            });
        },
    }
);

export const DeleteServiceCategoryMutation = mutationField(
    'deleteServiceCategory',
    {
        type: 'Boolean',
        authorize: (_, __, context) => middleware.isAdmin(context),
        args: { id: nonNull(stringArg()) },
        async resolve(_, { id }, { prisma }) {
            await prisma.serviceCategory.delete({
                where: { id },
            });
            return true;
        },
    }
);
