import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export const RepoSkeleton: React.FC = () => {
  return (
    <Card className="p-6 bg-slate-900/50 border-slate-800 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          {/* Repo name */}
          <Skeleton className="h-5 w-2/3 bg-slate-800" />
          {/* Description */}
          <Skeleton className="h-4 w-full bg-slate-800" />
        </div>
      </div>

      <div className="flex gap-4 pt-2">
        {/* Stats: Stars, Language */}
        <Skeleton className="h-3 w-12 bg-slate-800" />
        <Skeleton className="h-3 w-16 bg-slate-800" />
      </div>
    </Card>
  );
};

export const RepoGridSkeleton: React.FC = () => {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <RepoSkeleton key={i} />
      ))}
    </div>
  );
};
