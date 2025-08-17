import { SECRET_KEY } from '@constants/token';
import jwt from 'jsonwebtoken';

export function generateToken(value: { data: string }) {
    return jwt.sign(value, SECRET_KEY, { expiresIn: '7d' });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET_KEY);
}
