import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

// GQL Apollo Client Setup - https://www.apollographql.com/docs/react/get-started
const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        clients: {
          // Always fetch the latest clients list from the server
          merge(existing, incoming) {
            return incoming;
          },
        },
        projects: {
          // Always fetch the latest clients list from the server
          merge(existing, incoming) {
            return incoming;
          },
        },
      },
    },
  },
});
const link = new HttpLink({
  uri: process.env.BUN_PUBLIC_GRAPHQL_URL ?? 'http://localhost:8080/graphql',
});

const gqlClient = new ApolloClient({
  link,
  cache,
});
// GQL Apollo Client Setup

export default gqlClient;
