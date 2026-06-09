'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Role } from '@/lib/crm/types';

interface SidebarProps {
  role: Role;
  userName: string;
  open: boolean;
  onClose: () => void;
}

const navItems = [
  { href: '/staff/dashboard', label: 'Dashboard', icon: '📊', roles: ['admin', 'agent', 'receptionist'] as Role[] },
  { href: '/staff/clients', label: 'Clients', icon: '👥', roles: ['admin', 'agent', 'receptionist'] as Role[] },
  { href: '/staff/cases', label: 'Cases', icon: '📁', roles: ['admin', 'agent', 'receptionist'] as Role[] },
  { href: '/staff/tasks', label: 'Tasks', icon: '✅', roles: ['admin', 'agent', 'receptionist'] as Role[] },
  { href: '/staff/settings', label: 'Settings', icon: '⚙️', roles: ['admin'] as Role[] },
];

export function Sidebar({ role, userName, open, onClose }: SidebarProps) {
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === '/staff/dashboard'
      ? pathname === '/staff/dashboard'
      : pathname.startsWith(href);

  const items = navItems.filter((item) => item.roles.includes(role));

  return (
    <>
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-20 lg:hidden"
          style={{ backgroundColor: 'rgba(26,46,74,0.5)' }}
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-64 flex flex-col transition-transform duration-250 lg:static lg:translate-x-0 ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ backgroundColor: 'var(--color-navy)' }}
      >
        {/* Logo */}
        <div
          className="flex items-center gap-3 px-5 py-4 border-b"
          style={{ borderColor: 'rgba(255,255,255,0.1)', minHeight: '64px' }}
        >
          <span className="text-2xl">🍎</span>
          <div>
            <p className="font-bold text-sm text-white leading-tight">Apple E&I</p>
            <p className="text-xs" style={{ color: 'rgba(247,245,240,0.5)' }}>
              Staff Portal
            </p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 space-y-1" aria-label="CRM navigation">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150"
              style={{
                backgroundColor: isActive(item.href)
                  ? 'rgba(255,255,255,0.12)'
                  : 'transparent',
                color: isActive(item.href) ? 'white' : 'rgba(247,245,240,0.65)',
              }}
              aria-current={isActive(item.href) ? 'page' : undefined}
            >
              <span aria-hidden="true">{item.icon}</span>
              {item.label}
              {isActive(item.href) && (
                <span
                  className="ml-auto w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                />
              )}
            </Link>
          ))}
        </nav>

        {/* User info */}
        <div
          className="px-4 py-4 border-t"
          style={{ borderColor: 'rgba(255,255,255,0.1)' }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
              style={{ backgroundColor: 'var(--color-gold)', color: 'var(--color-navy)' }}
            >
              {userName.charAt(0).toUpperCase()}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-white truncate">{userName}</p>
              <p className="text-xs capitalize" style={{ color: 'rgba(247,245,240,0.5)' }}>
                {role}
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
