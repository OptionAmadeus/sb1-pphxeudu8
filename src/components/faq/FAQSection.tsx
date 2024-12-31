import React from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQItem } from './FAQItem';

const faqs = [
  {
    question: "What is Self AI?",
    answer: "Self AI is an advanced portfolio management platform that uses artificial intelligence to provide personalized investment recommendations, real-time analytics, and comprehensive performance tracking. Our platform helps investors make smarter, data-driven decisions."
  },
  {
    question: "How does the AI technology work?",
    answer: "Our AI analyzes vast amounts of market data, news, trends, and historical performance to generate insights and recommendations. It continuously learns from market patterns and adapts to changing conditions to provide you with the most relevant investment suggestions."
  },
  {
    question: "Is my investment data secure?",
    answer: "Yes, we implement bank-level security measures including end-to-end encryption, secure authentication, and regular security audits. Your data is protected by enterprise-grade infrastructure and follows industry best practices for data protection."
  },
  {
    question: "What types of assets can I track?",
    answer: "Self AI supports a wide range of digital assets including cryptocurrencies, tokens, and NFTs. Our platform provides real-time tracking, performance analytics, and portfolio optimization across multiple blockchain networks."
  },
  {
    question: "How accurate are the AI recommendations?",
    answer: "Our AI recommendations are based on comprehensive market analysis and historical data. Each recommendation comes with a confidence score and detailed reasoning. However, all investment decisions should be made with careful consideration of your personal investment goals and risk tolerance."
  }
];

export function FAQSection() {
  return (
    <div className="divide-y divide-gray-200">
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </div>
  );
}