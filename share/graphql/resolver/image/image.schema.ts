import { enumType, nullable, objectType } from 'nexus';

const TypeFile = enumType({
    name: 'TypeFile',
    members: ['Image', 'Document'],
});

export const FolderImageSchema = objectType({
    name: 'FolderImage',
    definition(t) {
        t.id('id');
        t.id('projectId');
        t.nullable.boolean('isPublic');
        t.field('project', {
            type: nullable('Project'),
            resolve(root, _, { prisma }) {
                return prisma.project.findFirst({
                    where: {
                        id: root.projectId,
                    },
                });
            },
        });
        t.field('totalImage', {
            type: 'Int',
            resolve(root, _, { prisma }) {
                return prisma.image.count({
                    where: { folderId: root.id },
                });
            },
        });
        t.nullable.field({
            name: 'type',
            type: TypeFile,
        });
        t.string('name');
        t.nullable.string('slug');
        t.nullable.string('description');
        t.date('createdAt');
    },
});

export const ImageSchema = objectType({
    name: 'Image',
    definition(t) {
        t.id('id');
        t.nullable.string('name');
        t.nullable.string('description');
        t.nullable.field({
            name: 'type',
            type: TypeFile,
        });
        t.id('projectId');
        t.nullable.boolean('isPublic');
        t.field('project', {
            type: nullable('Project'),
            resolve(root, _, { prisma }) {
                return prisma.project.findFirst({
                    where: {
                        id: root.projectId,
                    },
                });
            },
        });
        t.id('folderId');
        t.field('folder', {
            type: nullable('FolderImage'),
            resolve(root, _, { prisma }) {
                if (!root.folderId) return null;
                return prisma.folderImage.findFirst({
                    where: {
                        id: root.folderId,
                    },
                });
            },
        });
        t.string('url');
        t.field('src', {
            type: 'String',
            resolve(root, _, { workspace }) {
                return `${workspace.bucket}/${root.url}`;
            },
        });
        t.nullable.boolean('isEmbedded');
        t.date('createdAt');
    },
});
