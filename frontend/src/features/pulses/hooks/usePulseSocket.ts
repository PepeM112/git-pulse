import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { type PulseEvent } from '@/client';
import { socket } from '@/features/pulses/api/socket';

import { getPulsesFromStorage, savePulsesToStorage } from '../utils/pulses-storage';

const MAX_PULSES = 50;

export type PulseEventIdentified = PulseEvent & { id: string };

export const usePulseSocket = () => {
  const [pulses, setPulses] = useState<PulseEventIdentified[]>(getPulsesFromStorage());

  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('new_pulse', (data: PulseEvent) => {
      setPulses(prev => {
        const pulseWithId: PulseEventIdentified = {
          ...data,
          id: `${data.timestamp}-${Math.random()}`,
        };

        const title = `${data.user} pushed to ${data.repo}/${data.branch}`;
        const description = `${data.message}`;

        toast.success(title, {
          description,
          duration: 5000,
          action: {
            label: 'View',
            onClick: () => window.open(pulseWithId.url, '_blank'),
          },
        });
        const updated = [pulseWithId, ...prev];
        savePulsesToStorage(updated);
        return updated.slice(0, MAX_PULSES);
      });
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('new_pulse');
      socket.disconnect();
    };
  }, []);

  return { pulses, isConnected };
};
