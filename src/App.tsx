import { useState } from "react";

import { DashboardShell } from '@/components/dashboard';
import { Onboarding } from '@/components/onboarding';

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("gh_token"));

  const handleAuthSuccess = (validToken: string) => {
    localStorage.setItem('gh_token', validToken);
    setToken(validToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('gh_token');
    setToken(null);
  };

  return token ? <DashboardShell onLogout={handleLogout} /> : <Onboarding onSuccess={handleAuthSuccess} />;
}

export default App;
