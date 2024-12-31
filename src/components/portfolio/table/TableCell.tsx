import React from 'react';

interface TableCellProps {
  children: React.ReactNode;
  align?: 'left' | 'right' | 'center';
}

export function TableCell({ children, align = 'left' }: TableCellProps) {
  return (
    <td className={`whitespace-nowrap py-4 px-3 text-sm ${
      align === 'right' ? 'text-right' : 
      align === 'center' ? 'text-center' : 
      'text-left'
    }`}>
      {children}
    </td>
  );
}