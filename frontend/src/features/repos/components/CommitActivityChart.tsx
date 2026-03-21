import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mocked data
const dummyData = [
  { day: 'Mon', count: 4 },
  { day: 'Tue', count: 7 },
  { day: 'Wed', count: 5 },
  { day: 'Thu', count: 12 },
  { day: 'Fri', count: 9 },
  { day: 'Sat', count: 2 },
  { day: 'Sun', count: 3 },
];

export const CommitActivityChart: React.FC = () => {
  return (
    <div className="w-full h-75 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-inner">
      <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Weekly Activity</h3>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dummyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />

          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis hide={true} />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ r: 4, fill: '#3b82f6', strokeWidth: 2, stroke: '#0f172a' }}
            activeDot={{ r: 6, strokeWidth: 0 }}
            animationDuration={1500}
          />
          <Tooltip contentStyle={{ display: 'none' }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
