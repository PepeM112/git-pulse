import { gql } from '@apollo/client';

export type Repo = {
  id: string;
  name: string;
  description: string | null;
  url: string;
  stargazerCount: number;
  updatedAt: string;
  primaryLanguage: {
    name: string;
    color: string | null;
  } | null;
}

export type GetTopReposData = {
  viewer: {
    repositories: {
      nodes: Repo[];
    };
  };
}

export const REPO_FIELDS = gql`
  fragment RepoFields on Repository {
    id
    name
    description
    url
    stargazerCount
    updatedAt
    primaryLanguage {
      name
      color
    }
  }
`;

export const GET_TOP_REPOS = gql`
  ${REPO_FIELDS}
  query GetTopRepos($first: Int!) {
    viewer {
      id
      repositories(
        first: $first, 
        orderBy: { field: STARGAZERS, direction: DESC },
        ownerAffiliations: [OWNER]
      ) {
        nodes {
          ...RepoFields
        }
      }
    }
  }
`;