import { LogOut } from 'lucide-react';

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

type LogoutButtonProps = {
  isMobile?: boolean;
};

export const LogoutButton: React.FC<LogoutButtonProps> = ({ isMobile = false }: LogoutButtonProps) => {
  const onLogout = () => {
    localStorage.removeItem('github_token');
    window.location.reload();
  }

  return (
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
)};