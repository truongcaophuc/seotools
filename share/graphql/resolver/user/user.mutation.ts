import { Role } from '@prisma/client';
import { AUTH_ERROR, PROJECT_ERROR } from '@share/error/auth.error';
import { middleware } from '@share/graphql/middleware';
import { checkPassword, generalPasswordHash } from '@share/helps/password';
import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
} from 'nexus';

const AddUserAdminInputType = inputObjectType({
    name: 'AddUserAdminInputType',
    definition(t) {
        t.string('email');
        t.string('username');
        t.string('password');
        t.nullable.string('fullname');
    },
});

export const AddUserAdminMutation = mutationField('addUserAdmin', {
    type: nullable('User'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: AddUserAdminInputType }) },
    async resolve(
        _,
        { input: { email, username, password, fullname } },
        { prisma }
    ) {
        try {
            const passwordHash = await generalPasswordHash(password);
            const data = {
                email,
                username,
                password: passwordHash,
                fullname,
                role: Role.Admin,
            };

            const user = await prisma.user.create({
                data,
            });

            return user;
        } catch (error) {
            console.log({ error });
        }
    },
});

const AddRootAdminInputType = inputObjectType({
    name: 'AddRootAdminInputType',
    definition(t) {
        t.string('email');
        t.string('username');
        t.string('password');
        t.nullable.string('fullname');
    },
});

export const AddRootAdminMutation = mutationField('addRootAdmin', {
    type: nullable('User'),
    authorize: (_, __, context) => {
        // Chỉ RootAdmin mới có thể tạo RootAdmin khác
        return context?.user?.role === 'RootAdmin';
    },
    args: { input: arg({ type: AddRootAdminInputType }) },
    async resolve(
        _,
        { input: { email, username, password, fullname } },
        { prisma }
    ) {
        try {
            // Kiểm tra xem email hoặc username đã tồn tại chưa
            const existingUser = await prisma.user.findFirst({
                where: {
                    OR: [
                        { email },
                        { username }
                    ]
                }
            });

            if (existingUser) {
                throw new Error('Email hoặc username đã tồn tại');
            }

            const passwordHash = await generalPasswordHash(password);
            
            const rootAdmin = await prisma.user.create({
                data: {
                    email,
                    username,
                    password: passwordHash,
                    fullname,
                    role: Role.RootAdmin,
                    active: true,
                    isVerify: true
                }
            });

            // Tạo workspace cho RootAdmin
            const workspace = await prisma.workspace.create({
                data: {
                    name: fullname || 'Admin Workspace',
                    description: 'Workspace của Root Administrator',
                    ownerId: rootAdmin.id,
                    balance: 1000000
                }
            });

            // Tạo team mặc định
            const team = await prisma.team.create({
                data: {
                    name: username + ' Team',
                    ownerId: rootAdmin.id,
                    default: true,
                    memberIds: [rootAdmin.id],
                    workspaceId: workspace.id
                }
            });

            // Tạo project mặc định
            const project = await prisma.project.create({
                data: {
                    name: 'Admin Project',
                    teamId: team.id,
                    workspaceId: workspace.id,
                    default: true
                }
            });

            // Cập nhật user với workspace, team và project mặc định
            const updatedRootAdmin = await prisma.user.update({
                where: { id: rootAdmin.id },
                data: {
                    workspaceId: workspace.id,
                    defaultTeamId: team.id,
                    defaultProjectId: project.id
                }
            });

            return updatedRootAdmin;
        } catch (error) {
            console.log({ error });
            throw error;
        }
    },
});

const AddCustomerInputType = inputObjectType({
    name: 'AddCustomerInputType',
    definition(t) {
        t.string('email');
        t.string('username');
        t.string('password');
        t.nullable.string('phoneNumber');
        t.nullable.string('fullname');
    },
});

export const AddCustomerMutation = mutationField('addCustomer', {
    type: nullable('User'),
    authorize: (_, __, context) => middleware.isAdmin(context),
    args: { input: arg({ type: AddCustomerInputType }) },
    async resolve(
        _,
        { input: { email, username, password, fullname } },
        { prisma }
    ) {
        const passwordHash = await generalPasswordHash(password);

        const user = await prisma.user.create({
            data: {
                email,
                username,
                password: passwordHash,
                fullname,
            },
        });

        const workspace = await prisma.workspace.create({
            data: {
                balance: 0,
                name: fullname,
                ownerId: user?.id,
                description: '',
            },
        });

        await prisma.team.create({
            data: {
                name: username,
                ownerId: user.id,
                default: true,
                memberIds: [user.id],
                workspaceId: workspace?.id,
            },
        });

        return user;
    },
});

