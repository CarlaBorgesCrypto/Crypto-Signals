import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { mockSignals } from '../data/mockData';

export interface Signal {
  id: string;
  coin: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
  timestamp: string;
  status: 'open' | 'closed' | 'canceled';
  closedPrice?: number;
  profit?: number;
  subscriptionLevel: 'basic' | 'pro' | 'premium';
}

interface SignalsContextType {
  signals: Signal[];
  openSignals: Signal[];
  closedSignals: Signal[];
  setSignals: React.Dispatch<React.SetStateAction<Signal[]>>; // Ensure setSignals is included
  isLoading: boolean;
  error: string | null;
  filterSignals: (level: string, status?: string) => Signal[];
}

const SignalsContext = createContext<SignalsContextType | undefined>(undefined);

export const useSignals = (): SignalsContextType => {
  const context = useContext(SignalsContext);
  if (!context) {
    throw new Error('useSignals must be used within a SignalsProvider');
  }
  return context;
};

interface SignalsProviderProps {
  children: ReactNode;
}

export const SignalsProvider: React.FC<SignalsProviderProps> = ({ children }) => {
  const [signals, setSignals] = useState<Signal[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load signals (mock data for now)
  useEffect(() => {
    const fetchSignals = async () => {
      setIsLoading(true);
      try {
        // Simulate API fetch
        await new Promise(resolve => setTimeout(resolve, 800));
        setSignals(mockSignals);
      } catch (err) {
        setError('Failed to fetch signals');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSignals();
  }, []);

  // Filter helpers
  const openSignals = signals.filter(signal => signal.status === 'open');
  const closedSignals = signals.filter(signal => signal.status === 'closed');

  // Filter function for component use
  const filterSignals = (level: string, status?: string): Signal[] => {
    return signals.filter(signal => {
      const levelMatch = level === 'all' || signal.subscriptionLevel === level;
      const statusMatch = !status || status === 'all' || signal.status === status;
      return levelMatch && statusMatch;
    });
  };

  const value = {
    signals,
    openSignals,
    closedSignals,
    setSignals, // Ensure setSignals is included in the context value
    isLoading,
    error,
    filterSignals,
  };

  return <SignalsContext.Provider value={value}>{children}</SignalsContext.Provider>;
};
