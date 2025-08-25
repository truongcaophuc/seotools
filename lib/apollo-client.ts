import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: '/api',
    credentials: 'include', // Include cookies in requests
});

export default client;
