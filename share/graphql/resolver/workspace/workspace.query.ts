import { idArg, list, nullable, queryField, stringArg } from 'nexus';

export const WorkspacesQuery = queryField('workspaces', {
    type: list('Workspace'),
    args: {},
    resolve(_, {}, { prisma }) {
        return prisma.workspace.findMany({});
    },
});

export const WorkspaceQuery = queryField('workspace', {
    type: nullable('Workspace'),
    args: { id: stringArg() },
    resolve(_, { id }, { prisma }) {
        return prisma.workspace.findFirst({
            where: { id },
        });
    },
});

export const WorkspacePackageQuery = queryField('workspacePackage', {
    type: nullable('WorkspacePackage'),
    args: { id: idArg() },
    resolve(_, { id }, { prisma }) {
        return prisma.workspacePackage.findFirst({
            where: { id },
        });
    },
});
