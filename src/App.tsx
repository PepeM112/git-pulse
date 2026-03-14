import { useState, useEffect } from "react";
import { TokenInput } from "./components/TokenInput";

function App() {
  const [token, setToken] = useState<string | null>(localStorage.getItem("gh_token"));

  const saveToken = (newToken: string) => {
    localStorage.setItem("gh_token", newToken);
    setToken(newToken);
  };

  if (!token) {
    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="mb-12">
          <h1 className="text-4xl font-black tracking-tighter text-blue-500">
            GIT<span className="text-slate-200">PULSE</span>
          </h1>
        </div>
        <TokenInput onTokenSubmit={saveToken} />
      </main>
    );
  }
}
