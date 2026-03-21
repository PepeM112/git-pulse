import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';
import { useOutletContext } from 'react-router-dom';

import { type PulseEventIdentified } from '@/features/pulses/hooks/usePulseSocket';
import { CommitActivityChart } from '@/features/repos/components/CommitActivityChart';
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
  const { pulses } = useOutletContext<{ pulses: PulseEventIdentified[] }>();
  return (
    <div className="flex flex-col gap-8 max-w-7xl mx-auto">
      <section className="space-y-4">
        <div className="grid gap-2">
          <h2 className="text-2xl font-black tracking-tight text-white">ACTIVITY HUD</h2>
          <p className="text-sm text-slate-500 font-medium">Real-time commit velocity across all connected repos.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <CommitActivityChart pulses={pulses} />
          </div>

          <div className="bg-slate-900/40 rounded-2xl border border-slate-800 p-6 flex flex-col justify-center">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Total Pulses</span>
            <span className="text-4xl font-black text-blue-500 mt-2">{pulses.length}</span>
            <p className="text-xs text-slate-600 mt-4 leading-relaxed">
              Waiting for incoming socket events to calculate velocity...
            </p>
          </div>
        </div>
      </section>

      <hr className="border-slate-900" />

      <section className="space-y-6">
        <div className="grid gap-2">
          <h2 className="text-2xl font-bold">PROJECTS</h2>
          <p className="text-sm text-slate-500">A real-time pulse of your GitHub projects.</p>
        </div>

        <ErrorBoundary FallbackComponent={ListErrorFallback}>
          <RepoList />
        </ErrorBoundary>
      </section>
    </div>
  );
};
