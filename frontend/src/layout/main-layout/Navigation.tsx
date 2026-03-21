import { LayoutDashboard, Zap } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { cn } from '@/lib/utils';

const navItems = [
  { name: 'Dashboard', to: '/', icon: LayoutDashboard },
  { name: 'Live Feed', to: '/feed', icon: Zap },
];

export const Navigation = () => {
  return (
    <nav className="flex-1 px-3 py-4 space-y-1">
      {navItems.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          className={({ isActive }) =>
            cn(
              'flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 group',
              isActive
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            )
          }
        >
          {({ isActive }) => (
            <>
              <item.icon
                size={20}
                className={cn(
                  'transition-colors',
                  isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                )}
              />
              <span className="font-medium">{item.name}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>
  );
};