const AddMemberInputType = inputObjectType({
    name: 'AddMemberInputType',
    definition(t) {
        t.string('email');
        t.string('password');
        t.nullable.string('fullname');
    },
});

export const AddMember = mutationField('addMember', {
    type: nullable('User'),
    args: { input: arg({ type: AddMemberInputType }) },
    async resolve(
        _,
        { input: { email, password, fullname } },
        { prisma, workspace, team }
    ) {
        try {
            const memberExist = await prisma.user.findFirst({
                where: {
                    OR: [
                        {
                            email,
                        },
                    ],
                },
            });

            if (memberExist) {
                throw new Error(AUTH_ERROR.USER_EXIST_USERNAME);
            }

            const passwordHash = await generalPasswordHash(password);

            let newMember = await prisma.user.create({
                data: {
                    email,
                    password: passwordHash,
                    fullname,
                    workspaceId: workspace?.id,
                    role: Role.Staff,
                },
            });

            if (!newMember) {
                throw new Error(AUTH_ERROR.USER_INPUT_FAILED);
            }

            await prisma.team.update({
                where: { id: team?.id },
                data: {
                    memberIds: {
                        push: newMember.id,
                    },
                },
            });

            return newMember;
        } catch (error) {
            console.log(error);
        }
    },
});

export const DeleteMember = mutationField('deleteMember', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.isOwner(context),
    args: { memberId: nonNull(idArg()) },
    async resolve(_, { memberId }, { prisma }) {
        try {
            const memberDelete = await prisma.user.delete({
                where: { id: memberId },
            });

            if (memberDelete) {
                return true;
            }
            return false;
        } catch (error) {
            return false;
        }
    },
});

const DataUpdateUserInputType = inputObjectType({
    name: 'DataUpdateUserInputType',
    definition(t) {
        t.nullable.string('fullname');
        t.nullable.string('phoneNumber');
    },
});

const UpdateUserInputType = inputObjectType({
    name: 'UpdateUserInputType',
    definition(t) {
        t.field({
            name: 'data',
            type: DataUpdateUserInputType,
        });
    },
});

export const UpdateUserMutation = mutationField('updateUser', {
    type: nullable('User'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: UpdateUserInputType }) },
    resolve(_, { input: { data } }, { prisma, user }) {
        return prisma.user.update({
            where: {
                id: user.id,
            },
            data,
        });
    },
});

const ChangeEmailUserInputType = inputObjectType({
    name: 'ChangeEmailUserInputType',
    definition(t) {
        t.string('email');
        t.string('newEmail');
    },
});

export const ChangeEmailUserMutation = mutationField('changeEmail', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: ChangeEmailUserInputType }) },
    async resolve(_, { input: { email, newEmail } }, { prisma, user }) {
        const userExist = await prisma.user.findFirst({
            where: {
                email,
                id: user.id,
            },
        });

        if (!userExist) {
            return false;
        }

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                email: newEmail,
            },
        });

        return true;
    },
});

const ChangePasswordUserInputType = inputObjectType({
    name: 'ChangePasswordUserInputType',
    definition(t) {
        t.string('password');
        t.string('newPassword');
        t.string('email');
    },
});

export const ChangePasswordUserMutation = mutationField('changePassword', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: ChangePasswordUserInputType }) },
    async resolve(
        _,
        { input: { password, newPassword, email } },
        { prisma, user }
    ) {
        const userExist = await prisma.user.findFirst({
            where: {
                email,
                id: user.id,
            },
        });

        if (!userExist) {
            return false;
        }

        const isValidPassword = await checkPassword({
            password,
            passwordHash: userExist.password,
        });

        if (!isValidPassword) {
            return false;
        }

        const newPasswordHash = await generalPasswordHash(newPassword);

        await prisma.user.update({
            where: {
                id: user.id,
            },
            data: {
                password: newPasswordHash,
            },
        });

        return true;
    },
});

export const ChangeDefaultProjectUser = mutationField(
    'changeDefaultProjectUser',
    {
        type: nullable('Project'),
        args: { projectId: nonNull(idArg()) },
        async resolve(_, { projectId }, { prisma, user, team }) {
            const project = await prisma.project.findFirst({
                where: { id: projectId },
            });

            if (!project) {
                throw new Error(PROJECT_ERROR.PROJECT_NOT_FOUND);
            }

            if (project.teamId !== team.id) {
                throw new Error(PROJECT_ERROR.PROJECT_NOT_EXIST_TEAM);
            }

            return await prisma.user.update({
                where: { id: user.id },
                data: { defaultProjectId: projectId },
            });
        },
    }
);
