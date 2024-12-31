import React from 'react';
import { PageLayout } from '../components/layout/PageLayout';
import { BlogList } from '../components/blog/BlogList';
import { BookOpen } from 'lucide-react';

export function BlogPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <BookOpen className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Latest Insights
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Expert analysis on AI, cryptocurrency, and investment strategies from the Self AI team.
          </p>
        </div>

        <BlogList />
      </div>
    </PageLayout>
  );
}