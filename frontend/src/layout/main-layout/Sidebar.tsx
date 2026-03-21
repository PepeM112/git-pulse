import { Zap } from 'lucide-react';

import { LogoutButton } from '@/features/auth/components/LogoutButton';
import { socket } from '@/features/pulses/api/socket';

import { Navigation } from './Navigation';

import type React from 'react';

type SidebarProps = {
  isConnected: boolean;
};

export const Sidebar: React.FC<SidebarProps> = ({ isConnected }) => {
  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-slate-900 bg-slate-950">
        <SidebarHeader />
        <Navigation />
        <StatusIndicator isConnected={isConnected} />
        <div className="p-4 mt-auto border-t border-slate-900">
          <LogoutButton />
        </div>
      </aside>
  )
};

const SidebarHeader: React.FC = () => (
  <div className="p-6 flex items-center gap-3">
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
      <Zap size={20} className="text-white" />
    </div>
    <h2 className="text-xl font-black tracking-tighter">GITPULSE</h2>
  </div>
);

const StatusIndicator = ({ isConnected }: { isConnected: boolean }) => (
  <div className="px-6 py-4 border-t border-slate-900 bg-slate-950/50">
    <div className="flex items-center justify-between mb-2">
      <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">System Status</span>
      {/* LED Indicator */}
      <div
        className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
          isConnected
            ? 'bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.4)] animate-pulse'
            : 'bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.4)]'
        }`}
      />
    </div>
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium text-slate-300">
        {isConnected ? 'Real-time Link Active' : 'Connection Lost'}
      </span>
      {!isConnected && (
        <button
          onClick={() => socket.connect()}
          className="text-xs text-blue-500 hover:text-blue-400 font-bold underline decoration-blue-500/30"
        >
          RECONNECT
        </button>
      )}
    </div>
  </div>
);