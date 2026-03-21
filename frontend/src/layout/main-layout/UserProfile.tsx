import { gql } from '@apollo/client';
import { useQuery  } from '@apollo/client/react';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from '@/components/ui/skeleton';

type GetUserAndQuotaData = {
  viewer: {
    login: string;
    avatarUrl: string;
  };
  rateLimit: {
    limit: number;
    remaining: number;
    resetAt: string;
  };
};

const GET_USER_AND_QUOTA = gql`
  query GetUserAndQuota {
    viewer {
      login
      avatarUrl
    }
    rateLimit {
      limit
      remaining
    }
  }
`;

export const UserProfile: React.FC = () => {
    const { data, loading, error } = useQuery<GetUserAndQuotaData>(GET_USER_AND_QUOTA, {
        pollInterval: 60000,
    });

    if (loading && !data) {
      return (
        <div className="flex items-center gap-4">
          <div className="text-right space-y-1">
            <Skeleton className="h-4 w-20 bg-slate-800 ml-auto" />
            <Skeleton className="h-3 w-24 bg-slate-800" />
          </div>
          <Skeleton className="h-9 w-9 rounded-full bg-slate-800" />
        </div>
      );
    }
    if (error) return <span className="text-xs text-red-500">Error quota</span>;

    const { viewer, rateLimit } = data || {};

    return (
        <div className="flex items-center gap-4">
            <div className="text-right">
                <p className="text-sm font-medium text-slate-200">{viewer?.login}</p>
                <p className="text-[10px] font mono text-slate-500 uppercase tracking-wider">
                    Quota: {rateLimit?.remaining} / {rateLimit?.limit}
                </p>
            </div>
            <Avatar className="h-9 w-9 border border-slate-800">
                <AvatarImage src={viewer?.avatarUrl} alt={viewer?.login} />
                <AvatarFallback>{viewer?.login?.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
        </div>
    )
}