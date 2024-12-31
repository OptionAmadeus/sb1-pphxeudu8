import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-start justify-between text-left"
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <ChevronDown
          className={`ml-6 h-6 w-6 flex-shrink-0 text-gray-400 transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      {isOpen && (
        <div className="mt-4">
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
}