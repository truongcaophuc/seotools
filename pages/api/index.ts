import { sessionOptions } from '@lib/session';
import { ApolloServer } from 'apollo-server-micro';
import { withIronSessionApiRoute } from 'iron-session/next';
import { getCorsMiddleware } from '@lib/cors';
import { NextApiHandler } from 'next';
import { schema } from '@share/graphql/schema';
import { InMemoryLRUCache } from '@apollo/utils.keyvaluecache';
import { createContext } from '@share/graphql/context';

export const config = {
    api: {
        bodyParser: false,
    },
};

let apolloServerHandler: NextApiHandler;
let apolloServer: ApolloServer;

// Pre-initialize Apollo Server for better performance
async function getApolloServerHandler() {
    if (!apolloServer) {
        apolloServer = new ApolloServer({
            schema,
            context: createContext,
            cache: new InMemoryLRUCache({
                // Set cache size limit for better memory management
                maxSize: Math.pow(2, 20) * 100, // 100MB
                ttl: 300_000, // 5 minutes
            }),
            // Disable introspection in production for better performance
            introspection: process.env.NODE_ENV !== 'production',
            // Enable query caching
            persistedQueries: {
                cache: new InMemoryLRUCache({
                    maxSize: Math.pow(2, 20) * 10, // 10MB
                    ttl: 900_000, // 15 minutes
                }),
            },
        });
    }

    if (!apolloServerHandler) {
        await apolloServer.start();

        apolloServerHandler = apolloServer.createHandler({
            path: '/api',
        });
    }

    return apolloServerHandler;
}

const handler: NextApiHandler = async (req, res) => {
    const apolloServerHandler = await getApolloServerHandler();

    if (req.method === 'OPTIONS') {
        res.end();
        return;
    }

    return apolloServerHandler(req, res);
};

export default withIronSessionApiRoute(getCorsMiddleware()(handler), sessionOptions);
