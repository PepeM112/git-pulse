import { useEffect, useState } from 'react';

import { socket } from '@/services/socket';

const MAX_PULSES = 50;

export const usePulseSocket = () => {
  const [pulses, setPulses] = useState<any[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.connect();

    socket.on('connect', () => setIsConnected(true));
    socket.on('disconnect', () => setIsConnected(false));

    socket.on('new_pulse', data => {
      setPulses(prev => {
        const pulseWithId = { 
          ...data, 
          id: `${data.timestamp}-${Math.random()}` 
        };
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
