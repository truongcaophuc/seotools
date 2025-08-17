import { middleware } from '@share/graphql/middleware';
import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
} from 'nexus';

const UpdateContentInputType = inputObjectType({
    name: 'UpdateContentInputType',
    definition(t) {
        t.nullable.id('id');
        t.id('serviceId');
        t.string('content');
        t.string('title');
        t.nullable.string('link');
    },
});

export const UpdateContentMutation = mutationField('updateContent', {
    type: nullable('Content'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: UpdateContentInputType }) },
    resolve(
        _,
        { input: { id, content, title, serviceId, link } },
        { prisma, user, project, workspace }
    ) {
        if (!id) {
            return prisma.content.create({
                data: {
                    title,
                    content,
                    serviceId,
                    link,
                    projectId: project?.id,
                    workspaceId: workspace?.id,
                    createdById: user?.id,
                },
            });
        }

        return prisma.content.update({
            where: { id },
            data: {
                title,
                content,
                link,
            },
        });
    },
});

export const DeleteContentMutation = mutationField('deleteContent', {
    type: 'Boolean',
    authorize: (_, __, ctx) => middleware.auth(ctx),
    args: { id: nonNull(idArg()) },
    async resolve(_, { id }, { prisma, user }) {
        if (user.role === 'User') {
            await prisma.content.delete({
                where: { id },
            });
            return true;
        }

        const content = await prisma.content.findFirst({
            where: { id },
        });

        if (content?.createdById === user?.id) {
            await prisma.content.delete({
                where: { id },
            });

            return true;
        }

        return false;
    },
});
