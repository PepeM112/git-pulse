import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Rss, LogOut, Zap } from 'lucide-react';
import { useState } from 'react';
import { ErrorBoundary, type FallbackProps } from 'react-error-boundary';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { usePulseSocket } from '@/hooks/usePulseSocket';

import { RepoList } from './RepoList';
import { UserProfile } from './UserProfile';

type View = 'dashboard' | 'feed';

type DashboardShellProps = {
  onLogout: () => void;
};

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

export const DashboardShell: React.FC<DashboardShellProps> = ({ onLogout }: DashboardShellProps) => {
  const [activeView, setActiveView] = useState<View>('dashboard');

  const { pulses, isConnected } = usePulseSocket();

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200">
      {/* SIDEBAR */}
      <aside className="hidden lg:flex w-64 flex-col border-r border-slate-900 bg-slate-950">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <Zap size={20} className="text-white" />
          </div>
          <h2 className="text-xl font-black tracking-tighter">GITPULSE</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2 mt-4">
          <NavButton
            active={activeView === 'dashboard'}
            onClick={() => setActiveView('dashboard')}
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <NavButton
            active={activeView === 'feed'}
            onClick={() => setActiveView('feed')}
            icon={<Rss size={18} />}
            label="Pulse Feed"
          />
        </nav>

        <div className="p-4 mt-auto border-t border-slate-900">
          <LogoutButton onLogout={onLogout} />
        </div>
      </aside>
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-900 flex items-center justify-end px-4 bg-slate-950/50 backdrop-blur-sm">
          <UserProfile />
        </header>
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 custom-scrollbar">
          {/* DASHBOARD */}
          <section style={{ display: activeView === 'dashboard' ? 'block' : 'none' }}>
            <div className="grid gap-6">
              <h2 className="text-2xl font-bold">Your Repositories</h2>
              <p className="text-sm text-slate-500">A real-time pulse of your GitHub projects.</p>
              <ErrorBoundary FallbackComponent={ListErrorFallback}>
                <RepoList />
              </ErrorBoundary>
            </div>
          </section>
          {/* PULSE FEED */}
          {activeView === 'feed' && (
            <div className="max-w-4xl mx-auto flex flex-col gap-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-black tracking-tight">LIVE PULSE FEED</h2>
                <div className="text-xs font-mono text-slate-500 uppercase">Showing last {pulses.length} events</div>
              </div>

              {pulses.length === 0 ? (
                <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-900 rounded-2xl text-slate-600 italic">
                  <Zap size={32} className="mb-2 opacity-20" />
                  Waiting for GitHub activity...
                </div>
              ) : (
                <div className="space-y-3">
                  <AnimatePresence initial={false}>
                    {pulses.map(pulse => (
                      <motion.div
                        key={pulse.id}
                        layout
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
                        transition={{
                          type: 'spring',
                          stiffness: 500,
                          damping: 30,
                          opacity: { duration: 0.2 },
                        }}
                        className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-start gap-4 hover:bg-slate-900/60 transition-colors group"
                      >
                        {/* Avatar with Status Ring */}
                        <div className="relative shrink-0">
                          <img src={pulse.avatar} alt="" className="w-10 h-10 rounded-full border border-slate-700" />
                          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-slate-950 flex items-center justify-center">
                            <Zap size={8} className="text-white fill-current" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="text-sm font-bold text-blue-400 truncate">
                              {pulse.user} <span className="text-slate-500 font-normal">pushed to</span> {pulse.repo}
                            </h4>
                            <span className="text-[10px] font-mono text-slate-600">
                              {new Date(pulse.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                          <p className="text-slate-200 text-sm mt-1 leading-relaxed">{pulse.message}</p>
                        </div>

                        {/* Action Icon (Visible on hover) */}
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <a
                            href={pulse.url}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-500 hover:text-white"
                          >
                            <Rss size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
      {/* MOBILE NAV */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950 border-t border-slate-800 flex items-center z-50">
        <button
          onClick={() => setActiveView('dashboard')}
          className={`flex flex-1 flex-col items-center justify-center h-full transition-colors ${
            activeView === 'dashboard' ? 'text-blue-500 bg-blue-500/5' : 'text-slate-500'
          }`}
        >
          <LayoutDashboard size={24} />
          <span className="text-[10px] mt-1 font-medium">Dashboard</span>
        </button>

        <button
          onClick={() => setActiveView('feed')}
          className={`flex flex-1 flex-col items-center justify-center h-full transition-colors ${
            activeView === 'feed' ? 'text-blue-500 bg-blue-500/5' : 'text-slate-500'
          }`}
        >
          <Rss size={24} />
          <span className="text-[10px] mt-1 font-medium">Feed</span>
        </button>

        <LogoutButton isMobile onLogout={onLogout} />
      </nav>
    </div>
  );
};

type NavButtonProps = {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
};

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => {
  return (
    <Button
      variant={active ? 'secondary' : 'ghost'}
      onClick={onClick}
      className={`w-full justify-start gap-3 h-11 px-4 transition-all ${
        active
          ? 'bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border-r-2 border-blue-500'
          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
      }`}
    >
      {icon}
      <span className="font-semibold text-sm">{label}</span>
    </Button>
  );
};

type LogoutButtonProps = {
  isMobile?: boolean;
  onLogout: () => void;
};

const LogoutButton = ({ isMobile = false, onLogout }: LogoutButtonProps) => (
  <AlertDialog>
    <AlertDialogTrigger asChild>
      {isMobile ? (
        <button className="flex flex-1 flex-col items-center justify-center h-full text-slate-500 hover:text-red-400">
          <LogOut size={24} />
          <span className="text-[10px] mt-1 font-medium">Logout</span>
        </button>
      ) : (
        <Button
          variant="ghost"
          className="w-full h-10 justify-start gap-3 text-slate-400 hover:text-red-400 hover:bg-red-400/10"
        >
          <LogOut size={18} />
          Logout
        </Button>
      )}
    </AlertDialogTrigger>

    <AlertDialogContent className="bg-slate-900 border-slate-800 text-slate-200">
      <AlertDialogHeader>
        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        <AlertDialogDescription className="text-slate-400">
          This will end your current session and you will need to provide your GitHub token again to log in.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel className="bg-slate-800 border-slate-700 hover:bg-slate-700 text-slate-200">
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={onLogout} className="bg-red-600 hover:bg-red-700 text-white border-none">
          Log out
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>
);
