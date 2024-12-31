import React, { useState } from 'react';
import { BarChart3, Brain } from 'lucide-react';
import { PortfolioSummary } from './PortfolioSummary';
import { AIRecommendations } from './AIRecommendations';
import { TabButton } from '../ui/TabButton';

type Tab = 'summary' | 'recommendations';

const TABS = [
  {
    id: 'summary' as const,
    label: 'Portfolio',
    icon: <BarChart3 className="w-5 h-5" />
  },
  {
    id: 'recommendations' as const,
    label: 'AI Insights',
    icon: <Brain className="w-5 h-5" />
  }
] as const;

export function PortfolioInsights() {
  const [activeTab, setActiveTab] = useState<Tab>('summary');

  return (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="border-b border-gray-200">
        <nav className="flex -mb-px" aria-label="Tabs">
          {TABS.map(tab => (
            <TabButton
              key={tab.id}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              icon={tab.icon}
              label={tab.label}
              className="flex-1 sm:flex-none justify-center"
            />
          ))}
        </nav>
      </div>
      
      <div className="p-4 sm:p-6">
        {activeTab === 'summary' ? (
          <PortfolioSummary />
        ) : (
          <AIRecommendations />
        )}
      </div>
    </div>
  );
}