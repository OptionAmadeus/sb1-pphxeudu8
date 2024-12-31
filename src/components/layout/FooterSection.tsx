import React from 'react';
import { FooterSectionProps } from './types';

export function FooterSection({ title, children }: FooterSectionProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">
        {children}
      </ul>
    </div>
  );
}