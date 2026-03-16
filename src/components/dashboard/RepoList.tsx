import { useQuery } from "@apollo/client/react";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { Input } from "@/components/ui/input";

import { GET_TOP_REPOS, type GetTopReposData } from "./queries";
import { RepoCard } from "./RepoCard";
import { RepoGridSkeleton } from "./RepoSkeleton";


export const RepoList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const { data, loading, error } = useQuery<GetTopReposData>(GET_TOP_REPOS, {
    variables: { first: 20 },
    fetchPolicy: 'cache-first',
    nextFetchPolicy: 'cache-first',
  });

  const filteredRepos = useMemo(() => {
    const allRepos = data?.viewer.repositories.nodes || [];
    if (!searchQuery.trim()) return allRepos;
    
    return allRepos.filter((repo) =>
      repo.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  if (loading && !data) return <RepoGridSkeleton />;

  if (error && !data) return <div className="text-red-500 p-4">Error loading repos.</div>;

  return (
    <div className="space-y-6">
      {/* Search UI */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Filter repositories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-900/50 border-slate-800 focus:ring-blue-500/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} />
        ))}
      </div>

      {/* EMPTY */}
      {filteredRepos.length === 0 && (
        <div className="text-center py-12 border border-dashed border-slate-800 rounded-xl text-slate-500">
          No repositories found matching "{searchQuery}"
        </div>
      )}
    </div>
  );
}