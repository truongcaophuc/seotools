import { encode } from 'gpt-3-encoder';

export function getTotalTokenDoc(content: string) {
    const encoded = encode(content);
    const totalToken = encoded.length;

    return totalToken;
}
