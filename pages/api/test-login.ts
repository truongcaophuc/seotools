import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@lib/session';
import prisma from '@lib/prisma';
import { checkPassword } from '@share/helps/password';
import { setSessionUser } from '@share/helps/session';
import { getCorsMiddleware } from '@lib/cors';

interface TestLoginRequest extends NextApiRequest {
    session: {
        userId?: string;
        save: () => Promise<void>;
        destroy: () => Promise<void>;
    };
}

async function handler(req: TestLoginRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { username, password, testMode } = req.body;

    if (!username || !password) {
        return res.status(400).json({ 
            error: 'Username and password are required',
            received: { username: !!username, password: !!password }
        });
    }

    try {
        console.log('Testing login for username:', username);
        console.log('Test mode:', testMode);

        // Find user
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email: username },
                    { username: username }
                ]
            }
        });

        console.log('User found:', !!user);
        if (user) {
            console.log('User details:', {
                id: user.id,
                username: user.username,
                email: user.email,
                hasPassword: !!user.password
            });
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                error: 'USER_NOT_FOUND',
                message: 'User not found with provided username/email',
                debug: {
                    searchedFor: username,
                    timestamp: new Date().toISOString()
                }
            });
        }

        // Check password
        console.log('Checking password...');
        const isValidPassword = await checkPassword({
            password,
            passwordHash: user.password
        });

        console.log('Password valid:', isValidPassword);

        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                error: 'INVALID_PASSWORD',
                message: 'Invalid password',
                debug: {
                    userId: user.id,
                    timestamp: new Date().toISOString()
                }
            });
        }

        // Set session if not in test mode
        if (!testMode) {
            await setSessionUser(req, user.id);
            console.log('Session set for user:', user.id);
        }

        return res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email,
                    fullname: user.fullname
                },
                sessionSet: !testMode,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error('Test login error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            timestamp: new Date().toISOString()
        });
    }
}

export default withIronSessionApiRoute(getCorsMiddleware()(handler), sessionOptions);