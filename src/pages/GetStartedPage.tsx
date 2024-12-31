import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { GetStartedForm } from '../components/marketing/GetStartedForm';
import { GetStartedBenefits } from '../components/marketing/GetStartedBenefits';

export function GetStartedPage() {
  return (
    <PageLayout showGetStarted={false}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <GetStartedForm />
          <GetStartedBenefits />
        </div>
      </div>
    </PageLayout>
  );
}