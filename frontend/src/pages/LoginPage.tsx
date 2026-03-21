import { gql } from '@apollo/client';
import { useLazyQuery } from '@apollo/client/react';
import { useState } from "react";

import { TokenInput } from '../features/auth/components/TokenInput';

type ValidateTokenData = {
  viewer: {
    login: string;
    avatarUrl: string;
  };
};

const VALIDATE_TOKEN = gql`
  query ValidateToken {
    viewer {
      login
      avatarUrl
    }
  }
`;

export const LoginPage = () => {
    const [error, setError] = useState<string | null>(null);

    const [validateToken, { loading }] = useLazyQuery<ValidateTokenData>(VALIDATE_TOKEN, {
      fetchPolicy: 'network-only',
    });

    const handleTokenSubmit = async (token: string) => {
    setError(null);
    localStorage.setItem('gh_token', token);

    try {
      const { data, error } = await validateToken();

      if (error) {
        throw new Error(error.message);
      }

      if (data?.viewer) {
        localStorage.setItem('gh_token', token);
      }
    } catch (err: unknown) {
      setError(err instanceof Error && err.message.includes('401') ? 'Invalid token.' : 'Error connecting to GitHub');
      localStorage.removeItem('gh_token');
    }
  };

    return (
      <main className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-black tracking-tighter text-blue-500 mb-2">
            GIT<span className="text-slate-200">PULSE</span>
          </h1>
          <p className="text-slate-500 font-mono text-xs uppercase tracking-widest">Developer Insights Engine</p>
        </div>
  
        <TokenInput onTokenSubmit={handleTokenSubmit} isLoading={loading} error={error} />
      </main>
    );
  
}