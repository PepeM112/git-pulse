import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';

const httpLink = new HttpLink({ uri: import.meta.env.VITE_GITHUB_API_URL || 'https://api.github.com/graphql' });

const retryLink = new RetryLink({
  delay: { initial: 300, max: Infinity, jitter: true },
  attempts: { max: 3 },
});

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('gh_token');

  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }));

  return forward(operation);
});

export const client = new ApolloClient({
  link: concat(authMiddleware, concat(retryLink, httpLink)),
  cache: new InMemoryCache(),
});
