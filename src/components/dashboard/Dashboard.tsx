type DashboardProps = {
  onLogout: () => void;
};

export const Dashboard = ({ onLogout }: DashboardProps) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <header className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-xl font-bold tracking-tighter text-blue-500">GP</h1>
        <button 
          onClick={onLogout}
          className="text-[10px] font-bold uppercase tracking-widest bg-red-500/10 text-red-400 px-4 py-2 rounded-full border border-red-500/20 hover:bg-red-500/20 transition-all"
        >
          Logout
        </button>
      </header>
      
      <main className="max-w-7xl mx-auto mt-20">
        <div className="border border-white/5 bg-white/2 rounded-3xl p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Welcome to GitPulse</h2>
          <p className="text-slate-500 italic">Task 2.1: Implement Apollo Queries to fetch real data.</p>
        </div>
      </main>
    </div>
  );
};