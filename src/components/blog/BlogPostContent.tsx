import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowLeft } from 'lucide-react';
import { formatDate } from '@/utils/formatters/date';
import type { BlogPost } from '@/types/blog';
import { BlogPostBody } from './BlogPostBody';
import { RelatedPosts } from './RelatedPosts';

interface BlogPostContentProps {
  post: BlogPost;
}

export function BlogPostContent({ post }: BlogPostContentProps) {
  return (
    <article className="bg-white rounded-lg shadow-lg overflow-hidden">
      <img 
        src={post.imageUrl} 
        alt={post.title}
        className="w-full h-96 object-cover"
      />
      
      <div className="p-8">
        <Link 
          to="/blog"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Blog
        </Link>

        <div className="mb-6">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-blue-100 text-blue-800">
            {post.category}
          </span>
        </div>

        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {post.title}
        </h1>

        <div className="flex items-center gap-6 text-gray-500 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            <time dateTime={post.date}>{formatDate(new Date(post.date))}</time>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5" />
            <span>{post.readTime} min read</span>
          </div>
          <span className="text-gray-500">{post.author}</span>
        </div>

        <BlogPostBody post={post} />
      </div>

      <div className="border-t border-gray-200 p-8">
        <RelatedPosts currentSlug={post.slug} category={post.category} />
      </div>
    </article>
  );
}