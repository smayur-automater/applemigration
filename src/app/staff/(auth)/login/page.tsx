import type { Metadata } from 'next';
import { Suspense } from 'react';
import { LoginForm } from './LoginForm';

export const metadata: Metadata = {
  title: 'Staff Login — Apple Education & Immigration CRM',
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ backgroundColor: 'var(--color-navy)' }}
    >
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🍎</div>
          <h1 className="font-display font-bold text-white text-xl">
            Apple Education & Immigration
          </h1>
          <p className="text-sm mt-1" style={{ color: 'rgba(247,245,240,0.6)' }}>
            Staff Portal
          </p>
        </div>

        <div
          className="bg-white rounded-2xl p-8"
          style={{ boxShadow: 'var(--shadow-2xl)' }}
        >
          <h2
            className="font-semibold text-xl mb-6"
            style={{ color: 'var(--color-navy)' }}
          >
            Sign in to your account
          </h2>
          <Suspense fallback={null}>
            <LoginForm />
          </Suspense>
        </div>

        <p className="text-center text-xs mt-6" style={{ color: 'rgba(247,245,240,0.4)' }}>
          This system is for authorised staff only.
        </p>
      </div>
    </div>
  );
}
