'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Zap, LayoutDashboard, Dumbbell, Apple, Bot, TrendingUp, Settings } from 'lucide-react';
import { clsx } from 'clsx';

const navLinks = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/training', label: 'Training', icon: Dumbbell },
  { href: '/nutrition', label: 'Nutrition', icon: Apple },
  { href: '/coach', label: 'AI Coach', icon: Bot },
  { href: '/progress', label: 'Progress', icon: TrendingUp },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-64 h-screen fixed left-0 top-0 bg-dark-900 border-r border-white/5 z-40">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b border-white/5">
        <div className="w-8 h-8 rounded-lg bg-gold-500 flex items-center justify-center shadow-gold">
          <Zap className="w-5 h-5 text-dark-900" />
        </div>
        <span className="text-lg font-bold text-white">
          FitAI <span className="text-gold-400">Pro</span>
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 group',
                isActive
                  ? 'bg-gold-500/10 text-gold-400 border border-gold-500/20'
                  : 'text-dark-300 hover:text-white hover:bg-dark-800'
              )}
            >
              <Icon
                className={clsx(
                  'w-5 h-5 transition-colors',
                  isActive ? 'text-gold-400' : 'text-dark-400 group-hover:text-white'
                )}
              />
              {label}
              {isActive && (
                <span className="ml-auto w-1.5 h-1.5 rounded-full bg-gold-400" />
              )}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 border-t border-white/5">
        <Link
          href="/onboarding"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-dark-300 hover:text-white hover:bg-dark-800 transition-all group"
        >
          <Settings className="w-5 h-5 text-dark-400 group-hover:text-white transition-colors" />
          Update Profile
        </Link>
        <div className="mt-3 px-3 py-3 rounded-xl bg-gold-500/5 border border-gold-500/10">
          <p className="text-xs text-gold-400 font-medium mb-1">AI Coach Active</p>
          <p className="text-xs text-dark-400">Ask anything about your plan</p>
          <Link
            href="/coach"
            className="mt-2 inline-flex items-center gap-1 text-xs text-gold-400 hover:text-gold-300 transition-colors"
          >
            Chat now →
          </Link>
        </div>
      </div>
    </aside>
  );
}
