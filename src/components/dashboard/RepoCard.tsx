import { Star, ExternalLink, Calendar } from 'lucide-react';

import { Card } from '@/components/ui/card';

import { type Repo } from './queries';

type RepoCardProps = {
  repo: Repo;
};

export const RepoCard: React.FC<RepoCardProps> = ({ repo }: RepoCardProps) => {
  return (
    <Card className="group relative p-6 bg-slate-900/50 border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/60 transition-all duration-300 flex flex-col h-full">
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">
            {repo.name}
          </h3>
        </div>
        <a
          href={repo.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[10px] text-slate-500 flex items-center gap-1 hover:text-slate-300 mt-1"
        >
          view on GitHub <ExternalLink size={10} />
        </a>
      </div>

      <p className="text-sm text-slate-400 line-clamp-2 mb-6 flex-1">
        {repo.description || 'No description provided.'}
      </p>

      <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-800/50">
        <div className="flex items-center gap-4">
          {repo.primaryLanguage && (
            <div className="flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: repo.primaryLanguage.color || '#ccc' }}
              />
              <span className="text-xs font-medium text-slate-300">{repo.primaryLanguage.name}</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-slate-400">
            <Star size={14} className="text-yellow-500/80" />
            <span className="text-xs font-mono">{repo.stargazerCount}</span>
          </div>

          <div className="flex items-center gap-1 text-[10px] text-slate-500 font-mono">
            <Calendar size={12} />
            {new Date(repo.updatedAt).toLocaleDateString()}
          </div>
        </div>
      </div>
    </Card>
  );
};
