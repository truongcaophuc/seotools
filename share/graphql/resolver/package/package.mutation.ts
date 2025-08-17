import { arg, inputObjectType, mutationField, nullable } from 'nexus';

const UpdatePackageInputType = inputObjectType({
    name: 'UpdatePackageInputType',
    definition(t) {
        t.nullable.id('id');
        t.string('name');
        t.field({
            name: 'type',
            type: 'PackageType',
        });
        t.nullable.boolean('isActive');
        t.nullable.boolean('isShow');
    },
});

export const UpdatePackage = mutationField('updatePackage', {
    type: nullable('Package'),
    args: { input: arg({ type: UpdatePackageInputType }) },
    resolve(_, { input: { id, ...rest } }, { prisma }) {
        if (id) {
            return prisma.package.update({
                where: { id },
                data: { ...rest },
            });
        }

        const { name, type } = rest;

        return prisma.package.create({
            data: { name, type },
        });
    },
});

const UpdatePackageItemInputType = inputObjectType({
    name: 'UpdatePackageItemInputType',
    definition(t) {
        t.nullable.id('id');
        t.int('freeTime');
        t.int('price');
        t.id('packageParentId');
        t.id('packagePeriodId');
        t.nullable.string('content');
        t.nullable.int('numberWord');
        t.nullable.boolean('isActive');
    },
});

export const UpdatePackageItem = mutationField('updatePackageItem', {
    type: nullable('PackageItem'),
    args: { input: arg({ type: UpdatePackageItemInputType }) },
    resolve(_, { input: { id, ...rest } }, { prisma }) {
        if (id) {
            return prisma.packageItem.update({
                where: { id },
                data: { ...rest },
            });
        }

        const {
            freeTime,
            price,
            content,
            packageParentId,
            packagePeriodId,
            isActive,
            numberWord,
        } = rest;

        return prisma.packageItem.create({
            data: {
                freeTime,
                price,
                content,
                packageParentId,
                packagePeriodId,
                isActive,
                numberWord,
            },
        });
    },
});

const UpdatePackagePeriodInputType = inputObjectType({
    name: 'UpdatePackagePeriodInputType',
    definition(t) {
        t.nullable.id('id');
        t.string('name');
        t.int('time');
        t.nullable.int('order');
        t.nullable.boolean('isActive');
    },
});

export const UpdatePackagePeriod = mutationField('updatePackagePeriod', {
    type: nullable('PackagePeriod'),
    args: { input: arg({ type: UpdatePackagePeriodInputType }) },
    resolve(_, { input: { id, ...rest } }, { prisma }) {
        if (id) {
            return prisma.packagePeriod.update({
                where: { id },
                data: { ...rest },
            });
        }

        const { name, time, order } = rest;

        return prisma.packagePeriod.create({
            data: {
                name,
                time,
                order,
            },
        });
    },
});
