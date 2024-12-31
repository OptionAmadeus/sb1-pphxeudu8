import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Logo } from '../components/ui/Logo';
import { Features } from '../components/marketing/Features';
import { Footer } from '../components/layout/Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <nav className="flex items-center justify-between">
            <Logo />
            <div className="flex items-center gap-6">
              <Link
                to="/login"
                className="text-base font-medium text-gray-500 hover:text-gray-900"
              >
                Sign in
              </Link>
              <Link
                to="/get-started"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
              >
                Join Waitlist
              </Link>
            </div>
          </nav>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <div className="relative pt-16 pb-20 lg:pt-24 lg:pb-28">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <span className="block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                    <span className="block text-gray-900">Empower your investments</span>
                    <span className="block text-blue-600 mt-1">with artificial intelligence</span>
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                  Transform your portfolio management with AI-driven insights. Get personalized recommendations,
                  real-time analytics, and comprehensive performance tracking all in one place.
                </p>
                <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0">
                  <Link
                    to="/get-started"
                    className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
              <div className="mt-12 relative lg:mt-0 lg:col-span-6">
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <div className="relative block w-full overflow-hidden rounded-lg">
                    <img
                      className="w-full object-cover"
                      src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600&q=80"
                      alt="AI-powered analytics dashboard"
                      width={800}
                      height={600}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Features />
      </main>

      <Footer />
    </div>
  );
}