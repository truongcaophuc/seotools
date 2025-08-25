import { MINIO_URL_IMAGE } from '@constants/aws';

export function formatUrlImage(nameFile: string) {
    return `${MINIO_URL_IMAGE}/${nameFile}?${Date.now()}`;
}
