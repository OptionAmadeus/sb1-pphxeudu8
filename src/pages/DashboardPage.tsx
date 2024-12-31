import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { PortfolioOverview } from '../components/portfolio/PortfolioOverview';
import { AIRecommendations } from '../components/ai/AIRecommendations';

export function DashboardPage() {
  return (
    <DashboardLayout>
      <Routes>
        <Route path="/" element={<PortfolioOverview />} />
        <Route path="/recommendations" element={<AIRecommendations />} />
      </Routes>
    </DashboardLayout>
  );
}