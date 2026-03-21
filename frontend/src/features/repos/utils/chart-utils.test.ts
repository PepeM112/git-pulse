import { describe, it, expect } from 'vitest';

import type { PulseEventIdentified } from '@/features/pulses/hooks/usePulseSocket';

import { formatChartData, ChartRange } from './chart-utils';

describe('formatChartData', () => {
  it('should return the correct number of days for a 7-day range', () => {
    const result = formatChartData([], ChartRange.LAST_7_DAYS);
    expect(result).toHaveLength(7);
  });

  it('should correctly count pulses for a specific day', () => {
    const today = new Date().toISOString();
    const pulses: PulseEventIdentified[] = [
      {
        id: '1',
        user: 'jose',
        repo: 'pulse',
        message: 'feat 1',
        timestamp: today,
        avatar: null,
        url: '',
      },
      {
        id: '2',
        user: 'jose',
        repo: 'pulse',
        message: 'feat 2',
        timestamp: today,
        avatar: null,
        url: '',
      },
    ];
    const result = formatChartData(pulses, ChartRange.LAST_7_DAYS);
    const todayLabel = result[6];
    expect(todayLabel.count).toBe(2);
  });

  it('should ignore pulses that are older than the requested range', () => {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    const pulses: PulseEventIdentified[] = [
      {
        id: 'old-1',
        user: 'jose',
        repo: 'pulse',
        message: 'old commit',
        timestamp: tenDaysAgo.toISOString(),
        avatar: null,
        url: '',
      },
    ];

    const result = formatChartData(pulses, ChartRange.LAST_7_DAYS);
    const totalCount = result.reduce((acc, day) => acc + day.count, 0);

    expect(totalCount).toBe(0);
  });
});
