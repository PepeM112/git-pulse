import { UserProfile } from './UserProfile';

export const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-900 flex items-center justify-end px-4 bg-slate-950/50 backdrop-blur-sm">
      <UserProfile />
    </header>
  );
};
