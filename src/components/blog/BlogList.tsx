import React from 'react';
import { BlogPost } from './BlogPost';
import { blogPosts } from '@/data/blogPosts';

export function BlogList() {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogPosts.map(post => (
        <BlogPost key={post.slug} post={post} />
      ))}
    </div>
  );
}