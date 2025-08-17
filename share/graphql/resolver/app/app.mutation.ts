import { AUTH_ERROR } from '@share/error/auth.error';
import { checkPassword } from '@share/helps/password';
import { slugify } from '@share/helps/slugify';
import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
} from 'nexus';

const LoginAppInput = inputObjectType({
    name: 'LoginAppInput',
    definition(t) {
        t.string('username');
        t.string('password');
    },
});

export const LoginApp = mutationField('loginApp', {
    type: nullable('User'),
    args: { input: arg({ type: LoginAppInput }) },
    async resolve(_, { input: { username, password } }, { prisma, req }) {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    {
                        email: username,
                    },
                    {
                        username,
                    },
                ],
            },
        });

        if (!user) {
            throw new Error(AUTH_ERROR.USER_NOT_FOUND);
        }

        const isValidPassword = await checkPassword({
            password,
            passwordHash: user.password,
        });

        if (!isValidPassword) {
            throw new Error(AUTH_ERROR.USER_NOT_FOUND);
        }

        return user;
    },
});

const AddPostOfUserAppInput = inputObjectType({
    name: 'AddPostOfUserAppInput',
    definition(t) {
        t.nullable.string('content');
        t.nullable.string('outline');
        t.string('title');
        t.nullable.string('url');
        t.nullable.string('slug');
        t.nullable.string('description');
        t.nonNull.id('keywordId');
        t.nullable.boolean('isDraft');
        t.nonNull.id('userId');
        t.nonNull.id('projectId');
        t.nonNull.id('workspaceId');
    },
});

export const AddPostOfUserApp = mutationField('addPostOfUserApp', {
    type: nullable('Document'),
    args: { input: arg({ type: AddPostOfUserAppInput }) },
    resolve(_, { input }, { prisma }) {
        const slug = slugify(input.title);
        return prisma.document.create({
            data: {
                ...input,
                createdById: input.userId,
                url: 'example.com',
                slug,
            },
        });
    },
});

export const DeletePostOfUserApp = mutationField('deletePostOfUserApp', {
    type: 'Boolean',
    args: { postId: nonNull(idArg()), userId: nonNull(idArg()) },
    async resolve(_, { postId }, { prisma }) {
        await prisma.document.delete({
            where: { id: postId },
        });

        return true;
    },
});
