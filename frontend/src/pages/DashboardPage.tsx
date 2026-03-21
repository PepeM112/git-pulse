import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import { RepoList } from '@/features/repos/components/RepoList';

function ListErrorFallback({ resetErrorBoundary }: FallbackProps) {
  return (
    <div className="p-8 bg-red-900/10 border border-red-900/30 rounded-xl text-center">
      <p className="text-red-400 font-bold">The repository list crashed.</p>
      <button onClick={resetErrorBoundary} className="text-blue-400 mt-2 hover:underline">
        Try reloading the list
      </button>
    </div>
  );
}

export const DashboardPage: React.FC = () => {
  return (
    <section>
      <div className="grid gap-6">
        <h2 className="text-2xl font-bold">Your Repositories</h2>
        <p className="text-sm text-slate-500">A real-time pulse of your GitHub projects.</p>
        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <RepoList />
        </ErrorBoundary>
      </div>
    </section>
  );
}