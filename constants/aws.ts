// AWS S3 Configuration (Legacy)
export const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
export const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
export const AWS_SECRET_ACCESS_KEY = process.env.AWS_SECRET_ACCESS_KEY;
export const AWS_REGION = 'ap-southeast-1';
export const AWS_URL_IMAGE = `https://seobox-hilab.s3.ap-southeast-1.amazonaws.com`;

// MinIO Configuration
export const MINIO_ENDPOINT = process.env.MINIO_ENDPOINT || 'localhost';
export const MINIO_PORT = parseInt(process.env.MINIO_PORT || '9000');
export const MINIO_USE_SSL = process.env.MINIO_USE_SSL === 'true';
export const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY || 'minioadmin';
export const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY || 'minioadmin';
export const MINIO_BUCKET_NAME = process.env.MINIO_BUCKET_NAME || 'seo-tools';
export const MINIO_URL_IMAGE = `http${MINIO_USE_SSL ? 's' : ''}://${MINIO_ENDPOINT}:${MINIO_PORT}/${MINIO_BUCKET_NAME}`;

export const SMTP_USERNAME = <string>process.env.SMTP_USERNAME;
export const SMTP_PASSWORD = process.env.SMTP_PASSWORD;
export const SMTP_ENDPOINT = <string>process.env.SMTP_ENDPOINT;
export const SMTP_PORT = <string>process.env.SMTP_PORT;
