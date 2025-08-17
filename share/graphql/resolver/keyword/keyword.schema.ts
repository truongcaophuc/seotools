import { list, nullable, objectType } from 'nexus';

export const KeywordSchema = objectType({
    name: 'Keyword',
    definition(t) {
        t.id('id');
        t.id('projectId');
        t.nullable.string('value');
        t.nullable.string('description');
        t.nullable.id('parentId');
        t.field('parentKeyword', {
            type: nullable('Keyword'),
            resolve(root, _, { prisma }) {
                if (!root.parentId) return null;
                return prisma.keyword.findFirst({
                    where: { id: root.parentId },
                });
            },
        });
        t.field('subKeywords', {
            type: list('Keyword'),
            resolve(root, _, { prisma }) {
                return prisma.keyword.findMany({
                    where: {
                        parentId: root.id,
                    },
                });
            },
        });
        t.date('createdAt');
    },
});
