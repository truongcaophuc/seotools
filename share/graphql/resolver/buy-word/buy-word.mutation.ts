import {
    arg,
    booleanArg,
    idArg,
    inputObjectType,
    mutationField,
    nullable,
} from 'nexus';

const RequestBuyWordInputType = inputObjectType({
    name: 'RequestBuyWordInputType',
    definition(t) {
        t.nonNull.int('price');
        t.nonNull.int('numberWord');
        t.nonNull.field({
            name: 'transactionType',
            type: 'TransactionType',
        });
    },
});

export const RequestBuyWord = mutationField('requestBuyWord', {
    type: nullable('BuyWord'),
    args: { input: arg({ type: RequestBuyWordInputType }) },
    resolve(
        _,
        { input: { price, numberWord, transactionType } },
        { prisma, user, workspace }
    ) {
        return prisma.buyWord.create({
            data: {
                workspaceId: workspace.id,
                price,
                numberWord,
                transactionType,
                createdById: user.id,
            },
        });
    },
});

const ConfirmRequestBuyWordInputType = inputObjectType({
    name: 'ConfirmRequestBuyWordInputType',
    definition(t) {
        t.id('buyWordId');
        t.boolean('isConfirm');
    },
});

export const ConfirmRequestBuyWord = mutationField('confirmRequestBuyWord', {
    type: 'Boolean',
    args: { input: arg({ type: ConfirmRequestBuyWordInputType }) },
    async resolve(_, { input: { buyWordId, isConfirm } }, { prisma, user }) {
        const requestBuyWord = await prisma.buyWord.findFirst({
            where: { id: buyWordId },
        });

        if (!requestBuyWord) return false;

        const workspace = await prisma.workspace.findFirst({
            where: { id: requestBuyWord.workspaceId },
        });

        if (!workspace) return false;

        const updateWorkspacePackage = prisma.workspacePackage.update({
            where: { id: workspace?.workspacePackageId },
            data: {
                numberWord: {
                    increment: requestBuyWord.numberWord,
                },
            },
        });

        let confirmRequestBuyWord;

        if (isConfirm) {
            confirmRequestBuyWord = prisma.buyWord.update({
                where: { id: requestBuyWord.id },
                data: {
                    isConfirm,
                    confirmById: user.id,
                },
            });
        } else {
            confirmRequestBuyWord = prisma.buyWord.update({
                where: { id: requestBuyWord.id },
                data: {
                    isCancel: true,
                    confirmById: user.id,
                },
            });
        }

        await prisma.$transaction([
            updateWorkspacePackage,
            confirmRequestBuyWord,
        ]);

        return true;
    },
});
