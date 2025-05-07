import React, { useState } from 'react';
import { format } from 'date-fns';
import { useSignals } from '../contexts/SignalsContext';
import { ArrowUpCircle, ArrowDownCircle, X, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const SignalsPage: React.FC = () => {
  const { signals, isLoading } = useSignals();
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  // Define subscription levels based on coins
  const subscriptionLevels: { [key: string]: string } = {
    'BTC/USDT': 'basic',
    'ETH/USDT': 'basic',
    'SOL/USDT': 'basic',
    'AVAX/USDT': 'pro',
    'BNB/USDT': 'pro',
    'FARTCOIN/USDT': 'premium',
    'TRUMPCOIN/USDT': 'premium',
    'FXS/USDT': 'premium',
    // Add more coins and their levels as needed
  };

  // Simulate user subscription level (this should come from your user context or state)
  const userSubscriptionLevel = 'basic'; // Change this to 'pro' or 'premium' as needed
  
  // Apply search filter
  const filteredSignals = signals.filter(signal => 
    signal.coin.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to check if the user can view the signal based on their subscription level
  const canViewSignal = (signal: any) => {
    if (userSubscriptionLevel === 'basic') {
      return subscriptionLevels[signal.coin] === 'basic';
    } else if (userSubscriptionLevel === 'pro') {
      return ['basic', 'pro'].includes(subscriptionLevels[signal.coin]);
    } else if (userSubscriptionLevel === 'premium') {
      return true; // Premium users can see all signals
    }
    return false;
  };

  // Separate open and closed signals
  const openSignals = filteredSignals.filter(signal => signal.status === 'open' && canViewSignal(signal));
  const closedSignals = filteredSignals.filter(signal => signal.status === 'closed');
  
  // Sort open signals by timestamp (newest first)
  const sortedOpenSignals = openSignals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  
  // Sort closed signals by timestamp (newest first)
  const sortedClosedSignals = closedSignals.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());

  // Function to determine subscription level based on coin
  const getSubscriptionLevel = (coin: string) => {
    return subscriptionLevels[coin] || 'premium'; // Default to 'premium' if coin is not found
  };

  // Function to calculate profit percentage
  const calculateProfitPercentage = (entryPrice: number, targetPrice: number) => {
    return ((targetPrice - entryPrice) / entryPrice * 100).toFixed(2);
  };

  // Function to calculate loss percentage
  const calculateLossPercentage = (entryPrice: number, stopLoss: number) => {
    return ((entryPrice - stopLoss) / entryPrice * 100).toFixed(2);
  };
  
  return (
    <>
      {/* Signals Section */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold mb-4 md:mb-0 text-white">Latest Trading Signals</h2>
            
            <div className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Search by coin..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input bg-gray-700 text-white"
              />
              <button
                onClick={() => setSearchTerm('')}
                className="btn-outline text-white"
              >
                <X size={16} className="mr-1" />
                Clear
              </button>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="spinner border-t-4 border-primary-500 border-solid rounded-full w-12 h-12 mx-auto animate-spin"></div>
              <p className="mt-4 text-gray-400">Loading signals...</p>
            </div>
          ) : (
            <>
              {/* Open Signals */}
              <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                <Clock size={20} className="mr-2 text-primary-600" />
                Open Signals ({sortedOpenSignals.length})
              </h3>
              
              {sortedOpenSignals.length === 0 ? (
                <div className="card p-6 mb-8 text-center text-gray-500 bg-gray-800">
                  No open signals match the current search.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {sortedOpenSignals.map((signal) => (
                    <div key={signal.id} className="card overflow-hidden transition-all hover:shadow-md bg-gray-800">
                      <div className={`py-2 px-4 ${signal.type === 'buy' ? 'bg-success-500' : 'bg-danger-500'} text-white flex justify-between items-center`}>
                        <span className="font-semibold">{signal.coin}</span>
                        <span className="flex items-center uppercase text-sm">
                          {signal.type === 'buy' ? (
                            <>
                              <ArrowUpCircle size={16} className="mr-1" />
                              Buy
                            </>
                          ) : (
                            <>
                              <ArrowDownCircle size={16} className="mr-1" />
                              Sell
                            </>
                          )}
                        </span>
                      </div>
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-2 mb-4">
                          <div>
                            <p className="text-sm text-gray-400">Entry Price</p>
                            <p className="font-semibold text-white">${signal.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Target</p>
                            <p className="font-semibold text-success-700">${signal.targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({signal.type === 'sell' ? Math.abs(calculateProfitPercentage(signal.entryPrice, signal.targetPrice)) : calculateProfitPercentage(signal.entryPrice, signal.targetPrice)}%)</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Stop Loss</p>
                            <p className="font-semibold text-danger-700">${signal.stopLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ({signal.type === 'sell' ?+ calculateLossPercentage(signal.entryPrice, signal.stopLoss) :  '-' + calculateLossPercentage(signal.entryPrice, signal.stopLoss)}%)</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-sm text-gray-400">
                            {format(new Date(signal.timestamp), 'MMM d, yyyy • HH:mm')}
                          </div>
                          <div className={`text-xs font-semibold py-1 px-2 rounded-full uppercase ${
                            getSubscriptionLevel(signal.coin) === 'basic' ? 'bg-blue-100 text-blue-800' :
                            getSubscriptionLevel(signal.coin) === 'pro' ? 'bg-teal-100 text-teal-800' :
                            'bg-amber-100 text-amber-800'
                          }`}>
                            {getSubscriptionLevel(signal.coin)}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              
              {/* Closed Signals */}
              <h3 className="text-xl font-semibold mb-4 flex items-center text-white">
                <CheckCircle size={20} className="mr-2 text-success-700" />
                Closed Signals ({sortedClosedSignals.length})
              </h3>
              
              {sortedClosedSignals.length === 0 ? (
                <div className="card p-6 text-center text-gray-500 bg-gray-800">
                  No closed signals match the current search.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse bg-gray-800 rounded-lg shadow-sm">
                    <thead>
                      <tr className="bg-gray-700">
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Coin</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Type</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Entry</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Target</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Stop Loss</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Closed</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Profit/Loss</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Date</th>
                        <th className="py-3 px-4 text-left text-gray-400 font-semibold">Level</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedClosedSignals.map((signal) => (
                        <tr key={signal.id} className="border-t border-gray-700 hover:bg-gray-700">
                          <td className="py-3 px-4 text-white">{signal.coin}</td>
                          <td className="py-3 px-4">
                            <span className={`signal-${signal.type === 'buy' ? 'buy' : 'sell'}`}>
                              {signal.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-white">${signal.entryPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="py-3 px-4 text-white">${signal.targetPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="py-3 px-4 text-white">${signal.stopLoss.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className="py-3 px-4 text-white">${signal.closedPrice?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                          <td className={`py-3 px-4 font-semibold ${
                            (signal.profit || 0) > 0 ? 'text-success-700' : 'text-danger-700'
                          }`}>
                            {(signal.type === 'sell' ? '+' : '')}{(signal.profit || 0)}%
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-400">
                            {format(new Date(signal.timestamp), 'MMM d, yyyy')}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`text-xs font-semibold py-1 px-2 rounded-full uppercase ${
                              getSubscriptionLevel(signal.coin) === 'basic' ? 'bg-blue-100 text-blue-800' :
                              getSubscriptionLevel(signal.coin) === 'pro' ? 'bg-teal-100 text-teal-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {getSubscriptionLevel(signal.coin)}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      
      {/* Disclaimer */}
      <section className="py-8 bg-gray-800">
        <div className="container-custom">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
            <AlertTriangle className="text-yellow-500 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h4 className="font-semibold text-yellow-800 mb-1">Trading Disclaimer</h4>
              <p className="text-sm text-yellow-700">
                All signals provided are for informational purposes only and do not constitute financial advice. 
                Cryptocurrency trading involves significant risk. Past performance is not indicative of future results. 
                Always do your own research before trading.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="section bg-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready for Premium Trading Signals?
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Subscribe now to get real-time signals with up to 84% win rate and maximize your trading profits.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="/plans" className="btn bg-accent-500 hover:bg-accent-600 text-white text-lg px-8 py-3">
                View Plans
              </a>
              <a href="/auth" className="btn bg-white hover:bg-gray-100 text-primary-800 text-lg px-8 py-3">
                Sign Up Now
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignalsPage;
