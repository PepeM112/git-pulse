import { useQuery } from "@apollo/client/react";

import { GET_TOP_REPOS, type GetTopReposData } from "./queries";
import { RepoCard } from "./RepoCard";
import { RepoGridSkeleton } from "./RepoSkeleton";

export function RepoList() {
  const { data, loading, error } = useQuery<GetTopReposData>(GET_TOP_REPOS, {
    variables: { first: 20 },
  });

  if (loading) return <RepoGridSkeleton />;

  if (error) {
    return (
      <div className="p-8 border border-red-900/20 bg-red-900/5 rounded-xl text-center">
        <p className="text-red-400 font-medium">Failed to pulse repositories.</p>
        <p className="text-red-500/60 text-xs mt-1">{error.message}</p>
      </div>
    );
  }

  const repos = data?.viewer.repositories.nodes || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repos.map((repo) => (
        <RepoCard key={repo.id} repo={repo} />
      ))}
    </div>
  );
}