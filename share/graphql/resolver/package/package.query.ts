import { Prisma } from '@prisma/client';
import { booleanArg, list, nullable, objectType, queryField } from 'nexus';

export const PackagesQuery = queryField('packages', {
    type: list('Package'),
    resolve(_, {}, { prisma }) {
        return prisma.package.findMany({
            where: {},
        });
    },
});

export const PackagePeriodsQuery = queryField('packagePeriods', {
    type: list('PackagePeriod'),
    args: { isActive: nullable(booleanArg()) },
    resolve(_, { isActive }, { prisma }) {
        let where: Prisma.PackagePeriodWhereInput = {};

        if (typeof isActive === 'boolean') {
            where.isActive = isActive;
        }

        return prisma.packagePeriod.findMany({
            where,
        });
    },
});

const PricingResponse = objectType({
    name: 'PricingResponse',
    definition(t) {
        t.field({
            name: 'periods',
            type: list('PackagePeriod'),
        });
        t.field({
            name: 'packages',
            type: list('Package'),
        });
    },
});

export const PricingQuery = queryField('pricing', {
    type: PricingResponse,
    async resolve(_, {}, { prisma }) {
        const getPackagePeriods = prisma.packagePeriod.findMany({
            where: { isActive: true },
            orderBy: {
                order: 'asc',
            },
        });
        const getPackages = prisma.package.findMany({
            where: { isActive: true, isShow: true },
        });

        const response = await prisma.$transaction([
            getPackagePeriods,
            getPackages,
        ]);

        return {
            periods: response[0],
            packages: response[1],
        };
    },
});
