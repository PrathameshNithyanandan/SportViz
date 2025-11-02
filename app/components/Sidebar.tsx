'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';

const menuItems = [
  {
    name: 'Home',
    href: '/',
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    )
  },
];

const cricketItems = [
  { name: 'Cricket Matches', href: '/cricket', icon: '🏏' },
  { name: 'Cricket Teams', href: '/cricket/teams', icon: '👥' },
  { name: 'Cricket Players', href: '/cricket/players', icon: '⭐' },
  { name: 'Cricket Stats', href: '/cricket/stats', icon: '📊' },
];

const footballItems = [
  { name: 'Football Matches', href: '/football', icon: '⚽' },
  { name: 'Football Teams', href: '/football/teams', icon: '👥' },
  { name: 'Football Players', href: '/football/players', icon: '⭐' },
  { name: 'Football Stats', href: '/football/stats', icon: '📊' },
];

interface SidebarProps {
  children: React.ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      {/* Hamburger Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 z-50 bg-white p-3 rounded-lg shadow-lg border border-gray-200 hover:bg-gray-50 transition-all duration-300 ${
          isOpen ? 'left-[19rem]' : 'left-6'
        }`}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
          <span className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </div>
      </button>

      {/* Sidebar */}
      <aside className={`w-72 bg-white border-r border-gray-200 min-h-screen flex flex-col shadow-sm z-40 transition-all duration-300 ease-in-out flex-shrink-0 ${isOpen ? 'ml-0' : '-ml-72'}`}>
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity" onClick={() => setIsOpen(true)}>
            <Image src="/logo.svg" alt="SportViz Logo" width={40} height={40} />
            <span className="text-gray-900 text-2xl font-bold">SportViz</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-4 overflow-y-auto">
          {/* Home */}
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-5 py-4 rounded-xl transition-all duration-200 ${
                  isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <span className={isActive ? 'text-blue-700' : 'text-gray-500'}>{item.icon}</span>
                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            );
          })}

          {/* Cricket Section */}
          <div>
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Cricket</div>
            <div className="space-y-1">
              {cricketItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Football Section */}
          <div>
            <div className="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">Football</div>
            <div className="space-y-1">
              {footballItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 px-5 py-3 rounded-xl transition-all duration-200 ${
                      isActive ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{item.icon}</span>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="text-xs text-gray-400 text-center">
            <p>© 2024 SportViz</p>
            <p className="mt-1">Live Sports Updates</p>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
