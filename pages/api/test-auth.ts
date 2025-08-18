import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@lib/session';
import prisma from '@lib/prisma';
import { getCorsMiddleware } from '@lib/cors';
import { Prisma } from '@prisma/client';

interface TestAuthRequest extends NextApiRequest {
    session: {
        userId?: string;
        save: () => Promise<void>;
        destroy: () => Promise<void>;
    };
}

async function handler(req: TestAuthRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        // Test database connection
        console.log('Testing database connection...');
        await prisma.$connect();
        console.log('Database connection successful');

        // Test session
        console.log('Testing session...');
        const sessionUserId = req.session?.userId;
        console.log('Current session userId:', sessionUserId);

        // Test user query if session exists
        let currentUser = null;
        if (sessionUserId) {
            currentUser = await prisma.user.findUnique({
                where: { id: sessionUserId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    fullname: true,
                    createdAt: true,
                }
            });
            console.log('Current user:', currentUser);
        }

        // Test environment variables
        const envCheck = {
            DATABASE_URL: !!process.env.DATABASE_URL,
            SECRET_COOKIE_PASSWORD: !!process.env.SECRET_COOKIE_PASSWORD,
            SECRET: !!process.env.SECRET,
            NEXTAUTH_URL: process.env.NEXTAUTH_URL,
            NODE_ENV: process.env.NODE_ENV,
        };

        console.log('Environment variables check:', envCheck);

        return res.status(200).json({
            success: true,
            message: 'Authentication system test completed',
            data: {
                database: 'Connected successfully',
                session: {
                    hasSession: !!sessionUserId,
                    userId: sessionUserId,
                    user: currentUser
                },
                environment: envCheck,
                timestamp: new Date().toISOString(),
            }
        });

    } catch (error) {
        console.error('Test auth error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            timestamp: new Date().toISOString(),
        });
    }
}

export default withIronSessionApiRoute(getCorsMiddleware()(handler), sessionOptions);