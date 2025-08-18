import { ListObjectsV2Command } from '@aws-sdk/client-s3';
import { AWS_BUCKET_NAME } from '@constants/aws';
import { s3Client } from '@lib/s3';
import moment from 'moment';
import { nullable, objectType } from 'nexus';

export const WorkspaceSchema = objectType({
    name: 'Workspace',
    definition(t) {
        t.id('id');
        t.id('ownerId');
        t.field({
            name: 'owner',
            type: 'User',
        });
        t.string('name');
        t.nullable.boolean('isTrial');
        t.nullable.date('expiredAt');
        t.nullable.field('timeTrial', {
            type: nullable('Int'),
            async resolve(root, __, { setting, prisma, workspace }) {
                if (!root.isTrial) return null;
                const createdAt = moment(root.createdAt).valueOf();
                const now = Date.now();
                const time = (now - createdAt) / (1000 * 60 * 60 * 24);

                // check timeout berfore 23/03/2023
                const date2303 = moment(
                    '23:59 23/03/2023',
                    'HH:mm DD/MM/YYYY'
                ).valueOf();

                const isBeforeDate2303 = createdAt < date2303;

                //TODO: fix in feature pricing

                if (isBeforeDate2303) {
                    // if (time > 15) {
                    //     await prisma.workspace.update({
                    //         where: { id: workspace?.id },
                    //         data: {
                    //             isTrial: false,
                    //         },
                    //     });

                    //     return 0;
                    // }

                    return Math.round(15 - time);
                }

                if (!root.expiredAt) {
                    // if (time > setting?.timeTrial) {
                    //     // await prisma.workspace.update({
                    //     //     where: { id: workspace?.id },
                    //     //     data: {
                    //     //         isTrial: false,
                    //     //     },
                    //     // });
                    //
                    //     return 0;
                    // }

                    const trialTime = setting?.timeTrial || 30; // Default 30 days if setting is null
                    return Math.round(trialTime - time);
                }

                const timeExpired = moment(root.expiredAt).valueOf() - now;

                if (timeExpired < 0) {
                    // await prisma.workspace.update({
                    //     where: { id: workspace?.id },
                    //     data: {
                    //         isTrial: false,
                    //     },
                    // });

                    return 0;
                }

                return Math.round(timeExpired / (1000 * 60 * 60 * 24));
            },
        });
        t.nullable.string('bucket');
                t.nullable.field('bucketSize', {
            type: 'Int',
            async resolve(root) {
                let bucketSize = 0;

                if (!root.bucket) return bucketSize;

                try {
                    const bucketParams = {
                        Bucket: AWS_BUCKET_NAME,
                        Prefix: root.bucket,
                        MaxKeys: 1000, // Limit number of objects to prevent timeout
                    };

                    // Add timeout wrapper
                    const timeoutPromise = new Promise((_, reject) => {
                        setTimeout(() => reject(new Error('S3 request timeout')), 4000);
                    });

                    const s3Promise = s3Client.send(
                        new ListObjectsV2Command(bucketParams)
                    );

                    const responseData = await Promise.race([s3Promise, timeoutPromise]) as any;

                    if (!responseData?.Contents) {
                        return bucketSize;
                    }

                    bucketSize = responseData.Contents.reduce(
                        (value: number, item: any) => value + (item.Size || 0),
                        0
                    );

                    return bucketSize;
                } catch (error) {
                    console.error('S3 bucketSize error:', error.message);
                    // Return null instead of throwing error to prevent login failure
                    return null;
                }
            },
        });
        t.field('isOwner', {
            type: 'Boolean',
            resolve(root, __, { user }) {
                return root.ownerId === user?.id;
            },
        });
        t.nullable.string('description');
        t.float('balance');
        t.nullable.field('workspacePackage', {
            type: 'WorkspacePackage',
            async resolve(root, {}, { prisma }) {
                const workspacePackage =
                    await prisma.workspacePackage.findFirst({
                        where: { workspaceId: root.id },
                    });

                const timeNow = moment().valueOf();
                const timeUseWord =
                    moment(workspacePackage?.startDateWord).valueOf() +
                    30 * 1000 * 60 * 60 * 24;

                if (timeNow > timeUseWord) {
                    console.log(1);
                    const packageItem = await prisma.packageItem.findFirst({
                        where: { id: workspacePackage.packageItemId },
                    });

                    return await prisma.workspacePackage.update({
                        where: { id: workspacePackage.id },
                        data: {
                            startDateWord: new Date(timeUseWord).toISOString(),
                            numberWord: packageItem?.numberWord,
                        },
                    });
                }

                return workspacePackage;
            },
        });
        t.date('createdAt');
    },
});

export const WorkspacePackage = objectType({
    name: 'WorkspacePackage',
    definition(t) {
        t.id('id');
        t.id('packageItemId');
        t.field('packageItem', {
            type: 'PackageItem',
            resolve(root, _, { prisma }) {
                return prisma.packageItem.findFirst({
                    where: {
                        id: root.packageItemId,
                    },
                });
            },
        });
        t.nullable.int('timeUseGpt4');
        t.boolean('isActive');
        t.date('startDateWord');
        t.int('numberWord');
        t.int('time');
        t.int('freeTime');
        t.date('createdAt');
    },
});
