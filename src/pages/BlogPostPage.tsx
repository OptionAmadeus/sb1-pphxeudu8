import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { PageLayout } from '../components/layout/PageLayout';
import { BlogPostContent } from '../components/blog/BlogPostContent';
import { blogPosts } from '../data/blogPosts';

export function BlogPostPage() {
  const { slug } = useParams();
  const post = blogPosts.find(p => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <PageLayout>
      <div className="max-w-4xl mx-auto">
        <BlogPostContent post={post} />
      </div>
    </PageLayout>
  );
}