import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import type { SessionPayload } from '@/lib/crm/types';

export const config = { matcher: ['/staff/:path*'] };

function getSecret(): Uint8Array {
  const secret = process.env.CRM_SESSION_SECRET ?? 'dev-secret-change-in-production-32ch';
  return new TextEncoder().encode(secret);
}

export async function proxy(request: NextRequest): Promise<NextResponse> {
  const { pathname } = request.nextUrl;

  // Allow login page through
  if (pathname === '/staff/login' || pathname === '/staff/login/') {
    return NextResponse.next();
  }

  const token = request.cookies.get('crm_session')?.value;

  if (!token) {
    const loginUrl = new URL('/staff/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    const user = payload as unknown as SessionPayload;

    // Settings page: admin only
    if (pathname.startsWith('/staff/settings') && user.role !== 'admin') {
      return NextResponse.redirect(new URL('/staff/dashboard', request.url));
    }

    // Forward decoded user to server components via header
    const res = NextResponse.next();
    res.headers.set('x-crm-user', encodeURIComponent(JSON.stringify(user)));
    return res;
  } catch {
    const loginUrl = new URL('/staff/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }
}
