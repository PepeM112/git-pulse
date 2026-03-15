import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';

// 1. HTTP connection to the API
const httpLink = new HttpLink({ uri: 'https://api.github.com/graphql' });

// 2. Middleware for the Token
const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('gh_token');
  
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }));

  return forward(operation);
});

// 3. Final client
export const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});