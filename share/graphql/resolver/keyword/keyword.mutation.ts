import { arg, inputObjectType, mutationField, nonNull, stringArg } from 'nexus';

const KeywordDataInputType = inputObjectType({
    name: 'KeywordDataInputType',
    definition(t) {
        t.nonNull.string('value');
        t.nullable.id('parentId');
    },
});

export const AddKeywordMutation = mutationField('addKeyword', {
    type: 'Keyword',
    args: { input: arg({ type: KeywordDataInputType }) },
    resolve(_, { input }, { prisma, project, workspace }) {
        return prisma.keyword.create({
            data: {
                ...input,
                projectId: project?.id,
                isMain: !input.parentId,
                workspaceId: workspace?.id,
            },
        });
    },
});

const UpdateKeywordDataInputType = inputObjectType({
    name: 'UpdateKeywordDataInputType',
    definition(t) {
        t.string('value');
    },
});

const UpdateKeywordInputType = inputObjectType({
    name: 'UpdateKeywordInputType',
    definition(t) {
        t.nonNull.id('id');
        t.field({
            name: 'data',
            type: UpdateKeywordDataInputType,
        });
    },
});

export const UpdateKeywordMutation = mutationField('updateKeyword', {
    type: 'Keyword',
    args: { input: arg({ type: UpdateKeywordInputType }) },
    resolve(_, { input: { id, data } }, { prisma }) {
        return prisma.keyword.update({
            where: { id },
            data,
        });
    },
});

export const DeleteKeywordMutation = mutationField('deleteKeyword', {
    type: 'Boolean',
    args: { id: nonNull(stringArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.keyword.deleteMany({
            where: { parentId: id },
        });

        await prisma.keyword.delete({
            where: { id },
        });
        return true;
    },
});
