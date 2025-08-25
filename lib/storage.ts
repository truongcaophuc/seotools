import { minioClient } from './minio';
import { MINIO_BUCKET_NAME } from '../constants/aws';
import { Readable } from 'stream';

// Storage interface to abstract S3 and MinIO operations
export class StorageService {
    private bucketName: string;

    constructor() {
        this.bucketName = MINIO_BUCKET_NAME;
        this.initializeBucket();
    }

    private async initializeBucket() {
        try {
            const bucketExists = await minioClient.bucketExists(this.bucketName);
            if (!bucketExists) {
                await minioClient.makeBucket(this.bucketName, 'us-east-1');
                console.log(`Bucket '${this.bucketName}' created successfully.`);
            }
        } catch (error) {
            console.error('Error initializing bucket:', error);
        }
    }

    async uploadFile(key: string, buffer: Buffer, contentType?: string): Promise<void> {
        try {
            const metaData = contentType ? { 'Content-Type': contentType } : {};
            await minioClient.putObject(this.bucketName, key, buffer, buffer.length, metaData);
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    }

    async deleteFile(key: string): Promise<void> {
        try {
            await minioClient.removeObject(this.bucketName, key);
        } catch (error) {
            console.error('Error deleting file:', error);
            throw error;
        }
    }

    async getFileUrl(key: string, expiry: number = 24 * 60 * 60): Promise<string> {
        try {
            return await minioClient.presignedGetObject(this.bucketName, key, expiry);
        } catch (error) {
            console.error('Error getting file URL:', error);
            throw error;
        }
    }

    async listObjects(prefix?: string): Promise<any[]> {
        try {
            const objects: any[] = [];
            const stream = minioClient.listObjects(this.bucketName, prefix, true);
            
            return new Promise((resolve, reject) => {
                stream.on('data', (obj) => objects.push(obj));
                stream.on('error', reject);
                stream.on('end', () => resolve(objects));
            });
        } catch (error) {
            console.error('Error listing objects:', error);
            throw error;
        }
    }

    async getBucketSize(): Promise<number> {
        try {
            const objects = await this.listObjects();
            return objects.reduce((total, obj) => total + (obj.size || 0), 0);
        } catch (error) {
            console.error('Error getting bucket size:', error);
            return 0;
        }
    }

    getBucketName(): string {
        return this.bucketName;
    }
}

// Export singleton instance
export const storageService = new StorageService();