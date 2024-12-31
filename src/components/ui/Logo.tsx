import React from 'react';
import { Brain } from 'lucide-react';
import { LogoProps } from './types';

export function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10'
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Brain className={`text-blue-600 ${sizes[size]}`} />
      <span className={`font-bold ${
        size === 'sm' ? 'text-xl' : 
        size === 'md' ? 'text-2xl' : 
        'text-3xl'
      } text-gray-900`}>
        Self AI
      </span>
    </div>
  );
}