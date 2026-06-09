'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import { logoutAction } from '@/app/staff/(auth)/login/actions';

interface TopBarProps {
  userName: string;
  onMenuToggle: () => void;
}

const pageTitles: Record<string, string> = {
  '/staff/dashboard': 'Dashboard',
  '/staff/clients': 'Clients',
  '/staff/cases': 'Cases',
  '/staff/tasks': 'Tasks',
  '/staff/settings': 'Settings',
};

function getTitle(pathname: string): string {
  if (pathname.startsWith('/staff/clients/new')) return 'New Client';
  if (pathname.match(/\/staff\/clients\/.+/)) return 'Client Details';
  if (pathname.match(/\/staff\/cases\/.+/)) return 'Case Details';
  return pageTitles[pathname] ?? 'CRM';
}

export function TopBar({ userName, onMenuToggle }: TopBarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    startTransition(async () => {
      await logoutAction();
      router.push('/staff/login');
    });
  };

  return (
    <header
      className="h-16 flex items-center justify-between px-4 sm:px-6 border-b bg-white shrink-0"
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center gap-4">
        {/* Mobile hamburger */}
        <button
          onClick={onMenuToggle}
          aria-label="Toggle navigation"
          className="lg:hidden p-2 rounded-md"
          style={{ color: 'var(--color-navy)' }}
        >
          <svg aria-hidden="true" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <h1 className="font-semibold text-lg" style={{ color: 'var(--color-navy)' }}>
          {getTitle(pathname)}
        </h1>
      </div>

      {/* Right: user dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors duration-150"
          style={{ color: 'var(--color-navy)' }}
          aria-expanded={showDropdown}
          aria-haspopup="true"
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-navy)' }}
          >
            {userName.charAt(0).toUpperCase()}
          </div>
          <span className="hidden sm:block font-medium">{userName}</span>
          <svg aria-hidden="true" className="w-4 h-4 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showDropdown && (
          <div
            className="absolute right-0 mt-1 w-48 bg-white rounded-lg py-1 z-50"
            style={{ boxShadow: 'var(--shadow-lg)', border: '1px solid var(--color-border)' }}
          >
            <button
              onClick={handleSignOut}
              disabled={isPending}
              className="w-full text-left px-4 py-2 text-sm transition-colors duration-150 hover:bg-[var(--color-surface)]"
              style={{ color: 'var(--color-error)' }}
            >
              {isPending ? 'Signing out…' : '🚪 Sign out'}
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
