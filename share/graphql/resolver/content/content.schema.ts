import { objectType } from 'nexus';

export const ContentSchema = objectType({
    name: 'Content',
    definition(t) {
        t.id('id');
        t.nullable.string('title');
        t.string('content');
        t.nullable.string('link');
        t.id('serviceId');
        t.field('service', {
            type: 'Service',
            resolve(root, _, { prisma }) {
                return prisma.service.findFirst({
                    where: { id: root.serviceId },
                });
            },
        });
        t.id('createdById');
        t.field('createdBy', {
            type: 'User',
            resolve(root, _, { prisma }) {
                return prisma.user.findFirst({
                    where: { id: root.createdById },
                });
            },
        });
        t.date('createdAt');
    },
});
