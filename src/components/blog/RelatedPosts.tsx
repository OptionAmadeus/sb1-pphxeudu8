import React from 'react';
import { Link } from 'react-router-dom';
import { blogPosts } from '@/data/blogPosts';
import type { BlogPost } from '@/types/blog';

interface RelatedPostsProps {
  currentSlug: string;
  category: BlogPost['category'];
}

export function RelatedPosts({ currentSlug, category }: RelatedPostsProps) {
  const relatedPosts = blogPosts
    .filter(post => post.slug !== currentSlug && post.category === category)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="grid gap-6 md:grid-cols-3">
        {relatedPosts.map(post => (
          <Link 
            key={post.slug}
            to={`/blog/${post.slug}`}
            className="group"
          >
            <div className="bg-gray-50 rounded-lg overflow-hidden">
              <img 
                src={post.imageUrl} 
                alt={post.title}
                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 mb-2">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {post.excerpt}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}