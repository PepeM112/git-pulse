import { useLazyQuery, gql } from "@apollo/client";
import { useState } from "react";

import { TokenInput } from "../ui/TokenInput";

type ValidateTokenData = {
  viewer: {
    login: string;
    avatarUrl: string;
  };
};

const VALIDATE_TOKEN = gql`
  query ValidateToken($token: String!) {
    viewer(token: $token) {
      login
      avatarUrl
    }
  }
`;

type OnboardingProps = {
  onSuccess: (token: string) => void;
};

export const Onboarding: React.FC<OnboardingProps> = ({ onSuccess }: OnboardingProps) => {
  const [error, setError] = useState<string | null>(null);

  const [validateToken, { loading }] = useLazyQuery<ValidateTokenData>(VALIDATE_TOKEN, {
    fetchPolicy: "network-only",
    onCompleted: (data: ValidateTokenData) => {
      console.log("Token validation successful:", data.viewer.login);
    },
    onError: (err: Error) => {
      setError(err.message.includes("401") ? "Invalid token or expired. Please check permissions." : err.message);
      localStorage.removeItem("gh_token");
    },
  });

  const handleTokenSubmit = async (token: string) => {
    setError(null);
    localStorage.setItem("gh_token", token);

    try {
      const { data } = await validateToken();
      if (data?.viewer) {
        onSuccess(token);
      }
    } catch {
      // Error handling is done in onError callback of useLazyQuery
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
};
