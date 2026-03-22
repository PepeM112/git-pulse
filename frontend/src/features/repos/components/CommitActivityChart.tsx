import { useMemo, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { type TooltipPayloadEntry } from 'recharts';

import type { PulseEventIdentified } from '@/features/pulses/hooks/usePulseSocket';

import { ChartRange, formatChartData } from '../utils/chart-utils';

type CommitActivityChartProps = {
  pulses: PulseEventIdentified[];
};

export const CommitActivityChart: React.FC<CommitActivityChartProps> = ({ pulses }) => {
  const [range, setRange] = useState<ChartRange>(ChartRange.LAST_7_DAYS);

  const chartData = useMemo(() => formatChartData(pulses, range), [pulses, range]);

  return (
    <div className="w-full h-80 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 shadow-inner flex flex-col transition-all">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">Activity Velocity</h3>
        </div>

        <div className="grid grid-cols-2 bg-slate-950 p-1 rounded-xl border border-slate-800/50 gap-1">
          {[ChartRange.LAST_7_DAYS, ChartRange.LAST_30_DAYS].map(value => (
            <button
              key={value}
              onClick={() => setRange(value)}
              className={`
                px-4 py-1.5 rounded-lg text-xs font-black transition-all duration-300
                ${range === value ? 'bg-blue-600/80 text-white ring-1 ring-blue-400/30' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900'}
              `}
            >
              {value}D
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis
              dataKey="label"
              axisLine={false}
              tickLine={false}
              tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
              dy={10}
              interval={range === ChartRange.LAST_30_DAYS ? 6 : 0}
            />
            <YAxis hide domain={[0, 'auto']} />

            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#334155', strokeWidth: 2 }} />

            <Line
              type="monotone"
              dataKey="count"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={range === ChartRange.LAST_7_DAYS}
              activeDot={{ r: 6, strokeWidth: 0, fill: '#60a5fa' }}
              animationDuration={1000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayloadEntry[];
  label?: string;
};

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-slate-950 border border-slate-800 p-3 rounded-xl shadow-2xl">
        <p className="text-[10px] font-black text-slate-500 uppercase mb-1">{label}</p>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <p className="text-sm font-bold text-white">
            {payload[0].value} <span className="text-slate-400 font-medium">pulses</span>
          </p>
        </div>
      </div>
    );
  }
  return null;
};
