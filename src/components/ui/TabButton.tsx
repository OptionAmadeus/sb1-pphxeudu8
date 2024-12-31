import React from 'react';

interface TabButtonProps {
  isActive: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  className?: string;
}

export function TabButton({ isActive, onClick, icon, label, className = '' }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-6 py-4 border-b-2 text-sm font-medium transition-colors
        ${isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}
        ${className}
      `}
    >
      {icon}
      {label}
    </button>
  );
}