import { middleware } from '@share/graphql/middleware';
import { serviceRedis } from '@share/helps/redis';
import { slugify } from '@share/helps/slugify';
import {
    arg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
    stringArg,
} from 'nexus';

const DataServiceInputType = inputObjectType({
    name: 'DataServiceInputType',
    definition(t) {
        t.string('title');
        t.field({
            name: 'model',
            type: 'ModelAi',
        });
        t.nullable.string('description');
        t.nullable.id('categoryId');
        t.nullable.string('leadingSentence');
        t.nullable.string('leadingLanguage');
        t.nullable.string('leadingStyleContent');
        t.nullable.string('systemMessage');
    },
});

export const AddServiceMutation = mutationField('addService', {
    type: nullable('Service'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: DataServiceInputType }) },
    async resolve(
        _,
        {
            input: {
                model,
                title,
                description,
                categoryId,
                leadingSentence,
                leadingStyleContent,
                leadingLanguage,
            },
        },
        { prisma }
    ) {
        let slug = slugify(title);
        const count = await prisma.service.count({
            where: { slug },
        });

        if (count > 0) {
            slug = `${slug}-${count}`;
        }

        let data = {
            title,
            model,
            slug,
            description,
            leadingSentence,
            leadingStyleContent,
            leadingLanguage,
        };

        if (categoryId && categoryId.length > 0) {
            data['categoryId'] = categoryId;
        }

        const service = await prisma.service.create({
            data,
        });

        await serviceRedis.addService(service);

        return service;
    },
});

const UpdateServiceInputType = inputObjectType({
    name: 'UpdateServiceInputType',
    definition(t) {
        t.id('id');
        t.field({
            name: 'data',
            type: DataServiceInputType,
        });
    },
});

export const UpdateServiceMutation = mutationField('updateService', {
    type: nullable('Service'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: UpdateServiceInputType }) },
    async resolve(_, { input: { id, data } }, { prisma }) {
        const service = await prisma.service.update({
            where: { id },
            data,
        });

        await serviceRedis.updateService(service);

        return service;
    },
});

export const DeleteServiceMutation = mutationField('deleteService', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { id: nonNull(stringArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.service.update({
            where: { id },
            data: {
                isDelete: true,
            },
        });

        await serviceRedis.deleteService(id);
        return true;
    },
});
