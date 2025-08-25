import { storageService } from '@lib/storage';
import { MINIO_BUCKET_NAME } from '@constants/aws';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import prisma from '@lib/prisma';
import { v4 as uuidv4 } from 'uuid';

import { withIronSessionApiRoute } from 'iron-session/next';
import { getCorsMiddleware } from '@lib/cors';
import { sessionOptions } from '@lib/session';
import pick from 'lodash/pick';
import { get } from 'lodash';

export const config = {
    api: {
        bodyParser: false,
    },
};

async function deleteFile(key: string) {
    return await storageService.deleteFile(key);
}

async function handler(req: NextApiRequest, res: NextApiResponse) {
    try {
        const { method } = req;

        if (!req?.session?.userId) {
            res.status(200).json({ status: false });
            return;
        }

        if (method === 'POST') {
            await new Promise((_resolve, reject) => {
                const form = formidable({ multiples: true });

                form.parse(req, async (err: Error, fields: any, file: any) => {
                    if (err) return reject(err);

                    if (file.files) {
                        let buffer = fs.readFileSync(file.files.filepath);

                        const originalFilename = file.files?.originalFilename;
                        
                        // Lấy extension từ tên file gốc
                        const fileExtension = originalFilename?.split('.').pop() || 'png';
                        
                        // Tạo tên file mới sử dụng UUID
                        const nameFile = `${uuidv4()}.${fileExtension}`;

                        const Key = `${fields.bucket}/${nameFile}`;

                        // Upload to MinIO
                        await storageService.uploadFile(Key, buffer, file.files.mimetype);

                        const image = await prisma.image.create({
                            data: {
                                ...pick(fields, ['projectId', 'folderId']),
                                type: get(fields, 'typeFile'),
                                url: nameFile,
                                uploadById: req?.session?.userId,
                            },
                        });

                        res.status(200).json({
                            status: true,
                            data: image,
                        });
                    }
                });

                return;
            });

            res.status(200).json({ status: true });
        }

        if (method === 'PUT') {
            await new Promise((_resolve, reject) => {
                const form = formidable({ multiples: true });

                console.log('PUT');

                form.parse(req, async (err, fields, file) => {
                    if (err) return reject(err);

                    console.log({ fields });

                    if (file.files) {
                        const originalFilename = file.files?.originalFilename;
                        
                        // Lấy extension từ tên file gốc
                        const fileExtension = originalFilename?.split('.').pop() || 'png';
                        
                        // Tạo tên file mới sử dụng UUID
                        const Key = `${uuidv4()}.${fileExtension}`;

                        console.log({ Key });

                        await deleteFile(Key);

                        // Upload new file to MinIO
                        let buffer = fs.readFileSync(file.files.filepath);
                        await storageService.uploadFile(Key, buffer, file.files.mimetype);

                        console.log('File updated successfully in MinIO');

                        res.status(200).json({
                            status: true,
                            // data: image,
                        });
                    }
                });

                return;
            });
            res.status(200).json({
                status: true,
            });
        }

        if (method === 'DELETE') {
            console.log(req);
            const { imageId, imageKey } = req.query;

            await deleteFile(imageKey.toString());

            await prisma.image.delete({
                where: { id: imageId.toString() },
            });

            res.status(200).json({
                status: true,
            });
        }
    } catch (error) {
        console.log({ error });
    }
}

export default withIronSessionApiRoute(getCorsMiddleware()(handler), sessionOptions);
