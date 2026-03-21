import { Navigate } from 'react-router-dom';

export const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem('gh_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
