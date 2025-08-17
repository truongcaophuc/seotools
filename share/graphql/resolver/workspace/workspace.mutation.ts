import { middleware } from '@share/graphql/middleware';
import { getTotalTokenDoc } from '@share/helps/token-document';
import {
    arg,
    idArg,
    inputObjectType,
    intArg,
    mutationField,
    nullable,
    stringArg,
} from 'nexus';

const UpdateWorkspaceInputType = inputObjectType({
    name: 'UpdateWorkspaceInputType',
    definition(t) {
        t.nullable.id('id');
        t.string('name');
        t.nullable.string('description');
    },
});

export const UpdateWorkspace = mutationField('updateWorkspace', {
    type: nullable('Workspace'),
    authorize: (_, __, ctx) => middleware.auth(ctx),
    args: { input: arg({ type: UpdateWorkspaceInputType }) },
    async resolve(_, { input: { id, name, description } }, { prisma, user }) {
        if (id) {
            return prisma.workspace.update({
                where: { id },
                data: {
                    name,
                    description,
                },
            });
        }

        const workspace = await prisma.workspace.create({
            data: {
                ownerId: user.id,
                name,
                description,
            },
        });

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                workspaceId: workspace.id,
            },
        });

        return workspace;
    },
});

const UpdateWorkspaceAdminInputType = inputObjectType({
    name: 'UpdateWorkspaceAdminInputType',
    definition(t) {
        t.nonNull.id('id');
        t.nullable.boolean('isTrial');
        t.nullable.float('balance');
    },
});

export const UpdateWorkspaceAdmin = mutationField('updateWorkspaceAdmin', {
    type: nullable('Workspace'),
    authorize: (_, __, ctx) => middleware.isAdmin(ctx),
    args: { input: arg({ type: UpdateWorkspaceAdminInputType }) },
    resolve(_, { input: { id, isTrial, balance } }, { prisma }) {
        return prisma.workspace.update({
            where: { id },
            data: {
                isTrial,
                balance,
            },
        });
    },
});

const ChangeExpiredTimeWorkspaceInputType = inputObjectType({
    name: 'ChangeExpiredTimeWorkspaceInputType',
    definition(t) {
        t.nonNull.id('workspaceId');
        t.nonNull.date('expiredAt');
    },
});

export const ChangeExpiredTimeWorkspace = mutationField(
    'changeExpiredTimeWorkspace',
    {
        type: nullable('Workspace'),
        authorize: (_, __, ctx) => middleware.isAdmin(ctx),
        args: { input: arg({ type: ChangeExpiredTimeWorkspaceInputType }) },
        resolve(_, { input: { workspaceId, expiredAt } }, { prisma }) {
            return prisma.workspace.update({
                where: { id: workspaceId },
                data: {
                    expiredAt,
                },
            });
        },
    }
);

function getContentLength(content: string): number {
    return content.replaceAll('\n', '').trim().split(' ').length;
}

export const PayRequestAiContentMutation = mutationField(
    'payRequestAiContent',
    {
        type: 'Int',
        authorize: (_, __, context) => middleware.auth(context),
        args: { token: intArg(), content: stringArg() },
        async resolve(
            _,
            { token, content = '' },
            { prisma, workspace, setting, user, project }
        ) {
            try {
                if (workspace?.workspacePackageId) {
                    return await prisma.$transaction(async (tx) => {
                        const workspacePackage =
                            await tx.workspacePackage.findFirst({
                                where: { id: workspace.workspacePackageId },
                            });

                        const numberWord = workspacePackage?.numberWord;

                        const contentLength = getContentLength(content);

                        console.log({ content, contentLength });

                        const a = await tx.workspacePackage.update({
                            where: { id: workspace.workspacePackageId },
                            data: {
                                numberWord:
                                    numberWord < contentLength
                                        ? 0
                                        : {
                                              decrement: contentLength,
                                          },
                            },
                        });

                        return numberWord < contentLength
                            ? 0
                            : numberWord - contentLength;
                    });
                }

                const price = token * setting?.priceToken || token * 0.07;
                const newBalance = workspace.balance - price;

                const changeBalanceWorkspace = prisma.workspace.update({
                    where: { id: workspace.id },
                    data: {
                        balance: newBalance,
                    },
                });

                const createRequestHistory = prisma.requestHistory.create({
                    data: {
                        tokens: token,
                        price,
                        userId: user?.id,
                        workspaceId: workspace?.id,
                        projectId: project?.id,
                    },
                });

                await prisma.$transaction([
                    changeBalanceWorkspace,
                    createRequestHistory,
                ]);

                return newBalance;
            } catch (error) {
                console.log(error);

                return 1;
            }
        },
    }
);

export const PayContentAI = mutationField('payContentAI', {
    type: 'Boolean',
    args: { content: stringArg() },
    async resolve(_, { content = '' }, { prisma, setting, workspace }) {
        if (workspace?.workspacePackageId) {
            return await prisma.$transaction(async (tx) => {
                const workspacePackage = await tx.workspacePackage.findFirst({
                    where: { id: workspace.workspacePackageId },
                });

                const numberWord = workspacePackage?.numberWord;

                const contentLength = getContentLength(content);

                await tx.workspacePackage.update({
                    where: { id: workspace.workspacePackageId },
                    data: {
                        numberWord:
                            numberWord < contentLength
                                ? 0
                                : {
                                      decrement: contentLength,
                                  },

                        timeUseGpt4: {
                            decrement: 1,
                        },
                    },
                });

                return true;
            });
        }
        const totalToken = getTotalTokenDoc(content);
        const totalPrice = totalToken * setting?.priceToken;

        let balance = workspace?.balance - totalPrice;

        if (balance < 0) {
            balance = 0;
        }
        await prisma.workspace.update({
            where: { id: workspace?.id },
            data: {
                balance,
            },
        });

        return true;
    },
});

export const UpdateTimeUseGpt4 = mutationField('updateTimeUseGpt4', {
    type: nullable('WorkspacePackage'),
    authorize: (_, __, ctx) => middleware.isOwner(ctx),
    args: { workspacePackageId: idArg() },
    resolve(_, { workspacePackageId }, { prisma, setting }) {
        return prisma.workspacePackage.update({
            where: { id: workspacePackageId },
            data: { timeUseGpt4: setting?.numberOfTimeUseGpt4 },
        });
    },
});
