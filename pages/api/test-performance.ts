import { NextApiRequest, NextApiResponse } from 'next';
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from '@lib/session';
import prisma from '@lib/prisma';
import { getCorsMiddleware } from '@lib/cors';

interface TestPerformanceRequest extends NextApiRequest {
    session: {
        userId?: string;
        save: () => Promise<void>;
        destroy: () => Promise<void>;
    };
}

async function handler(req: TestPerformanceRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const startTime = Date.now();
    const performanceMetrics: any = {
        startTime: new Date().toISOString(),
        tests: {}
    };

    try {
        // Test 1: Database connection speed
        const dbStart = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        const dbEnd = Date.now();
        performanceMetrics.tests.database = {
            duration: dbEnd - dbStart,
            status: 'success'
        };

        // Test 2: Session handling speed
        const sessionStart = Date.now();
        const sessionUserId = req.session?.userId;
        const sessionEnd = Date.now();
        performanceMetrics.tests.session = {
            duration: sessionEnd - sessionStart,
            hasSession: !!sessionUserId,
            status: 'success'
        };

        // Test 3: User query speed (if session exists)
        if (sessionUserId) {
            const userQueryStart = Date.now();
            const user = await prisma.user.findUnique({
                where: { id: sessionUserId },
                select: {
                    id: true,
                    username: true,
                    email: true,
                    fullname: true,
                    workspace: {
                        select: {
                            id: true,
                            workspacePackage: {
                                select: {
                                    id: true,
                                    timeUseGpt4: true,
                                    packageItem: {
                                        select: {
                                            packageParent: {
                                                select: {
                                                    type: true
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            const userQueryEnd = Date.now();
            performanceMetrics.tests.userQuery = {
                duration: userQueryEnd - userQueryStart,
                userFound: !!user,
                status: 'success'
            };
        }

        // Test 4: Environment variables check
        const envStart = Date.now();
        const envCheck = {
            DATABASE_URL: !!process.env.DATABASE_URL,
            SECRET_COOKIE_PASSWORD: !!process.env.SECRET_COOKIE_PASSWORD,
            SECRET: !!process.env.SECRET,
            NEXTAUTH_URL: !!process.env.NEXTAUTH_URL,
            NODE_ENV: process.env.NODE_ENV,
            FB_APP_ID: !!process.env.FB_APP_ID,
            FB_APP_SECRET: !!process.env.FB_APP_SECRET
        };
        const envEnd = Date.now();
        performanceMetrics.tests.environment = {
            duration: envEnd - envStart,
            variables: envCheck,
            status: 'success'
        };

        // Test 5: GraphQL schema compilation (simulate)
        const graphqlStart = Date.now();
        // Simulate GraphQL operation time
        await new Promise(resolve => setTimeout(resolve, 10));
        const graphqlEnd = Date.now();
        performanceMetrics.tests.graphql = {
            duration: graphqlEnd - graphqlStart,
            status: 'success'
        };

        const totalTime = Date.now() - startTime;
        performanceMetrics.totalDuration = totalTime;
        performanceMetrics.endTime = new Date().toISOString();

        // Performance analysis
        const analysis = {
            overall: totalTime < 1000 ? 'good' : totalTime < 3000 ? 'moderate' : 'slow',
            bottlenecks: []
        };

        if (performanceMetrics.tests.database.duration > 500) {
            analysis.bottlenecks.push('Database connection is slow');
        }
        if (performanceMetrics.tests.userQuery?.duration > 300) {
            analysis.bottlenecks.push('User query is slow');
        }
        if (performanceMetrics.tests.session.duration > 100) {
            analysis.bottlenecks.push('Session handling is slow');
        }

        performanceMetrics.analysis = analysis;

        return res.status(200).json({
            success: true,
            message: 'Performance test completed',
            data: performanceMetrics
        });

    } catch (error) {
        const totalTime = Date.now() - startTime;
        console.error('Performance test error:', error);
        return res.status(500).json({
            success: false,
            error: error.message,
            duration: totalTime,
            timestamp: new Date().toISOString(),
        });
    }
}

export default withIronSessionApiRoute(getCorsMiddleware()(handler), sessionOptions);