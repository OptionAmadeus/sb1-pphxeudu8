import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { ContactInfo } from '../components/contact/ContactInfo';

export function ContactPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Contact Us</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our AI-powered portfolio management platform? We're here to help.
          </p>
        </div>

        <ContactInfo />

        <div className="mt-16">
          <div className="bg-blue-50 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Enterprise Solutions</h2>
            <p className="text-gray-600 mb-6 max-w-3xl">
              Looking for enterprise-grade AI portfolio management solutions? Our team is ready to discuss 
              custom implementations and dedicated support options for your organization.
            </p>
            <a 
              href="mailto:enterprise@selfai.com"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
            >
              Contact Enterprise Sales
            </a>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}