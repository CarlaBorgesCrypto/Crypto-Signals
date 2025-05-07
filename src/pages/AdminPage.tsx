import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { User } from '../contexts/AuthContext'; // Importar o tipo User

const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Simular a obtenção de usuários (substitua isso pela sua lógica de API)
  useEffect(() => {
    const fetchUsers = async () => {
      // Simulação de usuários cadastrados
      const registeredUsers: User[] = [
        { id: '1', name: 'Admin User', email: 'admin@example.com', plan: 'premium' },
        { id: '2', name: 'Demo Basic', email: 'demo@example.com', plan: 'pro' },

        // Adicione mais usuários conforme necessário
      ];
      setUsers(registeredUsers);
      setLoading(false);
    };
    
    fetchUsers();
  }, []);

  const handlePlanChange = (userId: string, newPlan: string) => {
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, plan: newPlan } : user
      )
    );
  };

  if (!user || user.plan !== 'admin') {
    return <div>Acesso negado. Apenas administradores podem acessar esta página.</div>;
  }

  return (
    <div className="container-custom">
      <h1 className="text-4xl font-bold mb-4">Gerenciar Usuários</h1>
      
      {loading ? (
        <div>Carregando usuários...</div>
      ) : (
        <table className="min-w-full bg-gray-800 rounded-lg mb-6">
          <thead>
            <tr className="bg-gray-700">
              <th className="py-3 px-4 text-left text-gray-400 font-semibold">Nome</th>
              <th className="py-3 px-4 text-left text-gray-400 font-semibold">Email</th>
              <th className="py-3 px-4 text-left text-gray-400 font-semibold">Plano</th>
              <th className="py-3 px-4 text-left text-gray-400 font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-t border-gray-700 hover:bg-gray-700">
                <td className="py-3 px-4 text-white">{user.name}</td>
                <td className="py-3 px-4 text-white">{user.email}</td>
                <td className="py-3 px-4 text-white">{user.plan}</td>
                <td className="py-3 px-4">
                  <select 
                    value={user.plan} 
                    onChange={(e) => handlePlanChange(user.id, e.target.value)} 
                    className="bg-gray-700 text-white"
                  >
                    <option value="basic">Basic</option>
                    <option value="pro">Pro</option>
                    <option value="premium">Premium</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminPage;
