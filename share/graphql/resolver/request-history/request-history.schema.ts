import { nullable, objectType } from 'nexus';

export const RequestHistorySchema = objectType({
    name: 'RequestHistory',
    definition(t) {
        t.id('id');
        t.int('tokens');
        t.float('price');
        t.id('userId');
        t.field('user', {
            type: nullable('User'),
            resolve(root, _, { prisma }) {
                if (!root.userId) return null;

                return prisma.user.findFirst({
                    where: { id: root.userId },
                });
            },
        });
        t.id('workspaceId');
        t.field('workspace', {
            type: nullable('Workspace'),
            resolve(root, _, { prisma }) {
                if (!root.workspaceId) return null;
                return prisma.workspace.findFirst({
                    where: { id: root.workspaceId },
                });
            },
        });
        t.id('projectId');
        t.field('project', {
            type: nullable('Project'),
            resolve(root, _, { prisma }) {
                if (!root.workspaceId) return null;
                return prisma.project.findFirst({
                    where: { id: root.projectId },
                });
            },
        });
        t.date('createdAt');
    },
});
