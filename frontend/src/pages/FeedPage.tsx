import { useOutletContext } from 'react-router-dom';

import { PulseList } from '@/features/pulses/components/PulseList';
import { type PulseEventIdentified } from '@/features/pulses/hooks/usePulseSocket';


export const FeedPage: React.FC = () => {
  const { pulses } = useOutletContext<{ pulses: PulseEventIdentified[] }>();

  return (
    <div className="max-w-4xl mx-auto flex flex-col gap-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-black tracking-tight">LIVE PULSE FEED</h2>
        <div className="text-xs font-mono text-slate-500 uppercase">Showing last {pulses.length} events</div>
      </div>
      <PulseList pulses={pulses} />
    </div>
  );
};
