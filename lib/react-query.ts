import { GraphQLClient } from 'graphql-request';

// function middleware(request: RequestInit) {
//     return {
//         ...request,
//     };
// }

export const graphqlRequestClient = new GraphQLClient(`http://localhost:3000/api`, {
    credentials: 'include',
    // requestMiddleware: middleware,
});
