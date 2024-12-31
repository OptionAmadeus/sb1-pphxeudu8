import React from 'react';
import { Mail } from 'lucide-react';

export function ContactInfo() {
  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex items-center gap-3 mb-4">
          <Mail className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-semibold">Email</h3>
        </div>
        <div>
          <p className="text-gray-600">Support:</p>
          <a href="mailto:support@selfai.com" className="text-blue-600 hover:text-blue-700">
            support@selfai.com
          </a>
        </div>
      </div>
    </div>
  );
}