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

async function getApolloServerHandler() {
    const apolloServer = new ApolloServer({
        schema,
        context: createContext,
        cache: new InMemoryLRUCache(),
    });

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
