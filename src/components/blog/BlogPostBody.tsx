import React from 'react';
import type { BlogPost } from '@/types/blog';
import { getPostContent } from '@/utils/blog';

interface BlogPostBodyProps {
  post: BlogPost;
}

export function BlogPostBody({ post }: BlogPostBodyProps) {
  const content = getPostContent(post.slug);

  return (
    <div className="prose prose-lg max-w-none">
      <p className="lead text-xl text-gray-600 mb-8">{post.excerpt}</p>
      {content}
    </div>
  );
}