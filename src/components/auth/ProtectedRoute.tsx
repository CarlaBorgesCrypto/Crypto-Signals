import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: ReactNode;
  requiresPlan?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiresPlan = false }) => {
  const { user, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  if (requiresPlan && !user.plan) {
    return <Navigate to="/plans" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
