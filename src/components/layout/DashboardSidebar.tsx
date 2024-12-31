import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Brain } from 'lucide-react';

const navItems = [
  { 
    to: '/dashboard',
    label: 'Overview',
    icon: LayoutDashboard 
  },
  { 
    to: '/dashboard/recommendations',
    label: 'AI Insights',
    icon: Brain
  }
];

export function DashboardSidebar() {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <nav className="p-4 space-y-1">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.to === '/dashboard'}
            className={({ isActive }) => `
              flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md
              ${isActive 
                ? 'bg-blue-50 text-blue-700' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
            `}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}