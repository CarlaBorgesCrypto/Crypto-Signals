import React from 'react';
import { Check, X, ChevronRight } from 'lucide-react';
import { subscriptionPlans } from '../data/mockData';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const PlansPage: React.FC = () => {
  const { user } = useAuth();
  
  return (
    <>
      {/* Header */}
      <section className="bg-primary-900 text-white py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">Subscription Plans</h1>
            <p className="text-xl text-primary-100">
              Choose the perfect plan for your trading needs. Upgrade or downgrade anytime.
            </p>
          </div>
        </div>
      </section>
      
      {/* Plans */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {subscriptionPlans.map((plan) => (
                <div 
                  key={plan.id} 
                  className={`card relative overflow-hidden transition-all duration-300 hover:shadow-lg ${
                    plan.recommended ? 'border-2 border-accent-500 scale-105 md:translate-y-0' : ''
                  } bg-gray-800`}
                >
                  {plan.recommended && (
                    <div className="absolute top-0 right-0 bg-accent-500 text-white text-xs font-semibold px-3 py-1 uppercase tracking-wider">
                      Popular
                    </div>
                  )}
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2 text-white">{plan.name}</h3>
                    <div className="flex items-end mb-6">
                      <span className="text-4xl font-bold text-white">${plan.price}</span>
                      <span className="text-gray-400 ml-1">/month</span>
                    </div>
                    
                    <div className="mb-6">
                      <p className="text-gray-400 mb-4">
                        Access to <span className="font-semibold">{plan.coins} crypto pairs</span>
                      </p>
                      <ul className="space-y-3">
                        {plan.features.map((feature, index) => (
                          <li key={index} className="flex items-start">
                            <Check size={18} className="text-success-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Link
                      to={user ? "/dashboard" : "/auth"}
                      className={`btn w-full ${
                        plan.id === 'basic' ? 'bg-primary-600 hover:bg-primary-700' :
                        plan.id === 'pro' ? 'bg-secondary-600 hover:bg-secondary-700' :
                        'bg-accent-600 hover:bg-accent-700'
                      } text-white`}
                    >
                      {user ? 'Select Plan' : 'Sign Up Now'}
                      <ChevronRight size={18} className="ml-1" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Plan Comparison */}
      <section className="section bg-gray-800">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Plans Comparison</h2>
            <p className="text-lg text-gray-400">
              Compare our subscription plans to find the one that suits your trading needs.
            </p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-700">
                  <th className="py-4 px-6 text-left text-gray-400 font-semibold">Features</th>
                  <th className="py-4 px-6 text-center bg-gray-700 text-primary-400 font-semibold">Basic</th>
                  <th className="py-4 px-6 text-center bg-gray-700 text-secondary-400 font-semibold">Pro</th>
                  <th className="py-4 px-6 text-center bg-gray-700 text-accent-400 font-semibold">Premium</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Monthly Price</td>
                  <td className="py-4 px-6 text-center text-white">$49</td>
                  <td className="py-4 px-6 text-center text-white">$99</td>
                  <td className="py-4 px-6 text-center text-white">$199</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Cryptocurrency Pairs</td>
                  <td className="py-4 px-6 text-center text-white">3</td>
                  <td className="py-4 px-6 text-center text-white">5</td>
                  <td className="py-4 px-6 text-center text-white">8+</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Average Win Rate</td>
                  <td className="py-4 px-6 text-center text-white">68%</td>
                  <td className="py-4 px-6 text-center text-white">76%</td>
                  <td className="py-4 px-6 text-center text-white">84%</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Average Monthly Return</td>
                  <td className="py-4 px-6 text-center text-white">7.5%</td>
                  <td className="py-4 px-6 text-center text-white">9.2%</td>
                  <td className="py-4 px-6 text-center text-white">12.8%</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Real-time Updates</td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Entry/Target/Stop Loss Alerts</td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Trading Strategy Explanations</td>
                  <td className="py-4 px-6 text-center">
                    <X size={18} className="text-danger-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Market Analysis Reports</td>
                  <td className="py-4 px-6 text-center">
                    <X size={18} className="text-danger-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X size={18} className="text-danger-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">24/7 Priority Support</td>
                  <td className="py-4 px-6 text-center">
                    <X size={18} className="text-danger-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-4 px-6 text-gray-300 font-medium">Private Discord Community</td>
                  <td className="py-4 px-6 text-center">
                    <X size={18} className="text-danger-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <X size={18} className="text-danger-500 inline" />
                  </td>
                  <td className="py-4 px-6 text-center">
                    <Check size={18} className="text-success-500 inline" />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>
      
      {/* FAQ */}
      <section className="section bg-gray-900">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold mb-4 text-white">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-400">
              Have questions about our subscription plans? Find answers below.
            </p>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              <div className="card p-6 bg-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-white">Can I change my plan later?</h3>
                <p className="text-gray-400">
                  Yes, you can upgrade or downgrade your plan at any time. Changes take effect at the start of your next billing cycle.
                </p>
              </div>
              
              <div className="card p-6 bg-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-white">Is there a trial period?</h3>
                <p className="text-gray-400">
                  We offer a 7-day money-back guarantee for new subscribers. If you're not satisfied with our signals, you can request a full refund within the first week.
                </p>
              </div>
              
              <div className="card p-6 bg-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-white">How do payments work?</h3>
                <p className="text-gray-400">
                  We accept major credit cards and cryptocurrencies. Subscriptions are billed monthly and you can cancel anytime before the next billing cycle.
                </p>
              </div>
              
              <div className="card p-6 bg-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-white">Which cryptocurrencies are included?</h3>
                <p className="text-gray-400">
                  The Basic plan includes BTC, ETH, and SOL. The Pro plan adds XRP and BNB. The Premium plan includes all major cryptocurrencies and selected promising altcoins.
                </p>
              </div>
              
              <div className="card p-6 bg-gray-800">
                <h3 className="text-xl font-semibold mb-3 text-white">Can I cancel my subscription?</h3>
                <p className="text-gray-400">
                  Yes, you can cancel your subscription at any time through your account settings. Your access will remain active until the end of your current billing period.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="section bg-primary-900 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Start Trading with Confidence Today
            </h2>
            <p className="text-xl text-primary-100 mb-8">
              Choose your plan and join thousands of successful traders who rely on our signals.
            </p>
            <Link to={user ? "/dashboard" : "/auth"} className="btn bg-accent-500 hover:bg-accent-600 text-white text-lg px-8 py-3">
              {user ? 'Choose Your Plan' : 'Sign Up Now'}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default PlansPage;
