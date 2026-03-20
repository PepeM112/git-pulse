import { AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';

import { PulseCard } from '@/features/pulses/components/PulseCard';
import { type PulseEventIdentified } from '@/features/pulses/hooks/usePulseSocket';

type PulseListProps = {
  pulses: PulseEventIdentified[];
};
export const PulseList: React.FC<PulseListProps> = ({ pulses }: PulseListProps) => {
  return (
    <>
      {pulses.length === 0 ? (
        <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed border-slate-900 rounded-2xl text-slate-600 italic">
          <Zap size={32} className="mb-2 opacity-20" />
          Waiting for GitHub activity...
        </div>
      ) : (
        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {pulses.map(pulse => (
              <PulseCard key={pulse.id} pulse={pulse} />
            ))}
          </AnimatePresence>
        </div>
      )}
    </>
  );
};
