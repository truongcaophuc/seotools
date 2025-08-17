import { AWS_URL_IMAGE } from '@constants/aws';

export function formatUrlImage(nameFile: string) {
    return `${AWS_URL_IMAGE}/${nameFile}?${Date.now()}`;
}
