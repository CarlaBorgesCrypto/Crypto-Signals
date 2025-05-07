import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { supabase } from '../supabaseClient';

export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'basic' | 'pro' | 'premium' | 'admin' | null; // Adding 'admin' as a plan
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  setUserRoleAndPlan: (email: string, role: string, plan: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  error: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load user from local storage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem('cryptoSignalsUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from local storage:', e);
      }
    }
    setIsLoading(false);
  }, []);

  // Updated login function
  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      setUser(data.user);
      localStorage.setItem('cryptoSignalsUser', JSON.stringify(data.user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock register function
  const register = async (name: string, email: string, password: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { user, error } = await supabase.auth.signUp({ email, password, options: { redirectTo: 'https://your-production-url.com' } });
      if (error) throw error;
      setUser(user);
      localStorage.setItem('cryptoSignalsUser', JSON.stringify(user));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  // Set user role and plan
  const setUserRoleAndPlan = async (email: string, role: string, plan: string): Promise<void> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase
        .from('users') // Assuming you have a 'users' table
        .update({ role, plan })
        .eq('email', email);
      
      if (error) throw error;
      console.log(`User ${email} updated to role: ${role} and plan: ${plan}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = (): void => {
    setUser(null);
    localStorage.removeItem('cryptoSignalsUser');
  };

  const value = {
    user,
    login,
    register,
    setUserRoleAndPlan,
    logout,
    isLoading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
