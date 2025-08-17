import { enumType, nullable, objectType } from 'nexus';

const UserRole = enumType({
    name: 'UserRole',
    members: ['RootAdmin', 'Admin', 'AdminStaff', 'User', 'Staff'],
    description: 'Role of user',
});

export const UserSchema = objectType({
    name: 'User',
    definition(t) {
        t.nonNull.id('id');
        t.nonNull.string('username');
        t.nonNull.string('email');
        t.string('password');
        t.nullable.string('fullname');
        t.nullable.string('phoneNumber');
        t.boolean('active');
        t.nullable.boolean('isVerify');
        t.nullable.boolean('isDeveloper');
        t.field({
            name: 'role',
            type: UserRole,
        });
        t.nullable.id('workspaceId');
        t.field('workspace', {
            type: nullable('Workspace'),
            resolve(root, _, { prisma }) {
                if (!root.workspaceId) return null;

                return prisma.workspace.findFirst({
                    where: { id: root.workspaceId || undefined },
                });
            },
        });
        t.nullable.id('defaultTeamId');
        t.nullable.id('defaultProjectId');
        
        t.field('defaultProject', {
            type: nullable('Project'),
            resolve(root, _, { prisma }) {
                if (!root.defaultProjectId) return null;

                return prisma.project.findFirst({
                    where: { id: root.defaultProjectId || undefined },
                });
            },
        });
        t.date('createdAt');
    },
});
