import { subDays, format, isSameDay, startOfDay } from 'date-fns';

import { type PulseEventIdentified } from '@/features/pulses/hooks/usePulseSocket';

export enum ChartRange {
  LAST_7_DAYS = 7,
  LAST_30_DAYS = 30,
}

export const formatChartData = (pulses: PulseEventIdentified[], range: number) => {
  const now = startOfDay(new Date());

  const days = Array.from({ length: range }, (_, i) => {
    const date = subDays(now, i);
    return {
      date,
      label: range === 7 ? format(date, 'EEE') : format(date, 'dd MMM'),
      count: 0,
    };
  }).reverse();

  // TODO: Remove dummy data if no pulses
  if (pulses.length === 0) {
    return days.map((d, i) => ({
      ...d,
      count: Math.floor(Math.sin(i) * 5 + 6),
    }));
  }

  pulses.forEach(pulse => {
    const pulseDate = startOfDay(new Date(pulse.timestamp));
    const dayMatch = days.find(d => isSameDay(d.date, pulseDate));
    if (dayMatch) dayMatch.count++;
  });

  return days;
};
