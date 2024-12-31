import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { formatDate } from '@/utils/formatters/date';
import type { BlogPost as BlogPostType } from '@/types/blog';

interface BlogPostProps {
  post: BlogPostType;
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-64 object-cover"
      />
      <div className="p-6">
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        <span className="inline-block px-2 py-1 text-xs font-medium rounded bg-blue-100 text-blue-800 mb-3">
          {post.category}
        </span>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          {post.title}
        </h2>
        <p className="text-gray-600 mb-4">
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{post.author}</span>
          <a 
            href={`/blog/${post.slug}`}
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Read more →
          </a>
        </div>
      </div>
    </article>
  );
}