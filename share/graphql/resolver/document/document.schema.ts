import { nullable, objectType } from 'nexus';

export const DocumentSchema = objectType({
    name: 'Document',
    definition(t) {
        t.id('id');
        t.id('userId');
        t.id('projectId');
        t.field('project', {
            type: 'Project',
            resolve(root, _, { prisma }) {
                return prisma.project.findFirst({
                    where: { id: root.projectId },
                });
            },
        });
        t.nullable.id('keywordId');
        t.field('keyword', {
            type: nullable('Keyword'),
            resolve(root, _, { prisma }) {
                return prisma.keyword.findFirst({
                    where: { id: root.keywordId },
                    select: {
                        id: true,
                        value: true,
                    },
                });
            },
        });
        t.nullable.string('title');
        t.nullable.string('content');
        t.nullable.string('outline');
        t.nullable.string('url');
        t.nullable.string('slug');
        t.nullable.string('description');
        t.nullable.boolean('isDraft');
        t.nullable.id('createdById');
        t.field('createdBy', {
            type: nullable('User'),
            resolve(root, _, { prisma }) {
                if (!root.createdById) {
                    return null;
                }

                return prisma.user.findFirst({
                    where: { id: root.createdById },
                });
            },
        });
        t.nullable.id('parentId');
        t.field('draftId', {
            type: nullable('ID'),
            async resolve(root, _, { prisma }) {
                const documentDraft = await prisma.document.findFirst({
                    where: {
                        parentId: root.id,
                    },
                });

                return documentDraft?.id;
            },
        });
        t.field('hasDraft', {
            type: nullable('Boolean'),
            async resolve(root, _, { prisma }) {
                const total = await prisma.document.count({
                    where: {
                        parentId: root.id,
                    },
                });

                return total > 0;
            },
        });
        t.date('createdAt');
    },
});
