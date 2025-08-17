import { DateTimeResolver } from 'graphql-scalars';
import {
    asNexusMethod,
    connectionPlugin,
    fieldAuthorizePlugin,
    makeSchema,
} from 'nexus';
import { join } from 'path';
import * as types from '../resolver';
export const GQLDate = asNexusMethod(DateTimeResolver, 'date');

export const schema = makeSchema({
    types: [types, GQLDate],
    contextType: {
        module: join(process.cwd(), 'share/graphql/context', 'type.context.ts'),
        export: 'Context',
    },
    outputs: {
        typegen: join(process.cwd(), 'generated/graphql/nexus-typegen.ts'),
        schema: join(process.cwd(), 'generated/graphql/schema.graphql'),
    },
    plugins: [connectionPlugin(), fieldAuthorizePlugin()],
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'db',
            },
        ],
    },
});
