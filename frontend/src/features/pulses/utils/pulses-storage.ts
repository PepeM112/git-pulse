import { type PulseEventIdentified } from '../hooks/usePulseSocket';

const STORAGE_KEY = 'git-pulse-history';
const RETENTION_DAYS = 30;

export function getPulsesFromStorage(): PulseEventIdentified[] {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return [];

  try {
    const parsed: PulseEventIdentified[] = JSON.parse(saved);
    const now = new Date();
    const expirationMs = RETENTION_DAYS * 24 * 60 * 60 * 1000;

    return parsed.filter(p => now.getTime() - new Date(p.timestamp).getTime() < expirationMs);
  } catch (e) {
    console.error('Error parsing localStorage', e);
    return [];
  }
}

export function savePulsesToStorage(pulses: PulseEventIdentified[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pulses));
}
