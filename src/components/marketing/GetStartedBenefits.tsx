import React from 'react';
import { CheckCircle2, Brain, LineChart, Shield, Clock } from 'lucide-react';

const benefits = [
  {
    title: 'Early Access',
    description: 'Be among the first to experience our revolutionary AI-powered portfolio management platform.',
    icon: Clock
  },
  {
    title: 'AI-Powered Insights',
    description: 'Get personalized investment recommendations based on your goals and risk tolerance.',
    icon: Brain
  },
  {
    title: 'Real-time Analytics',
    description: 'Track your portfolio performance with live updates and detailed metrics.',
    icon: LineChart
  }
];

export function GetStartedBenefits() {
  return (
    <div className="lg:pl-12">
      <h3 className="text-2xl font-semibold text-gray-900 mb-8">
        Join the future of investing
      </h3>
      
      <div className="space-y-8">
        {benefits.map((benefit, index) => (
          <div key={index} className="flex gap-4">
            <div className="flex-shrink-0">
              <benefit.icon className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-900 mb-2">
                {benefit.title}
              </h4>
              <p className="text-gray-600">
                {benefit.description}
              </p>
            </div>
          </div>
        ))}

        <div className="border-t border-gray-200 pt-8">
          <div className="flex items-center gap-2 text-green-600">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Limited spots available</span>
          </div>
          <div className="flex items-center gap-2 text-green-600 mt-2">
            <CheckCircle2 className="w-5 h-5" />
            <span className="font-medium">Priority access to new features</span>
          </div>
        </div>
      </div>
    </div>
  );
}