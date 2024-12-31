import React from 'react';
import { Link } from 'react-router-dom';
import { FooterLinkProps } from './types';

export function FooterLink({ to, children }: FooterLinkProps) {
  return (
    <Link to={to} className="text-gray-500 hover:text-gray-900">
      {children}
    </Link>
  );
}