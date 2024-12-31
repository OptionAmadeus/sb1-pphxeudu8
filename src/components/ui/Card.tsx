import React from 'react';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`bg-white rounded-lg shadow-lg ${className}`}>
      {title && (
        <h2 className="text-xl font-semibold p-6 pb-0">{title}</h2>
      )}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}