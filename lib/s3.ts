import { S3Client } from '@aws-sdk/client-s3';
import {
    AWS_ACCESS_KEY,
    AWS_REGION,
    AWS_SECRET_ACCESS_KEY,
} from '../constants';

// Create an Amazon S3 service client object with timeout configuration
const s3Client = new S3Client({
    region: AWS_REGION,
    credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
    },
    requestHandler: {
        requestTimeout: 5000, // 5 seconds timeout
        connectionTimeout: 3000, // 3 seconds connection timeout
    },
    maxAttempts: 2, // Reduce retry attempts
});

export { s3Client };
