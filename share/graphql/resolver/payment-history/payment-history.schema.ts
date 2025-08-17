import { nullable, objectType } from 'nexus';

export const PaymentHistorySchema = objectType({
    name: 'PaymentHistory',
    definition(t) {
        t.id('id');
        t.id('workspaceId');
        t.id('createdById');
        t.field('createdBy', {
            type: nullable('User'),
            resolve(root, _, { prisma }) {
                if (!root.createdById) return null;

                return prisma.user.findFirst({
                    where: { id: root.createdById },
                });
            },
        });
        t.nullable.id('confirmById');
        t.field('confirmBy', {
            type: nullable('User'),
            resolve(root, _, { prisma }) {
                if (!root.confirmById) return null;

                return prisma.user.findFirst({
                    where: { id: root.confirmById },
                });
            },
        });
        t.int('amount');
        t.boolean('isConfirm');
        t.nullable.boolean('isCancel');
        t.nonNull.id('cancelById');
        t.field('cancelBy', {
            type: nullable('User'),
            resolve(root, _, { prisma }) {
                if (!root.cancelById) return null;

                return prisma.user.findFirst({
                    where: { id: root.cancelById },
                });
            },
        });
        t.nullable.string('confirmAt');
        t.nullable.field({
            name: 'transactionType',
            type: 'TransactionType',
        });
        t.nullable.id('packageItemId');
        t.nullable.field('packageItem', {
            type: 'PackageItem',
            resolve(root, _, { prisma }) {
                if (!root.packageItemId) return null;

                return prisma.packageItem.findFirst({
                    where: {
                        id: root.packageItemId,
                    },
                });
            },
        });
        t.date('createdAt');
    },
});
