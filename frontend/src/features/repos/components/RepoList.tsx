import { useQuery } from '@apollo/client/react';
import { Search } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { GET_TOP_REPOS, type GetTopReposData } from '@/features/repos/api/queries';
import { RepoCard } from '@/features/repos/components/RepoCard';
import { RepoGridSkeleton } from '@/features/repos/components/RepoSkeleton';

export const RepoList: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const { data, loading, error } = useQuery<GetTopReposData>(GET_TOP_REPOS, {
    variables: { first: 20 },
  });

  const allRepos = useMemo(() => data?.viewer.repositories.nodes || [], [data]);

  const filteredRepos = useMemo(() => {
    if (!searchQuery.trim()) return allRepos;

    return allRepos.filter(repo => repo.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [allRepos, searchQuery]);

  if (loading && !data) return <RepoGridSkeleton />;

  if (error && !data) {
    const isRateLimit = error.message.toLowerCase().includes('rate limit');

    return (
      <div className="p-8 border border-red-900/20 bg-red-900/5 rounded-xl text-center">
        <p className="text-red-400 font-medium">
          {isRateLimit ? 'GitHub API Rate Limit Exceeded' : 'Failed to load repositories'}
        </p>
        <p className="text-red-500/60 text-xs mt-1">
          {isRateLimit ? 'Please wait a few minutes before trying again.' : error.message}
        </p>
      </div>
    );
  }

  if (allRepos.length === 0 && !loading) {
    return (
      <div className="text-center py-20 border border-dashed border-slate-800 rounded-xl">
        <p className="text-slate-400 font-medium">No repositories found in your account.</p>
        <p className="text-slate-600 text-sm mt-1">Time to ship some code!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search UI */}
      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
        <Input
          placeholder="Filter repositories..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="pl-10 bg-slate-900/50 border-slate-800 focus:ring-blue-500/20"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRepos.map(repo => (
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
};
