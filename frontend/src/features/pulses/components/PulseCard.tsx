import { motion } from 'framer-motion';
import { Rss, Zap } from 'lucide-react';

import { type PulseEventIdentified } from '@/features/pulses/hooks/usePulseSocket';

type PulseCardProps = {
  pulse: PulseEventIdentified;
};
export const PulseCard = ({ pulse }: PulseCardProps) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      transition={{
        type: 'spring',
        stiffness: 500,
        damping: 30,
        opacity: { duration: 0.2 },
      }}
      className="bg-slate-900/40 border border-slate-800 p-4 rounded-xl flex items-start gap-4 hover:bg-slate-900/60 transition-colors group"
    >
      {/* Avatar with Status Ring */}
      <div className="relative shrink-0">
        <img src={pulse.avatar!} alt="" className="w-10 h-10 rounded-full border border-slate-700" />
        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-600 rounded-full border-2 border-slate-950 flex items-center justify-center">
          <Zap size={8} className="text-white fill-current" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-blue-400 truncate">
            {pulse.user} <span className="text-slate-500 font-normal">pushed to</span> {pulse.repo}
          </h4>
          <span className="text-[10px] font-mono text-slate-600">{new Date(pulse.timestamp).toLocaleTimeString()}</span>
        </div>
        <p className="text-slate-200 text-sm mt-1 leading-relaxed">{pulse.message}</p>
      </div>

      {/* Action Icon (Visible on hover) */}
      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
        <a href={pulse.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-white">
          <Rss size={16} />
        </a>
      </div>
    </motion.div>
  );
};
