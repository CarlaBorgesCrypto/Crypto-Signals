import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, ChevronRight, TrendingDown, BarChart, Shield, Clock } from 'lucide-react';
import { monthlyPerformance, planStatistics } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const HomePage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-900 to-primary-700 text-white">
        <div className="container-custom py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-in">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Professional Crypto Signals for Maximized Trading Profits
              </h1>
              <p className="text-lg md:text-xl mb-8 text-primary-100">
                Join thousands of successful traders using our premium signals with up to 84% win rate.
                Real-time updates, accurate entries, and profit targets.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/plans" className="btn bg-accent-500 hover:bg-accent-600 text-white">
                  View Plans
                </Link>
                <Link to={user ? "/signals" : "/auth"} className="btn bg-white hover:bg-gray-100 text-primary-800">
                  {user ? "View Signals" : "Get Started"}
                </Link>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyPerformance}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
                    <XAxis dataKey="month" stroke="#D1D5DB" />
                    <YAxis stroke="#D1D5DB" unit="%" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '0.5rem' }}
                      labelStyle={{ color: '#F3F4F6' }}
                      itemStyle={{ color: '#F3F4F6' }}
                    />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="basic" 
                      stroke="#60A5FA" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                      name="Basic Plan"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="pro" 
                      stroke="#2DD4BF" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                      name="Pro Plan"
                    />
                    <Line 
                      type="monotone" 
                      dataKey="premium" 
                      stroke="#FCD34D" 
                      strokeWidth={2} 
                      dot={{ r: 4 }} 
                      activeDot={{ r: 6 }} 
                      name="Premium Plan"
                    />
                  </LineChart>
                </ResponsiveContainer>
                <p className="text-center text-sm text-primary-200 mt-3">
                  Monthly performance (%) for each subscription plan
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Choose Our Crypto Signals</h2>
            <p className="text-lg text-gray-300">
              We combine advanced technical analysis with years of market expertise 
              to deliver accurate and profitable trading signals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="card p-6 transition-transform duration-300 hover:-translate-y-2 bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">High Accuracy Signals</h3>
              <p className="text-gray-300">
                Our signals achieve up to 84% success rate, carefully analyzed by our team of professional traders.
              </p>
            </div>
            
            <div className="card p-6 transition-transform duration-300 hover:-translate-y-2 bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-secondary-100 text-secondary-600 mb-4">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Real-Time Updates</h3>
              <p className="text-gray-300">
                Receive instant notifications for new signals, target hits, and stop losses, helping you maximize profits.
              </p>
            </div>
            
            <div className="card p-6 transition-transform duration-300 hover:-translate-y-2 bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-4">
                <Shield size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Risk Management</h3>
              <p className="text-gray-300">
                Every signal includes precise entry, target and stop-loss levels to protect your capital and maximize returns.
              </p>
            </div>
            
            <div className="card p-6 transition-transform duration-300 hover:-translate-y-2 bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-success-50 text-success-700 mb-4">
                <BarChart size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Performance Tracking</h3>
              <p className="text-gray-300">
                Track the performance of all signals, with detailed statistics and historical performance data.
              </p>
            </div>
            
            <div className="card p-6 transition-transform duration-300 hover:-translate-y-2 bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-primary-100 text-primary-600 mb-4">
                <TrendingDown size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Bear Market Protection</h3>
              <p className="text-gray-300">
                Our signals work in all market conditions, including both bullish and bearish trends for consistent profits.
              </p>
            </div>
            
            <div className="card p-6 transition-transform duration-300 hover:-translate-y-2 bg-gray-800">
              <div className="w-12 h-12 flex items-center justify-center rounded-full bg-accent-100 text-accent-600 mb-4">
                <TrendingUp size={24} />
              </div>
              <h3 className="text-xl font-semibold mb-3">Diverse Cryptocurrency Portfolio</h3>
              <p className="text-gray-300">
                Access signals for a variety of top cryptocurrencies, from Bitcoin to promising altcoins.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Stats Section */}
      <section className="section bg-gray-900 text-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold mb-4">Performance Statistics</h2>
            <p className="text-lg text-gray-300">
              Our signals have helped thousands of traders maximize their profits.
              Here's how our different plans perform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {['basic', 'pro', 'premium'].map((plan) => (
              <div key={plan} className="card overflow-hidden bg-gray-800">
                <div className={`p-4 text-white ${
                  plan === 'basic' ? 'bg-primary-600' : 
                  plan === 'pro' ? 'bg-secondary-600' : 'bg-accent-600'
                }`}>
                  <h3 className="text-xl font-semibold">
                    {plan.charAt(0).toUpperCase() + plan.slice(1)} Plan
                  </h3>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-300 mb-1">Win Rate</p>
                      <p className="text-2xl font-bold text-white">
                        {planStatistics[plan as keyof typeof planStatistics].winRate}%
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-300 mb-1">Avg. Return</p>
                      <p className="text-2xl font-bold text-white">
                        {planStatistics[plan as keyof typeof planStatistics].avgReturn}%
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-300 mb-1">Total Signals</p>
                      <p className="text-2xl font-bold text-white">
                        {planStatistics[plan as keyof typeof planStatistics].totalSignals}
                      </p>
                    </div>
                    
                    <div className="text-center p-4 bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-300 mb-1">Successful</p>
                      <p className="text-2xl font-bold text-white">
                        {planStatistics[plan as keyof typeof planStatistics].successfulSignals}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6">
                    <Link
                      to="/plans"
                      className={`btn w-full ${
                        plan === 'basic' ? 'bg-primary-600 hover:bg-primary-700' : 
                        plan === 'pro' ? 'bg-secondary-600 hover:bg-secondary-700' : 
                        'bg-accent-600 hover:bg-accent-700'
                      } text-white`}
                    >
                      Get Started
                      <ChevronRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Maximizing Your Trading Profits?
            </h2>
            <p className="text-lg text-gray-300 mb-8">
              Join our community of successful traders and gain access to premium crypto signals today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/plans" className="btn bg-accent-500 hover:bg-accent-600 text-white">
                View Subscription Plans
              </Link>
              <Link to="/signals" className="btn bg-white hover:bg-gray-100 text-gray-900">
                See Example Signals
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomePage;
