import { NavLink } from 'react-router-dom';

import { LogoutButton } from '@/features/auth/components/LogoutButton';

import { NAV_ITEMS } from './nav-config';


export const MobileNavigation: React.FC = () => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-slate-950 border-t border-slate-800 flex items-center z-50">
    {NAV_ITEMS.map((item) => (
      <NavLink
        key={item.to}
        to={item.to}
        className={({ isActive }) => `
          flex flex-1 flex-col items-center justify-center h-full transition-colors
          ${isActive ? 'text-blue-500 bg-blue-500/5' : 'text-slate-500'}
        `}
      >
        <item.icon size={24} />
        <span className="text-[10px] mt-1 font-medium">{item.label}</span>
      </NavLink>
    ))}
    
    <LogoutButton isMobile />
  </nav>
);