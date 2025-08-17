import { ChannelType, Content, Document as DocumentData } from '@prisma/client';
import { CONTENT_ERROR } from '@share/error/content.error';
import { middleware } from '@share/graphql/middleware';
import axios from 'axios';
import { getToken } from 'next-auth/jwt';
import {
    arg,
    enumType,
    idArg,
    inputObjectType,
    list,
    mutationField,
    nullable,
} from 'nexus';

export const ConnectFacebookPage = mutationField('connectFacebookPage', {
    type: 'Boolean',
    async resolve(_, __, { prisma, req, workspace }) {
        const token = await getToken({ req, secret: process.env.SECRET });
        const url = `https://graph.facebook.com/${token?.sub}/accounts?fields=name,access_token&access_token=${token.access_token}`;

        const fbPages = await axios.get(url);

        const deleteChannelFacebook = prisma.pageChannel.deleteMany({
            where: {
                workspaceId: workspace.id,
                type: ChannelType.Facebook,
            },
        });

        const createChannelFacebook = prisma.pageChannel.createMany({
            data: fbPages.data.data.map((item: any) => ({
                workspaceId: workspace.id,
                name: item.name,
                pageChannelId: item.id,
                type: ChannelType.Facebook,
                token: item.access_token,
                isActive: true,
            })),
        });

        await prisma.$transaction([
            deleteChannelFacebook,
            createChannelFacebook,
        ]);

        return true;
    },
});

const ContentTypeEnum = enumType({
    name: 'ContentTypeEnum',
    members: ['content', 'document'],
});

const SyncContentPageChannelInputType = inputObjectType({
    name: 'SyncContentPageChannelInputType',
    definition(t) {
        t.nonNull.id('contentId');
        t.nonNull.string('content');
        t.field({
            name: 'channelType',
            type: 'ChannelType',
        });
        t.field({
            name: 'pageIds',
            type: list('String'),
        });
        t.nullable.field({
            name: 'contentType',
            type: ContentTypeEnum,
        });
    },
});

export const SyncContentPageChannel = mutationField('syncContentPageChannel', {
    type: 'Boolean',
    args: { input: arg({ type: SyncContentPageChannelInputType }) },
    async resolve(
        _,
        {
            input: {
                contentId,
                content,
                channelType,
                pageIds,
                contentType = 'content',
            },
        },
        { prisma }
    ) {
        const getContent =
            contentType === 'document'
                ? prisma.document.findFirst({
                      where: { id: contentId },
                  })
                : prisma.content.findFirst({
                      where: { id: contentId },
                  });

        const getChannelPages = prisma.pageChannel.findMany({
            where: {
                id: {
                    in: pageIds,
                },
            },
        });

        const response = await prisma.$transaction([
            getContent,
            getChannelPages,
        ]);

        if (!response[0]) {
            throw new Error(CONTENT_ERROR.CONTENT_NOT_FOUND);
        }

        const contentRes = response[0];

        if (channelType === ChannelType.Facebook) {
            await Promise.all([
                response[1].map((item) => {
                    const link =
                        contentType === 'content'
                            ? (contentRes as Content).link
                            : undefined;

                    let url = `https://graph.facebook.com/${
                        item.pageChannelId
                    }/feed?message=${encodeURI(
                        content
                    )}&link=${link}&access_token=${item.token}`;

                    return setTimeout(() => axios.post(url), 10000);
                }),
            ]);
        }

        if (channelType === ChannelType.Wordpress) {
            await Promise.all([
                response[1].map((item) => {
                    const title = response[0].title;
                    const URL_WP = `${item?.url}/wp-json/wp/v2/posts`;

                    return setTimeout(
                        () =>
                            axios({
                                url: URL_WP,
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json',
                                    Authorization:
                                        'Basic ' +
                                        Buffer.from(
                                            `${item.username}:${item.password}`
                                        ).toString('base64'),
                                },
                                data: {
                                    title,
                                    content,
                                },
                            }),
                        10000
                    );
                }),
            ]);
        }

        return true;
    },
});

const UpdatePageChannelInputType = inputObjectType({
    name: 'UpdatePageChannelInputType',
    definition(t) {
        t.nullable.id('id');
        t.nullable.boolean('isActive');
        t.nullable.string('name');
        t.nullable.string('username');
        t.nullable.string('password');
        t.nullable.string('url');
        t.nullable.field({
            type: 'ChannelType',
            name: 'type',
        });
    },
});

export const UpdatePageChannel = mutationField('updatePageChannel', {
    type: nullable('PageChannel'),
    args: { input: arg({ type: UpdatePageChannelInputType }) },
    resolve(_, { input: { id, ...data } }, { prisma, workspace }) {
        if (!id) {
            console.log({ id });
            const { name, username, password, url, type } = data;

            return prisma.pageChannel.create({
                data: {
                    workspaceId: workspace?.id,
                    name,
                    username,
                    password,
                    url,
                    type,
                    isActive: true,
                },
            });
        }

        return prisma.pageChannel.update({
            where: {
                id,
            },
            data: {
                ...data,
            },
        });
    },
});

export const DeletePageChannel = mutationField('deletePageChannel', {
    type: 'Boolean',
    authorize: (_, __, ctx) => middleware.isOwner(ctx),
    args: { id: idArg() },
    async resolve(_, { id }, { prisma, workspace }) {
        const pageChannel = await prisma.pageChannel.findFirst({
            where: { id },
        });

        if (!pageChannel) {
            throw new Error('Channel not found');
        }

        if (pageChannel.workspaceId !== workspace.id) {
            throw new Error('NOT ALLOWED');
        }

        await prisma.pageChannel.delete({
            where: { id: pageChannel.id },
        });

        return true;
    },
});
