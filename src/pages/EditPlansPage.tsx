import React, { useState } from 'react';
import { subscriptionPlans } from '../data/mockData';

const EditPlansPage: React.FC = () => {
  const [plans, setPlans] = useState(subscriptionPlans);

  const handleCoinChange = (planId: string, coins: string[]) => {
    setPlans(prevPlans => 
      prevPlans.map(plan => 
        plan.id === planId ? { ...plan, coins } : plan
      )
    );
  };

  const handleSave = () => {
    // Aqui você pode implementar a lógica para salvar as alterações, como uma chamada de API ou atualização de contexto
    console.log('Plans updated:', plans);
  };

  return (
    <div className="container-custom bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Editar Moedas dos Planos</h1>
      {plans.map(plan => (
        <div key={plan.id} className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">{plan.name}</h2>
          <input
            type="text"
            value={plan.coins.join(', ')}
            onChange={(e) => handleCoinChange(plan.id, e.target.value.split(',').map(coin => coin.trim()))}
            className="input text-black"
            placeholder="Insira as moedas separadas por vírgula"
          />
        </div>
      ))}
      <button onClick={handleSave} className="btn-primary">Salvar Alterações</button>
    </div>
  );
};

export default EditPlansPage;
