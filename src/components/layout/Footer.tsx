import React from 'react';
import { Logo } from '../ui/Logo';
import { FooterLink } from './FooterLink';
import { FooterSection } from './FooterSection';

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Logo size="sm" />
            <p className="mt-4 text-gray-500 text-sm">
              Self AI empowers investors with artificial intelligence to make smarter, 
              data-driven decisions in their portfolio management journey.
            </p>
          </div>

          <FooterSection title="Quick Links">
            <li><FooterLink to="/about">About Us</FooterLink></li>
            <li><FooterLink to="/contact">Contact</FooterLink></li>
            <li><FooterLink to="/faq">FAQ</FooterLink></li>
            <li><FooterLink to="/blog">Blog</FooterLink></li>
          </FooterSection>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {currentYear} Self AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}