import React from 'react';
import { Brain, LineChart, Shield, History, Zap, Users } from 'lucide-react';

const features = [
  {
    name: 'AI-Powered Insights',
    description: 'Our advanced machine learning algorithms analyze market trends, news, and historical data to provide personalized investment recommendations.',
    icon: Brain
  },
  {
    name: 'Real-time Analytics',
    description: 'Track your portfolio performance with live updates, detailed metrics, and comprehensive visualizations of your investment journey.',
    icon: LineChart
  },
  {
    name: 'Bank-Level Security',
    description: 'Rest easy knowing your data is protected by enterprise-grade encryption and security measures that meet the highest industry standards.',
    icon: Shield
  },
  {
    name: 'Historical Analysis',
    description: 'Gain valuable insights from past performance with our advanced historical analysis tools and pattern recognition algorithms.',
    icon: History
  },
  {
    name: 'Smart Alerts',
    description: 'Stay informed with intelligent notifications about market movements, opportunities, and potential risks affecting your portfolio.',
    icon: Zap
  },
  {
    name: 'Community Insights',
    description: 'Learn from and share with a community of successful investors while maintaining complete privacy and control over your data.',
    icon: Users
  }
];

export function Features() {
  return (
    <div className="bg-gray-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Features</h2>
          <p className="mt-2 text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Everything you need to succeed
          </p>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
            Our comprehensive suite of tools helps you make better investment decisions with the power of artificial intelligence.
          </p>
        </div>

        <div className="mt-20">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="pt-6">
                <div className="flow-root bg-white rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-md shadow-lg">
                        <feature.icon className="h-6 w-6 text-white" aria-hidden="true" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium tracking-tight text-gray-900">
                      {feature.name}
                    </h3>
                    <p className="mt-5 text-base text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}