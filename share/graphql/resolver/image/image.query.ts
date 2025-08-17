import { Prisma } from '@prisma/client';
import {
    arg,
    inputObjectType,
    list,
    nullable,
    objectType,
    queryField,
    stringArg,
} from 'nexus';

const FolderImagesResponse = objectType({
    name: 'FolderImagesResponse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('FolderImage'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

const FolderImagesInputType = inputObjectType({
    name: 'FolderImagesInputType',
    definition(t) {
        t.nullable.id('projectId');
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.string('search');
        t.nullable.field({
            name: 'type',
            type: 'TypeFile',
        });
    },
});

export const FolderImagesQuery = queryField('folderImages', {
    type: FolderImagesResponse,
    args: { input: arg({ type: FolderImagesInputType }) },
    async resolve(
        _,
        { input: { page = 1, perPage = 15, search, type = 'Image' } },
        { prisma, project }
    ) {
        if (!project) {
            return {
                data: [],
                pagination: {
                    total: 0,
                    page,
                    perPage,
                },
            };
        }

        let where: Prisma.FolderImageWhereInput = {
            projectId: project.id,
        };

        if (type) {
            where.type = type;
        }

        if (search) {
            where.name = {
                contains: search,
            };
        }

        const data = await prisma.folderImage.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.folderImage.count({
            where,
        });

        return {
            data,
            pagination: {
                total,
                page,
                perPage,
            },
        };
    },
});

export const FolderImageQuery = queryField('folderImage', {
    type: nullable('FolderImage'),
    args: { id: stringArg() },
    resolve(_, { id }, { prisma }) {
        return prisma.folderImage.findFirst({
            where: { id },
        });
    },
});

const ImagesInputType = inputObjectType({
    name: 'ImagesInputType',
    definition(t) {
        t.nullable.id('projectId');
        t.nullable.id('folderId');
        t.nullable.int('page');
        t.nullable.int('perPage');
        t.nullable.string('search');
        t.nullable.field({
            name: 'type',
            type: 'TypeFile',
        });
    },
});

const ImagesResponse = objectType({
    name: 'ImagesResponse',
    definition(t) {
        t.field({
            name: 'data',
            type: list('Image'),
        });
        t.field({
            name: 'pagination',
            type: 'PaginationType',
        });
    },
});

export const ImagesQuery = queryField('images', {
    type: ImagesResponse,
    args: {
        input: arg({
            type: ImagesInputType,
        }),
    },
    async resolve(
        _,
        {
            input: {
                page = 1,
                perPage = 15,
                search,
                folderId,
                projectId,
                type = 'Image',
            },
        },
        { prisma, project }
    ) {
        let where: Prisma.ImageWhereInput = {
            // isDelete: false, // TODO: remove comment line
        };

        if (type) {
            where.type = type;
        }

        if (projectId) {
            where.projectId = projectId;
        } else {
            where.projectId = project?.id;
        }

        if (folderId) {
            where.folderId = folderId;
        }

        if (search) {
            where.name = {
                contains: search,
            };
        }

        console.log({ where, dasd: 1 });

        const data = await prisma.image.findMany({
            take: perPage,
            skip: perPage * (page - 1),
            where,
        });

        const total = await prisma.image.count({
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

export const Image = queryField('image', {
    type: nullable('Image'),
    args: { id: stringArg() },
    resolve(_, { id }, { prisma }) {
        return prisma.image.findFirst({
            where: { id },
        });
    },
});
