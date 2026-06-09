'use client';

import { useState } from 'react';
import { Sidebar } from '@/components/crm/Sidebar';
import { TopBar } from '@/components/crm/TopBar';
import type { Role } from '@/lib/crm/types';

interface CRMShellProps {
  role: Role;
  userName: string;
  children: React.ReactNode;
}

export function CRMShell({ role, userName, children }: CRMShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar
        role={role}
        userName={userName}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar
          userName={userName}
          onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6" style={{ backgroundColor: 'var(--color-off-white)' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
