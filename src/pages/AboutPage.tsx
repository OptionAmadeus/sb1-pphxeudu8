import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { Users, Target, Award, Shield } from 'lucide-react';

export function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About Self AI</h1>
        
        <div className="prose prose-lg mb-12">
          <p className="text-xl text-gray-600">
            We're on a mission to democratize intelligent investing by making AI-powered portfolio 
            management accessible to everyone. Our platform combines cutting-edge artificial intelligence 
            with intuitive design to help investors make smarter, data-driven decisions.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <Users className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Team</h3>
            <p className="text-gray-600">
              We're a diverse team of experts in artificial intelligence, finance, and technology, 
              united by our passion for democratizing advanced investment tools.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Target className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600">
              To empower investors of all levels with AI-driven insights and tools that were 
              previously only available to institutional investors.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Award className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <p className="text-gray-600">
              We believe in transparency, continuous innovation, and putting our users first 
              in everything we do. Your success is our success.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <Shield className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Our Commitment</h3>
            <p className="text-gray-600">
              We're committed to maintaining the highest standards of security and privacy 
              while delivering cutting-edge investment technology.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Us on Our Journey</h2>
          <p className="text-gray-600 mb-6">
            We're building the future of investment management, and we'd love for you to be part of it. 
            Whether you're a seasoned investor or just getting started, Self AI is here to help you 
            achieve your financial goals.
          </p>
          <img
            src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=800"
            alt="Team collaboration"
            className="rounded-lg shadow-md w-full"
          />
        </div>
      </div>
    </PageLayout>
  );
}