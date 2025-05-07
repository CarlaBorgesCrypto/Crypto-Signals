import React, { useState, useEffect } from 'react';
import { Signal } from '../contexts/SignalsContext';
import { useAuth } from '../contexts/AuthContext';
import { useSignals } from '../contexts/SignalsContext';
import { Link } from 'react-router-dom'; // Import Link for navigation
import { subscriptionPlans } from '../data/mockData';

const ManageSignalsPage: React.FC = () => {
  const { user } = useAuth();
  const { signals, openSignals, closedSignals, setSignals } = useSignals();
  const [newSignal, setNewSignal] = useState<Signal>({
    id: '',
    coin: '',
    type: 'buy',
    entryPrice: 0,
    targetPrice: 0,
    stopLoss: 0,
    timestamp: new Date().toISOString(),
    status: 'open',
    subscriptionLevel: 'basic',
  });
  const [exitValue, setExitValue] = useState<number | null>(null); // State for exit value
  const [plans, setPlans] = useState(subscriptionPlans);

  useEffect(() => {
    console.log('ManageSignalsPage rendered');
    console.log('Current user:', user);
    if (!user) {
      console.error('User is not authenticated');
    } else if (user.plan !== 'admin') {
      console.error('User does not have admin access');
    }
  }, [user]);

  const handleAddSignal = () => {
    if (newSignal.id) {
      // Update existing signal
      setSignals(prevSignals => 
        prevSignals.map(signal => 
          signal.id === newSignal.id ? newSignal : signal
        )
      );
    } else {
      // Add new signal
      setSignals(prevSignals => [...prevSignals, { ...newSignal, id: Date.now().toString(), openTime: new Date().toISOString() }]);
    }
    // Reset newSignal state
    setNewSignal({
      id: '',
      coin: '',
      type: 'buy',
      entryPrice: 0,
      targetPrice: 0,
      stopLoss: 0,
      timestamp: new Date().toISOString(),
      status: 'open',
      subscriptionLevel: 'basic',
    });
    setExitValue(null); // Reset exit value
  };

  const handleEditSignal = (id: string) => {
    const signalToEdit = signals.find(signal => signal.id === id);
    if (signalToEdit) {
      setNewSignal(signalToEdit);
      handleDeleteSignal(id);
    }
  };

  const handleCloseSignal = (id: string) => {
    const signalToClose = signals.find(signal => signal.id === id);
    if (signalToClose && exitValue !== null) {
      const closedSignal = {
        ...signalToClose,
        status: 'closed',
        closedPrice: exitValue,
        closedTime: new Date().toISOString(), // Store closing time
        profit: signalToClose.type === 'sell' ? signalToClose.entryPrice - exitValue : exitValue - signalToClose.entryPrice, // Calculate profit/loss
      };
      setSignals(prevSignals => 
        prevSignals.map(signal => 
          signal.id === id ? closedSignal : signal
        )
      );
      setExitValue(null); // Reset exit value after closing
    }
  };

  const handleDeleteSignal = (id: string) => {
    // Logic to delete a signal
    setSignals(prevSignals => prevSignals.filter(signal => signal.id !== id));
  };

  const handleCoinChange = (planId: string, coins: string[]) => {
    setPlans(prevPlans => 
      prevPlans.map(plan => 
        plan.id === planId ? { ...plan, coins } : plan
      )
    );
  };

  const handleSavePlans = () => {
    // Aqui você pode implementar a lógica para salvar as alterações, como uma chamada de API ou atualização de contexto
    console.log('Plans updated:', plans);
  };

  if (!user) {
    console.error('User is not authenticated');
    return <div className="container-custom">Acesso negado. Você precisa estar logado.</div>;
  }

  if (user.plan !== 'admin') {
    console.error('User does not have admin access');
    return <div className="container-custom">Acesso negado. Apenas administradores podem acessar esta página.</div>;
  }

  return (
    <div className="container-custom bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-4">Gerenciar Sinais</h1>
      
      {/* Add Signal Form */}
      <div className="bg-gray-800 p-4 rounded-lg mb-6">
        <h2 className="text-2xl font-semibold mb-4 text-white">Adicionar Novo Sinal</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-white">Moeda</label>
            <input
              type="text"
              placeholder="Moeda"
              value={newSignal.coin}
              onChange={(e) => setNewSignal({ ...newSignal, coin: e.target.value })}
              className="input text-black"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Tipo</label>
            <select
              value={newSignal.type}
              onChange={(e) => setNewSignal({ ...newSignal, type: e.target.value as 'buy' | 'sell' })}
              className="input text-black"
            >
              <option value="buy">Comprar</option>
              <option value="sell">Vender</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-white">Preço de Entrada</label>
            <input
              type="number"
              placeholder="Preço de Entrada"
              value={newSignal.entryPrice}
              onChange={(e) => setNewSignal({ ...newSignal, entryPrice: Number(e.target.value) })}
              className="input text-black"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Preço Alvo</label>
            <input
              type="number"
              placeholder="Preço Alvo"
              value={newSignal.targetPrice}
              onChange={(e) => setNewSignal({ ...newSignal, targetPrice: Number(e.target.value) })}
              className="input text-black"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Stop Loss</label>
            <input
              type="number"
              placeholder="Stop Loss"
              value={newSignal.stopLoss}
              onChange={(e) => setNewSignal({ ...newSignal, stopLoss: Number(e.target.value) })}
              className="input text-black"
            />
          </div>
          <div>
            <label className="block text-sm text-white">Status</label>
            <select
              value={newSignal.status}
              onChange={(e) => setNewSignal({ ...newSignal, status: e.target.value as 'open' | 'closed' })}
              className="input text-black"
            >
              <option value="open">Aberto</option>
              <option value="closed">Fechado</option>
            </select>
          </div>
          <button onClick={handleAddSignal} className="btn-primary">Adicionar Sinal</button>
        </div>
      </div>

      {/* Open Signals Table */}
      <h2 className="text-2xl font-semibold mb-4 text-white">Sinais Abertos</h2>
      <table className="min-w-full bg-gray-800 rounded-lg mb-6">
        <thead>
          <tr>
            <th className="text-left text-gray-300">#</th>
            <th className="text-left text-gray-300">Moeda</th>
            <th className="text-left text-gray-300">Tipo</th>
            <th className="text-left text-gray-300">Preço de Entrada</th>
            <th className="text-left text-gray-300">Preço Alvo</th>
            <th className="text-left text-gray-300">Stop Loss</th>
            <th className="text-left text-gray-300">Horário de Abertura</th>
            <th className="text-left text-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {openSignals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((signal, index) => (
            <tr key={signal.id}>
              <td className="text-gray-400">{index + 1}</td>
              <td className="text-gray-400">{signal.coin}</td>
              <td className="text-gray-400">{signal.type}</td>
              <td className="text-gray-400">${signal.entryPrice}</td>
              <td className="text-gray-400">${signal.targetPrice}</td>
              <td className="text-gray-400">${signal.stopLoss}</td>
              <td className="text-gray-400">{new Date(signal.timestamp).toLocaleString()}</td>
              <td className="flex items-center">
                <button onClick={() => handleEditSignal(signal.id)} className="btn-primary mr-2">Editar</button>
                <input
                  type="number"
                  placeholder="Valor de Saída"
                  value={exitValue || ''}
                  onChange={(e) => setExitValue(Number(e.target.value))}
                  className="input text-black w-24"
                  step="0.01"
                />
                <button onClick={() => handleCloseSignal(signal.id)} className="btn-danger ml-2">Fechar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Closed Signals Table */}
      <h2 className="text-2xl font-semibold mb-4 text-white">Sinais Fechados</h2>
      <table className="min-w-full bg-gray-800 rounded-lg">
        <thead>
          <tr>
            <th className="text-left text-gray-300">#</th>
            <th className="text-left text-gray-300">Moeda</th>
            <th className="text-left text-gray-300">Tipo</th>
            <th className="text-left text-gray-300">Preço de Entrada</th>
            <th className="text-left text-gray-300">Preço Alvo</th>
            <th className="text-left text-gray-300">Stop Loss</th>
            <th className="text-left text-gray-300">Preço de Saída</th>
            <th className="text-left text-gray-300">Lucro/Perda</th>
            <th className="text-left text-gray-300">Horário de Fechamento</th>
            <th className="text-left text-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {closedSignals.sort((a, b) => new Date(b.closedTime).getTime() - new Date(a.closedTime).getTime()).map((signal, index) => (
            <tr key={signal.id}>
              <td className="text-gray-400">{index + 1}</td>
              <td className="text-gray-400">{signal.coin}</td>
              <td className={`text-gray-400 ${signal.type === 'sell' ? 'text-red-500' : 'text-green-500'}`}>{signal.type.toUpperCase()}</td>
              <td className="text-gray-400">${signal.entryPrice}</td>
              <td className="text-green-500">${signal.targetPrice}</td>
              <td className="text-gray-400">${signal.stopLoss}</td>
              <td className="text-red-500">${signal.closedPrice}</td>
              <td className="text-gray-400">${signal.profit}</td>
              <td className="text-gray-400">{new Date(signal.closedTime).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEditSignal(signal.id)} className="btn-primary">Editar</button>
                <button onClick={() => handleDeleteSignal(signal.id)} className="btn-danger">Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Plans Section */}
      <h2 className="text-2xl font-semibold mb-4 text-white">Editar Moedas dos Planos</h2>
      {plans.map(plan => (
        <div key={plan.id} className="mb-6">
          <h3 className="text-xl font-semibold mb-2 text-white">{plan.name}</h3>
          <input
            type="text"
            value={plan.coins.join(', ')}
            onChange={(e) => handleCoinChange(plan.id, e.target.value.split(',').map(coin => coin.trim()))}
            className="input text-black"
            placeholder="Insira as moedas separadas por vírgula"
          />
        </div>
      ))}
      <button onClick={handleSavePlans} className="btn-primary">Salvar Alterações</button>
    </div>
  );
};

export default ManageSignalsPage;
