import { useState } from 'react';

type TokenInputProps = {
  onTokenSubmit: (token: string) => void;
  isLoading?: boolean;
  error?: string | null;
};

export const TokenInput: React.FC<TokenInputProps> = ({ onTokenSubmit, isLoading, error }: TokenInputProps) => {
  const [token, setToken] = useState('');
  const [showToken, setShowToken] = useState(false);

  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault();
    if (token.trim().length > 0) {
      onTokenSubmit(token.trim());
    }
  };

  return (
    <div className="max-w-md w-full p-8 rounded-2xl border border-white/10 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-white tracking-tight">Connect GitHub</h2>
        <p className="text-slate-400 text-sm mt-2">Enter a Personal Access Token (classic) to sync your pulse</p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <input
            type={showToken ? 'text' : 'password'}
            value={token}
            onChange={e => setToken(e.target.value)}
            placeholder="ghp_XXXXXXXXXXXXXXXXXXXX"
            className="w-full bg-slate-950 border border-white/5 rounded-lg px-4 py-3 text-slate-200 placeholder:text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          <button
            type="button"
            onClick={() => setShowToken(!showToken)}
            className="absolute right-1 top-0 px-2 py-4 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-300 transition-colors"
          >
            {showToken ? 'Hide' : 'Show'}
          </button>
        </div>

        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}

        <button
          type="submit"
          disabled={isLoading || token.trim().length === 0}
          className="w-full bg-green-700 hover:bg-green-600 disabled:bg-slate-800 text-white font-semibold py-3 rounded-lg transition-all active:scale-[0.98]"
        >
          {isLoading ? 'Validating...' : 'Connect GitHub'}
        </button>
      </form>
      <div className="mt-8 pt-6 border-t border-white/5 text-center">
        <a
          href="https://github.com/settings/tokens"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-slate-500 hover:text-blue-400 transition-colors underline underline-offset-4"
        >
          How do I generate a token?
        </a>
      </div>
    </div>
  );
};
