import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { FAQSection } from '../components/faq/FAQSection';
import { HelpCircle } from 'lucide-react';

export function FAQPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <HelpCircle className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about our AI-powered portfolio management platform.
          </p>
        </div>

        <FAQSection />

        <div className="mt-12 text-center p-8 bg-blue-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
          <p className="text-gray-600 mb-6">
            Can't find the answer you're looking for? Our support team is here to help.
          </p>
          <a
            href="mailto:support@selfai.com"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Contact Support
          </a>
        </div>
      </div>
    </PageLayout>
  );
}