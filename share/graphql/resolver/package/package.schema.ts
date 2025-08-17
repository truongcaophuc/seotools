import { enumType, list, nullable, objectType } from 'nexus';

const PackageType = enumType({
    name: 'PackageType',
    members: ['Trial', 'Basic', 'Premium'],
});

export const PackageSchema = objectType({
    name: 'Package',
    definition(t) {
        t.id('id');
        t.string('name');
        t.field({ name: 'type', type: PackageType });
        t.boolean('isActive');
        t.nullable.boolean('isShow');
        t.date('createdAt');
        t.field('packageItems', {
            type: list('PackageItem'),
            resolve(root, _, { prisma }) {
                return prisma.packageItem.findMany({
                    where: { packageParentId: root.id },
                });
            },
        });
    },
});

export const PackageItemSchema = objectType({
    name: 'PackageItem',
    definition(t) {
        t.id('id');
        t.int('freeTime');
        t.int('price');
        t.boolean('isActive');
        t.id('packageParentId');
        t.field('packageParent', {
            type: nullable('Package'),
            resolve(root, _, { prisma }) {
                if (!root.packageParentId) return null;
                return prisma.package.findFirst({
                    where: { id: root.packageParentId },
                });
            },
        });
        t.id('packagePeriodId');
        t.field('packagePeriod', {
            type: nullable('PackagePeriod'),
            resolve(root, _, { prisma }) {
                if (!root.packagePeriodId) return null;
                return prisma.packagePeriod.findFirst({
                    where: { id: root.packagePeriodId },
                });
            },
        });
        t.nullable.int('numberWord');
        t.nullable.string('content');
        t.date('createdAt');
    },
});

export const PackagePeriodSchema = objectType({
    name: 'PackagePeriod',
    definition(t) {
        t.id('id');
        t.string('name');
        t.int('time');
        t.int('order');
        t.boolean('isActive');
        t.date('createdAt');
    },
});
