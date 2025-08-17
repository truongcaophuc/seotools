import { GraphQLClient } from 'graphql-request';

// function middleware(request: RequestInit) {
//     return {
//         ...request,
//     };
// }

export const graphqlRequestClient = new GraphQLClient(`/api`, {
    // requestMiddleware: middleware,
});
