import { Outlet } from 'react-router-dom';

import { usePulseSocket } from '@/features/pulses/hooks/usePulseSocket';

import { Header } from './Header';
import { MobileNavigation } from './MobileNavigation';
import { Sidebar } from './Sidebar';

export const MainLayout: React.FC = () => {
  const { pulses } = usePulseSocket();
  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">
          <Outlet context={{ pulses }} />
        </main>
      </div>
      <MobileNavigation />
    </div>
  );
};
