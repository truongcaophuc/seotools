import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: 'http://localhost:3000/api',
    credentials: 'include', // Include cookies in requests
});

export default client;
