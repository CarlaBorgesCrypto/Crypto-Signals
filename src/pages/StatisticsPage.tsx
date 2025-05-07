import React from 'react';

const StatisticsPage: React.FC = () => {
  return (
    <>
      {/* Header */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Statistics</h1>
            <p className="text-xl text-primary-100">
              Track your performance and analyze your trading results.
            </p>
          </div>
        </div>
      </section>
      
      {/* Overview Section */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white mb-4">Overview</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg text-white">Total Signals</h3>
                <p className="text-gray-300">10 Available with your plan</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg text-white">Successful Signals</h3>
                <p className="text-gray-300">4 Out of 5 closed</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg text-white">Success Rate</h3>
                <p className="text-gray-300">80% For closed signals</p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <h3 className="text-lg text-white">Average Return</h3>
                <p className="text-gray-300">7.5% Per signal</p>
              </div>
            </div>
          </div>
          {/* Placeholder for Monthly Performance Graph */}
          <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center mb-4">
            <span className="text-gray-400">Monthly Performance Graph Placeholder</span>
          </div>
        </div>
      </section>

      {/* My Signals Section */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white mb-4">My Signals</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <table className="min-w-full">
              <thead>
                <tr>
                  <th className="text-left text-gray-300">Signal</th>
                  <th className="text-left text-gray-300">Status</th>
                  <th className="text-left text-gray-300">Profit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-gray-400">BTC/USD</td>
                  <td className="text-gray-400">Active</td>
                  <td className="text-gray-400">+5%</td>
                </tr>
                <tr>
                  <td className="text-gray-400">ETH/USD</td>
                  <td className="text-gray-400">Closed</td>
                  <td className="text-gray-400">+10%</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-white mb-4">Subscription</h2>
          <div className="bg-gray-800 rounded-lg p-4">
            <p className="text-gray-400">Current Plan: Premium</p>
            <p className="text-gray-400">Renewal Date: 01/01/2023</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Example Statistic Cards */}
              <div className="card bg-gray-800 p-6">
                <h3 className="text-2xl font-bold text-white">Total Trades</h3>
                <p className="text-xl text-gray-400">150</p>
              </div>
              <div className="card bg-gray-800 p-6">
                <h3 className="text-2xl font-bold text-white">Win Rate</h3>
                <p className="text-xl text-gray-400">75%</p>
              </div>
              <div className="card bg-gray-800 p-6">
                <h3 className="text-2xl font-bold text-white">Total Profit</h3>
                <p className="text-xl text-gray-400">$5,000</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Performance Graph */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Performance Over Time</h2>
            <p className="text-lg text-gray-400">
              Analyze your trading performance over the past months.
            </p>
          </div>
          {/* Placeholder for Graph */}
          <div className="bg-gray-800 h-64 rounded-lg flex items-center justify-center">
            <span className="text-gray-400">Graph Placeholder</span>
          </div>
        </div>
      </section>
      
      {/* Tips Section */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Trading Tips</h2>
            <p className="text-lg text-gray-400">
              Improve your trading skills with these tips.
            </p>
          </div>
          <ul className="space-y-4">
            <li className="card bg-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white">1. Set Realistic Goals</h3>
              <p className="text-gray-400">Define what you want to achieve with your trading.</p>
            </li>
            <li className="card bg-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white">2. Manage Your Risk</h3>
              <p className="text-gray-400">Always use stop-loss orders to protect your capital.</p>
            </li>
            <li className="card bg-gray-800 p-6">
              <h3 className="text-xl font-semibold text-white">3. Stay Informed</h3>
              <p className="text-gray-400">Keep up with market news and trends.</p>
            </li>
          </ul>
        </div>
      </section>
    </>
  );
};

export default StatisticsPage;
