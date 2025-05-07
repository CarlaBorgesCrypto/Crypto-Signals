import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import HomePage from './pages/HomePage';
import PlansPage from './pages/PlansPage';
import SignalsPage from './pages/SignalsPage';
import SupportPage from './pages/SupportPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import ManageSignalsPage from './pages/ManageSignalsPage';
import ProtectedRoute from './components/auth/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="plans" element={<PlansPage />} />
        <Route 
          path="signals" 
          element={
            <ProtectedRoute requiresPlan>
              <SignalsPage />
            </ProtectedRoute>
          } 
        />
        <Route path="manage-signals" element={
          <ProtectedRoute>
            <ManageSignalsPage />
          </ProtectedRoute>
        } />
        <Route path="support" element={<SupportPage />} />
        <Route path="auth" element={<AuthPage />} />
        <Route 
          path="dashboard" 
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          } 
        />
      </Route>
    </Routes>
  );
}

export default App;
