import React from 'react';

interface TableHeaderProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export function TableHeader({ children, align = 'left' }: TableHeaderProps) {
  return (
    <th className={`py-3.5 px-3 text-sm font-semibold text-gray-900 ${
      align === 'right' ? 'text-right' : 
      align === 'center' ? 'text-center' : 
      'text-left'
    }`}>
      {children}
    </th>
  );
}