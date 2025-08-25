import * as Minio from 'minio';
import {
    MINIO_ACCESS_KEY,
    MINIO_SECRET_KEY,
    MINIO_ENDPOINT,
    MINIO_PORT,
    MINIO_USE_SSL,
} from '../constants';

// Create MinIO client
const minioClient = new Minio.Client({
    endPoint: MINIO_ENDPOINT,
    port: MINIO_PORT,
    useSSL: MINIO_USE_SSL,
    accessKey: MINIO_ACCESS_KEY,
    secretKey: MINIO_SECRET_KEY,
});

export { minioClient };