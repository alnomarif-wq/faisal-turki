'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Zap, LayoutDashboard, Dumbbell, Apple, Bot, TrendingUp, Menu, X } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/training', label: 'Training', icon: Dumbbell },
  { href: '/nutrition', label: 'Nutrition', icon: Apple },
  { href: '/coach', label: 'AI Coach', icon: Bot },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-dark-900/90 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/dashboard" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center group-hover:shadow-gold transition-shadow">
                <Zap className="w-5 h-5 text-dark-900" />
              </div>
              <span className="text-lg font-bold text-white hidden sm:block">
                FitAI <span className="text-gold-400">Pro</span>
              </span>
            </Link>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    className={clsx(
                      'flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150',
                      isActive
                        ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                        : 'text-dark-300 hover:text-white hover:bg-dark-700'
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Link>
                );
              })}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <Link
                href="/onboarding"
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium border border-gold-500/30 text-gold-400 hover:bg-gold-500/10 transition-all"
              >
                <Zap className="w-3.5 h-3.5" />
                Re-generate Plan
              </Link>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 rounded-lg text-dark-300 hover:text-white hover:bg-dark-700 transition-colors"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-16 left-0 right-0 bg-dark-900 border-b border-white/5 shadow-xl">
            <div className="p-4 space-y-1">
              {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = pathname === href;
                return (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className={clsx(
                      'flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all',
                      isActive
                        ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                        : 'text-dark-300 hover:text-white hover:bg-dark-800'
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {label}
                  </Link>
                );
              })}
              <Link
                href="/onboarding"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gold-400 hover:bg-gold-500/10 mt-2 border border-gold-500/20 transition-all"
              >
                <Zap className="w-5 h-5" />
                Re-generate Plan
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
