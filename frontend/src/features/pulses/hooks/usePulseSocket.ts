import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import { type PulseEvent } from '@/client';
import { socket } from '@/features/pulses/api/socket';

const MAX_PULSES = 50;

export type PulseEventIdentified = PulseEvent & { id: string };

export const usePulseSocket = () => {
  const [pulses, setPulses] = useState<PulseEventIdentified[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('new_pulse', (data: PulseEvent) => {
      setPulses(prev => {
        const pulseWithId: PulseEventIdentified = { 
          ...data, 
          id: `${data.timestamp}-${Math.random()}` 
        };

        toast.success(`New Pulse from ${data.user}`, {
          description: `Pushed to ${pulseWithId.repo}: ${pulseWithId.message}`,
          duration: 5000,
          action: {
            label: 'View',
            onClick: () => {
              const feedUrl = `/feed`;
              window.open(feedUrl, '_blank') 
            }
          }
        });
        const updated = [pulseWithId, ...prev];
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
