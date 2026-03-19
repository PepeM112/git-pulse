import { useCallback, useMemo, useState } from "react";

import { DashboardShell } from '@/components/dashboard';
import { Onboarding } from '@/components/onboarding';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("gh_token"));

  const handleAuthSuccess = useCallback((validToken: string) => {
    localStorage.setItem('gh_token', validToken);
    setToken(validToken);
  }, []);

  const handleLogout = useCallback(() => {
    localStorage.removeItem('gh_token');
    setToken(null);
  }, []);

  return useMemo(() => {
    if (token) {
      return <DashboardShell onLogout={handleLogout} />;
    }
    return <Onboarding onSuccess={handleAuthSuccess} />;
  }, [token, handleAuthSuccess, handleLogout]);
}

export default App;
