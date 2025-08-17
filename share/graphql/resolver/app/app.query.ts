import {
    idArg,
    arg,
    inputObjectType,
    nullable,
    objectType,
    queryField,
    list,
    stringArg,
} from 'nexus';

export const UserInfoApp = queryField('userInfoApp', {
    type: nullable('User'),
    args: { userId: idArg() },
    resolve(_, { userId }, { prisma }) {
        return prisma.user.findFirst({
            where: { id: userId },
        });
    },
});

const ProjectOfUserAppResponse = objectType({
    name: 'ProjectOfUserAppResponse',
    definition(t) {
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
        t.field({
            name: 'data',
            type: list('Project'),
        });
    },
});

const ProjectOfUserAppInput = inputObjectType({
    name: 'ProjectOfUserAppInput',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nonNull.id('teamId');
    },
});

export const ProjectOfUserApp = queryField('projectOfUserApp', {
    type: ProjectOfUserAppResponse,
    args: { input: arg({ type: ProjectOfUserAppInput }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, teamId } },
        { prisma }
    ) {
        const data = await prisma.project.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where: {
                teamId,
            },
        });

        const total = await prisma.project.count({
            where: {
                teamId,
            },
        });
        return {
            data,
            pagination: {
                page,
                perPage,
                total,
            },
        };
    },
});

const PostOfUserAppResponse = objectType({
    name: 'PostOfUserAppResponse',
    definition(t) {
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
        t.field({
            name: 'data',
            type: list('Document'),
        });
    },
});

const PostOfProjectAppInput = inputObjectType({
    name: 'PostOfProjectAppInput',
    definition(t) {
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nonNull.id('workspaceId');
        t.nonNull.id('projectId');
    },
});

export const PostsOfUserApp = queryField('postsOfUserApp', {
    type: PostOfUserAppResponse,
    args: { input: arg({ type: PostOfProjectAppInput }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, workspaceId, projectId } },
        { prisma }
    ) {
        const data = await prisma.document.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            where: {
                workspaceId,
                projectId,
            },
        });

        const total = await prisma.document.count({
            where: {
                workspaceId,
                projectId,
            },
        });

        return { data, pagination: { page, perPage, total } };
    },
});

export const PostOfUserApp = queryField('postOfUserApp', {
    type: nullable('Document'),
    args: { postId: idArg() },
    resolve(_, { postId }, { prisma }) {
        return prisma.document.findFirst({
            where: { id: postId },
        });
    },
});

const KeywordsOfUserAppResponse = objectType({
    name: 'KeywordsOfUserAppResponse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Keyword'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const KeywordsOfUserAppInput = inputObjectType({
    name: 'KeywordsOfUserAppInput',
    definition(t) {
        t.id('projectId');
        t.nullable.int('page');
        t.nullable.int('perPage');
    },
});

export const KeywordsOfUserApp = queryField('keywordsOfUserApp', {
    type: KeywordsOfUserAppResponse,
    args: { input: arg({ type: KeywordsOfUserAppInput }) },
    async resolve(_, { input: { projectId, perPage, page } }, { prisma }) {
        const data = await prisma.keyword.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where: {
                projectId,
                isMain: true,
                isDelete: false,
            },
        });

        const total = await prisma.keyword.count({
            where: {
                projectId,
            },
        });
        return {
            data,
            pagination: {
                page,
                perPage,
                total,
            },
        };
    },
});
