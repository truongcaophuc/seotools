import { storageService } from '@lib/storage';
import { MINIO_BUCKET_NAME } from '@constants/aws';
import { replicate } from '@lib/replicate';
import { middleware } from '@share/graphql/middleware';
import { get } from 'lodash';
import {
    arg,
    idArg,
    inputObjectType,
    mutationField,
    nonNull,
    nullable,
    stringArg,
} from 'nexus';

const UpdateImageInputType = inputObjectType({
    name: 'UpdateImageInputType',
    definition(t) {
        t.id('id');
        t.nullable.string('name');
        t.nullable.string('description');
    },
});

export const UpdateImage = mutationField('updateImage', {
    type: nullable('Image'),
    args: { input: arg({ type: UpdateImageInputType }) },
    async resolve(_, { input: { id, name, description } }, { prisma }) {
        return prisma.image.update({
            where: { id },
            data: {
                name,
                description,
            },
        });
    },
});

export const DeleteImage = mutationField('deleteImage', {
    type: 'Boolean',
    args: { id: stringArg() },
    async resolve(_, { id }, { prisma }) {
        await prisma.image.update({
            where: { id },
            data: {
                isDelete: true,
            },
        });

        return true;
    },
});

const AddFolderImageInputType = inputObjectType({
    name: 'AddFolderImageInputType',
    definition(t) {
        t.nonNull.string('name');
        t.nullable.field({
            type: 'TypeFile',
            name: 'type',
        });
    },
});

export const AddFolderImage = mutationField('addFolderImage', {
    type: nullable('FolderImage'),
    authorize: (_, __, ctx) => middleware.isOwner(ctx),
    args: { input: arg({ type: AddFolderImageInputType }) },
    resolve(_, { input: { name, type = 'Image' } }, { prisma, project }) {
        if (!project) return null;

        return prisma.folderImage.create({
            data: {
                name,
                type,
                projectId: project?.id,
                workspaceId: project?.workspaceId,
            },
        });
    },
});

export const DeleteFolderImage = mutationField('deleteFolderImage', {
    type: 'Boolean',
    authorize: (_, __, ctx) => middleware.isOwner(ctx),
    args: { id: nonNull(idArg()) },
    async resolve(_, { id }, { prisma }) {
        await prisma.folderImage.delete({
            where: { id },
        });

        return true;
    },
});

const UpdateFolderImageInputType = inputObjectType({
    name: 'UpdateFolderImageInputType',
    definition(t) {
        t.id('id');
        t.nullable.string('name');
        t.nullable.string('description');
    },
});

export const UpdateFolderImage = mutationField('updateFolderImage', {
    type: nullable('FolderImage'),
    args: { input: arg({ type: UpdateFolderImageInputType }) },
    async resolve(_, { input: { id, name, description } }, { prisma }) {
        // Note: This seems to be updating metadata only, not uploading a new file
        // If you need to upload a file here, you would need the file buffer
        // await storageService.uploadFile(name, buffer, contentType);
        return await prisma.folderImage.update({
            where: { id },
            data: {
                name,
                description,
            },
        });
    },
});

export const GenerateImageWithReplicate = mutationField(
    'generateImageWithReplicate',
    {
        type: 'String',
        args: { prompt: stringArg() },
        async resolve(_, { prompt }) {
            const model =
                'stability-ai/stable-diffusion:db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf';

            const output = await replicate.run(model, {
                input: {
                    prompt,
                },
            });
            return get(output, '[0]');
        },
    }
);
