import React from 'react';

const currentYear = new Date().getFullYear();

export function AuthFooter() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="text-sm text-gray-500">
          <div className="mb-4">
            <p>
              Important Disclosures: The information provided by Self AI is for informational and educational purposes only. 
              It should not be considered as investment advice or a recommendation to buy or sell any particular security.
            </p>
            <p className="mt-2">
              Past performance is not indicative of future results. Investment involves risk, including possible loss of principal.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>© {currentYear} Self AI. All rights reserved.</p>
            <div className="mt-2 md:mt-0 space-x-4">
              <a href="/terms" className="hover:text-gray-900">Terms of Service</a>
              <a href="/privacy" className="hover:text-gray-900">Privacy Policy</a>
              <a href="/disclaimer" className="hover:text-gray-900">Investment Disclaimer</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}