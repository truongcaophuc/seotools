import { nullable, objectType } from 'nexus';

export const BuyWordSchema = objectType({
    name: 'BuyWord',
    definition(t) {
        t.id('id');
        t.id('workspaceId');
        t.field('workspace', {
            type: 'Workspace',
            resolve(root, _, { prisma }) {
                return prisma.workspace.findFirst({
                    where: { id: root.workspaceId },
                });
            },
        });
        t.field({
            name: 'transactionType',
            type: 'TransactionType',
        });
        t.int('price');
        t.int('numberWord');
        t.boolean('isConfirm');
        t.nullable.boolean('isCancel');
        t.id('createdById');
        t.field('createdBy', {
            type: 'User',
            resolve(root, _, { prisma }) {
                return prisma.user.findFirst({
                    where: { id: root.createdById },
                });
            },
        });
        t.id('confirmById');
        t.field('confirmBy', {
            type: nullable('User'),
            resolve(root, _, { prisma }) {
                if (!root.confirmById) return null;

                return prisma.user.findFirst({
                    where: { id: root.confirmById },
                });
            },
        });
        t.date('createdAt');
    },
});
