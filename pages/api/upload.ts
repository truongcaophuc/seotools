import { DeleteObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import { AWS_BUCKET_NAME } from '@constants/aws';
import { s3Client } from '@lib/s3';
import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import prisma from '@lib/prisma';

import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@lib/session';
import pick from 'lodash/pick';
import { get } from 'lodash';

export const config = {
    api: {
        bodyParser: false,
    },
};

function deleteFile(Key: string) {
    const bucketParams = { Bucket: AWS_BUCKET_NAME, Key };
    return s3Client.send(new DeleteObjectCommand(bucketParams));
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
                        const numberRandom = Math.ceil(
                            Math.random() * 10 ** 10
                        );

                        const nameFile = `${numberRandom}-${originalFilename}`;

                        const Key = `${fields.bucket}/${nameFile}`;

                        const params = {
                            Bucket: AWS_BUCKET_NAME, // The name of the bucket. For example, 'sample-bucket-101'.
                            //  Key: originalFilename, // The name of the object. For example, 'sample_upload.txt'.
                            Key,
                            ContentType: file.files.mimetype,
                            ContentDisposition: 'inline',
                            Body: buffer, // The content of the object. For example, 'Hello world!".
                        };

                        const data = new PutObjectCommand(params);
                        await s3Client.send(data);

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
                        const Key = originalFilename;

                        console.log({ Key });

                        const result = await deleteFile(Key);

                        console.log({ result });
                        //
                        let buffer = fs.readFileSync(file.files.filepath);

                        const params = {
                            Bucket: AWS_BUCKET_NAME, // The name of the bucket. For example, 'sample-bucket-101'.
                            //  Key: originalFilename, // The name of the object. For example, 'sample_upload.txt'.
                            Key,
                            Body: buffer, // The content of the object. For example, 'Hello world!".
                        };

                        const data = new PutObjectCommand(params);

                        const result1 = await s3Client.send(data);

                        console.log({ result1 });

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

export default withIronSessionApiRoute(handler, sessionOptions);
