import { middleware } from '@share/graphql/middleware';
import {
    arg,
    enumType,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
} from 'nexus';

const CreatePaymentHistoryInputType = inputObjectType({
    name: 'CreatePaymentHistoryInputType',
    definition(t) {
        // t.nonNull.int('amount');
        t.nonNull.field({
            type: 'TransactionType',
            name: 'transactionType',
        });
        t.nonNull.string('packageItemId');
    },
});

export const CreatePaymentHistoryMutation = mutationField(
    'createPaymentHistory',
    {
        type: 'Boolean',
        authorize: (_, __, ctx) => middleware.isOwner(ctx),
        args: {
            input: arg({ type: CreatePaymentHistoryInputType }),
        },
        async resolve(
            _,
            { input: { transactionType, packageItemId } },
            { prisma, user }
        ) {
            const packageItem = await prisma.packageItem.findFirst({
                where: { id: packageItemId },
                include: {
                    packagePeriod: true,
                    packageParent: true,
                },
            });

            await prisma.paymentHistory.create({
                data: {
                    transactionType,
                    createdById: user?.id,
                    isConfirm: false,
                    workspaceId: user?.workspaceId,
                    amount: packageItem?.price,
                    packageItemId,
                },
            });

            return true;
        },
    }
);

export const ConfirmPaymentHistoryMutation1 = mutationField(
    'confirmPaymentHistory1',
    {
        type: nullable('PaymentHistory'),
        authorize: (_, __, ctx) => middleware.isAdmin(ctx),
        args: {
            id: nonNull(idArg()),
        },
        async resolve(_, { id }, { prisma, user }) {
            const findPayment = prisma.paymentHistory.findFirst({
                where: { id },
            });

            const paymentUpdate = prisma.paymentHistory.update({
                where: { id },
                data: {
                    isConfirm: true,
                    confirmById: user?.id,
                    confirmAt: new Date().toString(),
                },
            });

            const res = await prisma.$transaction([findPayment, paymentUpdate]);

            const payment = res[0];

            const workspace = await prisma.workspace.findFirst({
                where: { id: payment?.workspaceId },
            });

            const oldBalance = workspace?.balance || 0;
            const balance = oldBalance + payment?.amount;

            await prisma.workspace.update({
                where: { id: workspace?.id },
                data: {
                    balance,
                },
            });

            return paymentUpdate;
        },
    }
);

export const ConfirmPaymentHistoryMutation = mutationField(
    'confirmPaymentHistory',
    {
        type: nullable('PaymentHistory'),
        authorize: (_, __, ctx) => middleware.isAdmin(ctx),
        args: {
            id: nonNull(idArg()),
        },
        async resolve(_, { id }, { prisma, user }) {
            const paymentHistory = await prisma.paymentHistory.findUnique({
                where: { id },
            });

            if (
                !paymentHistory ||
                paymentHistory.isConfirm ||
                paymentHistory.isCancel
            ) {
                throw new Error(
                    'Payment history not found or has been confirmed'
                );
            }

            const packageItem = await prisma.packageItem.findFirst({
                where: { id: paymentHistory?.packageItemId },
                include: { packagePeriod: true },
            });

            if (!packageItem) {
                throw new Error('Payment item not found');
            }

            const workspace = await prisma.workspace.findFirst({
                where: { id: paymentHistory.workspaceId },
            });

            if (!workspace) {
                throw new Error('Workspace not found');
            }

            const workspacePackage = await prisma.workspacePackage.findFirst({
                where: {
                    workspaceId: workspace.id,
                },
            });

            let updateWorkspacePackage;

            if (workspacePackage) {
                updateWorkspacePackage = prisma.workspacePackage.update({
                    where: { id: workspacePackage.id },
                    data: {
                        packageItemId: packageItem.id,
                        workspaceId: workspace.id,
                        isActive: true,
                        numberWord: packageItem.numberWord,
                        time: packageItem.packagePeriod?.time,
                        freeTime: packageItem.freeTime,
                    },
                });
            } else {
                updateWorkspacePackage = prisma.workspacePackage.create({
                    data: {
                        packageItemId: packageItem.id,
                        workspaceId: workspace.id,
                        isActive: true,
                        numberWord: packageItem.numberWord,
                        time: packageItem.packagePeriod?.time,
                        freeTime: packageItem.freeTime,
                    },
                });
            }

            const paymentHistoryUpdate = prisma.paymentHistory.update({
                where: { id: paymentHistory?.id },
                data: {
                    isConfirm: true,
                    confirmById: user?.id,
                    confirmAt: new Date().toString(),
                },
            });

            const res = await prisma.$transaction([
                updateWorkspacePackage,
                paymentHistoryUpdate,
            ]);

            await prisma.workspace.update({
                where: { id: workspace.id },
                data: {
                    workspacePackageId: res[0].id,
                    isTrial: false,
                },
            });

            return res[1];
        },
    }
);

export const CancelPaymentHistoryMutation = mutationField(
    'cancelPaymentHistory',

    {
        type: nullable('PaymentHistory'),
        authorize: (_, __, ctx) => middleware.isAdmin(ctx),
        args: {
            id: nonNull(idArg()),
        },
        resolve(_, { id }, { prisma, user }) {
            return prisma.paymentHistory.update({
                where: { id },
                data: {
                    isCancel: true,
                    cancelById: user?.id,
                },
            });
        },
    }
);

export const DeletePaymentHistoryMutation = mutationField(
    'deletePaymentHistory',
    {
        type: 'Boolean',
        authorize: (_, __, ctx) => middleware.isAdmin(ctx),
        args: {
            id: nonNull(idArg()),
        },
        async resolve(_, { id }, { prisma }) {
            await prisma.paymentHistory.delete({
                where: { id },
            });
            return true;
        },
    }
);
