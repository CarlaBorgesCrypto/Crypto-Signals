import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

const SubscriptionPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState(user?.plan || 'basic');

  const handlePlanChange = (newPlan: string) => {
    // Aqui você pode adicionar a lógica para atualizar o plano do usuário
    // Por exemplo, você pode fazer uma chamada de API para atualizar o plano no backend
    setSelectedPlan(newPlan);
    // Simulação de atualização do plano
    alert(`Plano alterado para: ${newPlan}`);
  };

  return (
    <div className="container-custom">
      <h1 className="text-4xl font-bold mb-4">Gerenciar Assinatura</h1>
      <p>Seu plano atual: {user?.plan}</p>
      <div className="mb-4">
        <label htmlFor="plan-select" className="block text-gray-400">Escolha um novo plano:</label>
        <select
          id="plan-select"
          value={selectedPlan}
          onChange={(e) => handlePlanChange(e.target.value)}
          className="bg-gray-700 text-white"
        >
          <option value="basic">Basic</option>
          <option value="pro">Pro</option>
          <option value="premium">Premium</option>
        </select>
      </div>
      <button onClick={logout} className="bg-red-500 text-white py-2 px-4 rounded">Logout</button>
    </div>
  );
};

export default SubscriptionPage;
