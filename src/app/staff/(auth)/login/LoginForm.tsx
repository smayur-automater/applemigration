'use client';

import { useState, useTransition, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { loginAction } from './actions';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    startTransition(async () => {
      const result = await loginAction(email, password);
      if (result.error) {
        setError(result.error);
      } else {
        const redirect = searchParams.get('redirect') ?? '/staff/dashboard';
        router.push(redirect);
      }
    });
  };

  const inputStyle = {
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    height: '44px',
    width: '100%',
    padding: '0 12px',
    fontSize: '1rem',
    color: 'var(--color-charcoal)',
    outline: 'none',
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-navy)' }}
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium mb-1.5"
            style={{ color: 'var(--color-navy)' }}
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={inputStyle}
          />
        </div>
      </div>

      {error && (
        <div
          role="alert"
          className="mt-4 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: 'rgba(192,57,43,0.08)',
            border: '1px solid var(--color-error)',
            color: 'var(--color-error)',
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="w-full mt-6 py-3 rounded-full font-semibold text-white transition-all duration-250 disabled:opacity-70 flex items-center justify-center gap-2"
        style={{ backgroundColor: 'var(--color-navy)' }}
      >
        {isPending && (
          <svg
            aria-hidden="true"
            className="w-4 h-4"
            style={{ animation: 'spin 700ms linear infinite' }}
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" className="opacity-25" />
            <path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" className="opacity-75" />
          </svg>
        )}
        {isPending ? 'Signing in…' : 'Sign in'}
      </button>
    </form>
  );
}
