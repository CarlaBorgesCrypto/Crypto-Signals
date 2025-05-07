import { Signal } from '../contexts/SignalsContext';

// Mock Signals Data
export const mockSignals: Signal[] = [
  {
    id: '1',
    coin: 'BTC/USDT',
    type: 'buy',
    entryPrice: 65000,
    targetPrice: 68000,
    stopLoss: 63000,
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    subscriptionLevel: 'basic',
  },
  {
    id: '2',
    coin: 'ETH/USDT',
    type: 'buy',
    entryPrice: 3500,
    targetPrice: 3800,
    stopLoss: 3300,
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'closed',
    closedPrice: 3850,
    profit: 10.0,
    subscriptionLevel: 'basic',
  },
  {
    id: '3',
    coin: 'SOL/USDT',
    type: 'sell',
    entryPrice: 140,
    targetPrice: 130,
    stopLoss: 150,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    subscriptionLevel: 'basic',
  },
  {
    id: '4',
    coin: 'XRP/USDT',
    type: 'buy',
    entryPrice: 0.65,
    targetPrice: 0.75,
    stopLoss: 0.60,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'closed',
    closedPrice: 0.58,
    profit: -10.8,
    subscriptionLevel: 'basic',
  },
  {
    id: '5',
    coin: 'BNB/USDT',
    type: 'buy',
    entryPrice: 580,
    targetPrice: 620,
    stopLoss: 560,
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    subscriptionLevel: 'pro',
  },
  {
    id: '6',
    coin: 'ADA/USDT',
    type: 'sell',
    entryPrice: 0.48,
    targetPrice: 0.43,
    stopLoss: 0.52,
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'closed',
    closedPrice: 0.44,
    profit: 8.3,
    subscriptionLevel: 'pro',
  },
  {
    id: '7',
    coin: 'AVAX/USDT',
    type: 'buy',
    entryPrice: 35.5,
    targetPrice: 39.0,
    stopLoss: 33.5,
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    subscriptionLevel: 'premium',
  },
  {
    id: '8',
    coin: 'LINK/USDT',
    type: 'buy',
    entryPrice: 16.8,
    targetPrice: 18.5,
    stopLoss: 15.5,
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'closed',
    closedPrice: 18.7,
    profit: 11.3,
    subscriptionLevel: 'premium',
  },
  {
    id: '9',
    coin: 'DOT/USDT',
    type: 'sell',
    entryPrice: 7.2,
    targetPrice: 6.5,
    stopLoss: 7.6,
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'open',
    subscriptionLevel: 'premium',
  },
  {
    id: '10',
    coin: 'DOGE/USDT',
    type: 'buy',
    entryPrice: 0.12,
    targetPrice: 0.14,
    stopLoss: 0.11,
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    status: 'closed',
    closedPrice: 0.14,
    profit: 16.7,
    subscriptionLevel: 'premium',
  },
];

// Mock Plan Statistics
export const planStatistics = {
  basic: {
    winRate: 68,
    avgReturn: 7.5,
    totalSignals: 42,
    successfulSignals: 28,
    monthlyCost: 49,
  },
  pro: {
    winRate: 76,
    avgReturn: 9.2,
    totalSignals: 65,
    successfulSignals: 49,
    monthlyCost: 99,
  },
  premium: {
    winRate: 84,
    avgReturn: 12.8,
    totalSignals: 92,
    successfulSignals: 77,
    monthlyCost: 199,
  }
};

// Mock Monthly Performance Data
export const monthlyPerformance = [
  { month: 'Jan', basic: 5.2, pro: 7.8, premium: 10.5 },
  { month: 'Feb', basic: 6.8, pro: 8.3, premium: 11.7 },
  { month: 'Mar', basic: 4.5, pro: 6.2, premium: 9.8 },
  { month: 'Apr', basic: 7.3, pro: 9.5, premium: 13.2 },
  { month: 'May', basic: 8.1, pro: 10.4, premium: 14.7 },
  { month: 'Jun', basic: 6.5, pro: 8.9, premium: 12.3 },
];

// Mock Subscription Plans
export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  coins: string[]; // Alterado para ser um array de strings
  features: string[];
  recommended?: boolean;
}

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: 'basic',
    name: 'Basic',
    price: 49,
    coins: ['BTC/USDT', 'ETH/USDT', 'SOL/USDT'], // Moedas do plano Basic
    features: [
      'Access to 3 crypto pairs',
      'Real-time signal updates',
      'Entry, target & stop loss alerts',
      'Basic email support',
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 99,
    coins: ['AVAX/USDT', 'BNB/USDT'], // Moedas do plano Pro
    features: [
      'Access to 5 crypto pairs',
      'Priority real-time updates',
      'Entry, target & stop loss alerts',
      'Trading strategy explanations',
      'Priority email support',
    ],
    recommended: true,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 199,
    coins: ['FARTCOIN/USDT', 'TRUMPCOIN/USDT', 'FXS/USDT'], // Moedas do plano Premium
    features: [
      'Access to 8+ crypto pairs',
      'Instant real-time updates',
      'Entry, target & stop loss alerts',
      'Advanced trading strategy discussions',
      'Market analysis reports',
      '24/7 priority support',
      'Private Discord community access',
    ],
  },
];

// Mock FAQ Data
export interface FaqItem {
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    question: 'How accurate are your crypto signals?',
    answer: 'Our signals achieve a success rate of 68-84% depending on the subscription plan. We continuously analyze market conditions using advanced technical and fundamental analysis to provide the most accurate signals possible.',
  },
  {
    question: 'How many signals will I receive per day?',
    answer: 'The number of signals varies based on market conditions. On average, subscribers receive 2-5 signals per day across all supported cryptocurrency pairs, but we prioritize quality over quantity.',
  },
  {
    question: 'What cryptocurrencies do you cover?',
    answer: 'We focus on major cryptocurrencies like BTC, ETH, SOL, XRP, and other popular altcoins. The specific coins you\'ll have access to depends on your subscription plan.',
  },
  {
    question: 'How will I receive the signals?',
    answer: 'Signals are delivered in real-time through our web platform. You can also opt to receive email or mobile push notifications for immediate alerts.',
  },
  {
    question: 'Can I cancel my subscription anytime?',
    answer: 'Yes, you can cancel your subscription at any time. Your access will remain active until the end of your current billing cycle.',
  },
  {
    question: 'Do you offer a refund policy?',
    answer: 'We offer a 7-day money-back guarantee for new subscribers who are not satisfied with our service.',
  },
  {
    question: 'What information is included in each signal?',
    answer: 'Each signal includes the cryptocurrency pair, signal type (buy/sell), entry price, target price, stop loss level, and sometimes additional notes on the trade strategy.',
  },
  {
    question: 'Are the signals suitable for beginners?',
    answer: 'Yes, our signals are designed to be straightforward and easy to follow for traders of all experience levels. However, we recommend having basic knowledge of cryptocurrency trading.',
  },
];
