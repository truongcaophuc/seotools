import { list, objectType } from 'nexus';

export const ServiceCategorySchema = objectType({
    name: 'ServiceCategory',
    definition(t) {
        t.id('id');
        t.string('title');
        t.string('slug');
        t.string('description');
        t.date('createdAt');
        t.nullable.int('order');
        t.field({
            name: 'services',
            type: list('Service'),
        });
        // t.field('services', {
        //     type: list('Service'),
        //     resolve(_, __, { prisma }) {
        //         return prisma.service.findMany({
        //             where: {
        //                 isDelete: false,
        //             },
        //         });
        //     },
        // });
    },
});
