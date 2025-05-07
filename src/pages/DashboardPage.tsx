import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useSignals } from '../contexts/SignalsContext';
import { subscriptionPlans, planStatistics, monthlyPerformance } from '../data/mockData';
import { TrendingUp, TrendingDown, BarChart2, Percent, DollarSign, CheckSquare, Calendar, Clock, AlertTriangle } from 'lucide-react';
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import { format } from 'date-fns';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { signals, openSignals, closedSignals } = useSignals();
  const [activeTab, setActiveTab] = useState('overview');
  
  // Calculate statistics
  const totalSignals = signals.length;
  const successfulSignals = closedSignals.filter(signal => (signal.profit || 0) > 0).length;
  const successRate = totalSignals > 0 ? Math.round((successfulSignals / closedSignals.length) * 100) : 0;
  
  // Get plans data
  const userPlan = user?.plan || 'basic';
  
  // User's plan details
  const currentPlan = subscriptionPlans.find(plan => plan.id === userPlan);
  
  // Prepare chart data
  const signalTypeData = [
    { name: 'Buy Signals', value: signals.filter(s => s.type === 'buy').length },
    { name: 'Sell Signals', value: signals.filter(s => s.type === 'sell').length },
  ];
  
  const signalStatusData = [
    { name: 'Open', value: openSignals.length },
    { name: 'Closed', value: closedSignals.length },
  ];
  
  const COLORS = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B'];
  
  // Prepare performance by coin data
  const coinPerformance = Array.from(
    closedSignals.reduce((acc, signal) => {
      const coin = signal.coin;
      const profit = signal.profit || 0;
      
      if (!acc.has(coin)) {
        acc.set(coin, { coin, totalProfit: 0, count: 0 });
      }
      
      const data = acc.get(coin)!;
      data.totalProfit += profit;
      data.count += 1;
      
      return acc;
    }, new Map<string, { coin: string; totalProfit: number; count: number }>())
  ).map(([_, data]) => ({
    coin: data.coin,
    averageProfit: data.count > 0 ? (data.totalProfit / data.count).toFixed(2) : 0,
  }));
  
  return (
    <>
      {/* Header */}
      <section className="bg-primary-800 text-white py-10">
        <div className="container-custom">
          <div>
            <h1 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h1>
            <p className="text-primary-100">
              {currentPlan ? 
                `You're currently on the ${currentPlan.name} plan.` :
                "You don't have an active subscription plan yet."
              }
            </p>
          </div>
        </div>
      </section>
      
      {/* Dashboard Tabs */}
      <section className="bg-gray-100 border-b">
        <div className="container-custom">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              className={`px-4 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'overview' 
                  ? 'text-primary-700 border-b-2 border-primary-500' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'signals' 
                  ? 'text-primary-700 border-b-2 border-primary-500' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => setActiveTab('signals')}
            >
              My Signals
            </button>
            <button
              className={`px-4 py-3 font-medium transition-colors duration-200 ${
                activeTab === 'subscription' 
                  ? 'text-primary-700 border-b-2 border-primary-500' 
                  : 'text-gray-600 hover:text-primary-600'
              }`}
              onClick={() => setActiveTab('subscription')}
            >
              Subscription
            </button>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-8">
        <div className="container-custom">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                      <BarChart2 size={20} className="text-primary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-700">Total Signals</h3>
                  </div>
                  <p className="text-3xl font-bold">{totalSignals}</p>
                  <p className="text-sm text-gray-500 mt-1">Available with your plan</p>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-success-50 flex items-center justify-center mr-3">
                      <CheckSquare size={20} className="text-success-700" />
                    </div>
                    <h3 className="font-semibold text-gray-700">Successful Signals</h3>
                  </div>
                  <p className="text-3xl font-bold">{successfulSignals}</p>
                  <p className="text-sm text-gray-500 mt-1">Out of {closedSignals.length} closed</p>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                      <Percent size={20} className="text-accent-600" />
                    </div>
                    <h3 className="font-semibold text-gray-700">Success Rate</h3>
                  </div>
                  <p className="text-3xl font-bold">{successRate}%</p>
                  <p className="text-sm text-gray-500 mt-1">For closed signals</p>
                </div>
                
                <div className="card p-6">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 rounded-full bg-secondary-100 flex items-center justify-center mr-3">
                      <DollarSign size={20} className="text-secondary-600" />
                    </div>
                    <h3 className="font-semibold text-gray-700">Average Return</h3>
                  </div>
                  <p className="text-3xl font-bold">
                    {planStatistics[userPlan as keyof typeof planStatistics]?.avgReturn || 0}%
                  </p>
                  <p className="text-sm text-gray-500 mt-1">Per signal</p>
                </div>
              </div>
              
              {/* Charts Row 1 */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                {/* Monthly Performance Chart */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">Monthly Performance (%)</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={monthlyPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="month" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }} />
                        <Legend />
                        <Line 
                          type="monotone" 
                          dataKey="basic" 
                          stroke="#3B82F6" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                          name="Basic"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="pro" 
                          stroke="#14B8A6" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                          name="Pro"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="premium" 
                          stroke="#F59E0B" 
                          strokeWidth={2} 
                          activeDot={{ r: 8 }} 
                          name="Premium"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                
                {/* Signals Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4">Signal Types</h3>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={signalTypeData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {signalTypeData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} signals`, 'Count']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  
                  <div className="card p-6">
                    <h3 className="text-lg font-semibold mb-4">Signal Status</h3>
                    <div className="h-60">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={signalStatusData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {signalStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [`${value} signals`, 'Count']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Charts Row 2 */}
              <div className="grid grid-cols-1 gap-8">
                {/* Performance by Coin */}
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-4">Performance by Coin (%)</h3>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={coinPerformance}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                        <XAxis dataKey="coin" stroke="#6B7280" />
                        <YAxis stroke="#6B7280" />
                        <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #E5E7EB' }} />
                        <Legend />
                        <Bar 
                          dataKey="averageProfit" 
                          name="Average Profit (%)" 
                          fill="#3B82F6" 
                          radius={[4, 4, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Signals Tab */}
          {activeTab === 'signals' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Your Signals</h2>
              
              {/* Signal Status Summary */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-3">Available Signals</h3>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center mr-3">
                      <BarChart2 size={20} className="text-primary-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{signals.length}</p>
                      <p className="text-sm text-gray-500">Total signals</p>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-3">Open Signals</h3>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-accent-100 flex items-center justify-center mr-3">
                      <Clock size={20} className="text-accent-600" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{openSignals.length}</p>
                      <p className="text-sm text-gray-500">Active signals</p>
                    </div>
                  </div>
                </div>
                
                <div className="card p-6">
                  <h3 className="text-lg font-semibold mb-3">Closed Signals</h3>
                  <div className="flex items-center">
                    <div className="w-10 h-10 rounded-full bg-success-50 flex items-center justify-center mr-3">
                      <CheckSquare size={20} className="text-success-700" />
                    </div>
                    <div>
                      <p className="text-3xl font-bold">{closedSignals.length}</p>
                      <p className="text-sm text-gray-500">Completed signals</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Latest Signals */}
              <div className="card overflow-hidden mb-8">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h3 className="font-semibold">Latest Open Signals</h3>
                </div>
                
                <div className="overflow-x-auto">
                  {openSignals.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      No open signals available at the moment.
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Price</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stop Loss</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {openSignals.slice(0, 5).map((signal) => (
                          <tr key={signal.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{signal.coin}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className={`signal-${signal.type === 'buy' ? 'buy' : 'sell'}`}>
                                {signal.type}
                              </span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${signal.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-success-700">${signal.targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-danger-700">${signal.stopLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{format(new Date(signal.timestamp), 'MMM d, yyyy')}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
              
              {/* Recent Results */}
              <div className="card overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b">
                  <h3 className="font-semibold">Recent Results</h3>
                </div>
                
                <div className="overflow-x-auto">
                  {closedSignals.length === 0 ? (
                    <div className="p-6 text-center text-gray-500">
                      No closed signals available yet.
                    </div>
                  ) : (
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Coin</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Entry Price</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Closed Price</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profit/Loss</th>
                          <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {closedSignals.slice(0, 5).map((signal) => (
                          <tr key={signal.id} className="hover:bg-gray-50">
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">{signal.coin}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <span className={`signal-${signal.type === 'buy' ? 'buy' : 'sell'}`}>
                                {signal.type}
                              </span>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${signal.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">${signal.closedPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 8 })}</div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className={`text-sm font-medium ${
                                (signal.profit || 0) > 0 ? 'text-success-700' : 'text-danger-700'
                              }`}>
                                {(signal.profit || 0) > 0 ? '+' : ''}{signal.profit}%
                              </div>
                            </td>
                            <td className="py-4 px-4 whitespace-nowrap">
                              <div className="text-sm text-gray-500">{format(new Date(signal.timestamp), 'MMM d, yyyy')}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="animate-fade-in">
              <h2 className="text-2xl font-bold mb-6">Your Subscription</h2>
              
              {/* Current Plan */}
              <div className="card p-6 mb-8">
                <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
                
                {currentPlan ? (
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className={`w-4 h-4 rounded-full ${
                          currentPlan.id === 'basic' ? 'bg-primary-500' :
                          currentPlan.id === 'pro' ? 'bg-secondary-500' :
                          'bg-accent-500'
                        } mr-2`}></span>
                        <h4 className="text-xl font-bold">{currentPlan.name} Plan</h4>
                      </div>
                      
                      <p className="text-gray-600 mb-4">
                        You have access to {currentPlan.coins} cryptocurrency pairs with real-time signal alerts.
                      </p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <DollarSign size={16} className="mr-1" />
                          <span>${currentPlan.price}/month</span>
                        </div>
                        <div className="flex items-center">
                          <Calendar size={16} className="mr-1" />
                          <span>Renews on November 15, 2025</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6 md:mt-0">
                      <button className="btn-outline">
                        Manage Subscription
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 mx-auto bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                      <AlertTriangle size={24} className="text-yellow-500" />
                    </div>
                    <h4 className="text-xl font-semibold mb-2">No Active Subscription</h4>
                    <p className="text-gray-600 mb-6">
                      You don't have an active subscription plan. Choose a plan to get access to premium signals.
                    </p>
                    <a href="/plans" className="btn-primary">
                      View Plans
                    </a>
                  </div>
                )}
              </div>
              
              {/* Available Plans */}
              <h3 className="text-lg font-semibold mb-4">Available Plans</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan) => (
                  <div 
                    key={plan.id} 
                    className={`card overflow-hidden transition-all hover:shadow-lg ${
                      plan.id === userPlan ? 'border-2 border-primary-500' : ''
                    }`}
                  >
                    {plan.recommended && (
                      <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                        Popular
                      </div>
                    )}
                    
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                      <div className="flex items-end mb-4">
                        <span className="text-3xl font-bold">${plan.price}</span>
                        <span className="text-gray-600 ml-1">/month</span>
                      </div>
                      
                      <ul className="mb-6 space-y-2">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <TrendingUp size={18} className="text-primary-500 mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      
                      {plan.id === userPlan ? (
                        <button className="btn w-full bg-gray-100 text-gray-800 cursor-default">
                          Current Plan
                        </button>
                      ) : (
                        <button className={`btn w-full ${
                          plan.id === 'basic' ? 'bg-primary-600 hover:bg-primary-700' :
                          plan.id === 'pro' ? 'bg-secondary-600 hover:bg-secondary-700' :
                          'bg-accent-600 hover:bg-accent-700'
                        } text-white`}>
                          {userPlan ? 'Change Plan' : 'Select Plan'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default DashboardPage;
