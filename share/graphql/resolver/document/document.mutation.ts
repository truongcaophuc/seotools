import { middleware } from '@share/graphql/middleware';
import { slugify } from '@share/helps/slugify';
import {
    arg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
    stringArg,
} from 'nexus';

const DocumentDataInputType = inputObjectType({
    name: 'DocumentDataInputType',
    definition(t) {
        t.nullable.string('content');
        t.nullable.string('outline');
        t.string('title');
        t.nullable.string('url');
        t.nullable.string('slug');
        t.nullable.string('description');
        t.nonNull.id('keywordId');
        t.nullable.boolean('isDraft');
    },
});

export const CreateDocumentMutation = mutationField('createDocument', {
    type: nullable('Document'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: DocumentDataInputType }) },
    resolve(_, { input }, { prisma, user, project, workspace }) {
        const slug = slugify(input.title);
        return prisma.document.create({
            data: {
                ...input,
                url: 'example.com',
                slug,
                userId: user?.id,
                projectId: project?.id,
                workspaceId: workspace?.id,
                createdById: user?.id,
            },
        });
    },
});

const UpdateDocumentInputType = inputObjectType({
    name: 'UpdateDocumentInputType',
    definition(t) {
        t.id('id');
        t.field({
            name: 'data',
            type: DocumentDataInputType,
        });
    },
});

export const UpdateDocumentMutation = mutationField('updateDocument', {
    type: nullable('Document'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: UpdateDocumentInputType }) },
    async resolve(
        _,
        {
            input: {
                id,
                data: { isDraft, ...rest },
            },
        },
        { prisma }
    ) {
        const updateDocument = prisma.document.update({
            where: { id },
            data: {
                ...rest,
            },
        });

        const deleteDocumentDraft = prisma.document.deleteMany({
            where: {
                parentId: id,
                isDraft: true,
            },
        });
        await prisma.$transaction([updateDocument, deleteDocumentDraft]);
        return updateDocument;
    },
});

export const SaveDraftDocumentMutation = mutationField('saveDraftDocument', {
    type: nullable('Document'),
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: UpdateDocumentInputType }) },
    async resolve(
        _,
        { input: { id, data } },
        { prisma, user, workspace, project }
    ) {
        const draftDocument = await prisma.document.findFirst({
            where: {
                parentId: id,
                isDraft: true,
            },
        });

        if (!draftDocument) {
            return await prisma.document.create({
                data: {
                    ...data,
                    userId: user?.id,
                    projectId: project?.id,
                    workspaceId: workspace?.id,
                    createdById: user?.id,
                    isDraft: true,
                    parentId: id,
                },
            });
        }

        return await prisma.document.update({
            where: {
                id: draftDocument.id,
            },
            data,
        });
    },
});

export const DeleteDocumentMutation = mutationField('deleteDocument', {
    type: 'Boolean',
    authorize: (_, __, context) => middleware.auth(context),
    args: { id: nonNull(stringArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.document.delete({
            where: { id },
        });

        return true;
    },
});
