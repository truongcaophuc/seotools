import { Prisma } from '@prisma/client';
import { middleware } from '@share/graphql/middleware';
import {
    arg,
    booleanArg,
    inputObjectType,
    list,
    nonNull,
    nullable,
    objectType,
    queryField,
    stringArg,
} from 'nexus';

const DocumentsInputType = inputObjectType({
    name: 'DocumentsInputType',
    definition(t) {
        t.nullable.id('projectId');
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.string('search');
    },
});

const DocumentsResponseType = objectType({
    name: 'DocumentsResponseType',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Document'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

export const DocumentsQuery = queryField('documents', {
    type: DocumentsResponseType,
    authorize: (_, __, context) => middleware.auth(context),
    args: { input: arg({ type: DocumentsInputType }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, search, projectId } },
        { prisma, project }
    ) {
        let where: Prisma.DocumentWhereInput = {
            isDraft: false,
        };

        const projectIdInput = projectId || project.id;

        if (!projectIdInput)
            return {
                data: [],
                pagination: {
                    page,
                    perPage,
                    total: 0,
                },
            };

        where.projectId = projectIdInput;

        if (search) {
            where.title = {
                contains: search,
            };
        }

        const data = await prisma.document.findMany({
            skip: perPage * (page - 1),
            take: perPage,
            where,
        });

        const total = await prisma.document.count({
            where,
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

export const DocumentQuery = queryField('document', {
    type: nullable('Document'),
    authorize: (_, __, ctx) => middleware.auth(ctx),
    args: { id: nonNull(stringArg()), isDraft: nullable(booleanArg()) },
    async resolve(_, { id, isDraft = true }, { prisma }) {
        const document = await prisma.document.findFirst({
            where: { id },
        });

        if (!isDraft) {
            return document;
        }

        let draftDocument = await prisma.document.findFirst({
            where: {
                parentId: id,
            },
        });

        if (!draftDocument) {
            return document;
        }

        draftDocument.id = id;
        return draftDocument;
    },
});
