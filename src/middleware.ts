import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

import { env } from './env.mjs';

import { middleware as paraglide } from '@/lib/i18n';

const PUBLIC_ROUTES = ['/', '/login'];
const LOGIN_ROUTE = '/login';
const DEFAULT_ROUTE_AFTER_LOGIN = '/dashboard';
const UNAUTHORIZED_ROUTE = '/unauthorized';

const ROLE_PROTECTED_PATHS: Record<string, ('ADMIN' | 'MANAGER' | 'USER')[]> = {
  '/admin': ['ADMIN'],
  '/dashboard': ['ADMIN', 'MANAGER'],
};

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith('/api/') || pathname === '/api') {
    return NextResponse.next();
  }

  const i18nResponse = await paraglide(request);
  if (i18nResponse.status !== 200) return i18nResponse;

  const token = await getToken({
    req: request,
    secret: env.AUTH_SECRET,
    cookieName: 'next-auth.session-token',
  });

  const isPublicRoute = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (!isPublicRoute && !token) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  if (pathname === LOGIN_ROUTE && token) {
    return NextResponse.redirect(
      new URL(DEFAULT_ROUTE_AFTER_LOGIN, request.url)
    );
  }

  for (const path in ROLE_PROTECTED_PATHS) {
    if (pathname.startsWith(path)) {
      const allowedRoles = ROLE_PROTECTED_PATHS[path];
      const userRole = token?.role;
      if (!userRole || !allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL(UNAUTHORIZED_ROUTE, request.url));
      }
    }
  }

  return i18nResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
