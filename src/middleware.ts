// src/middleware.ts
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { middleware as paraglide } from '@/lib/i18n';

const PUBLIC_ROUTES = ['/', '/login'];
const LOGIN_ROUTE = '/login';
const DASHBOARD_ROUTE = '/dashboard'; // Altere para a rota pós-login da sua aplicação

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Executa o middleware de internacionalização (paraglide)
  const i18nResponse = paraglide(request);
  if (i18nResponse.status !== 200) return i18nResponse;

  // Verifica autenticação por cookies (NextAuth.js)
  const sessionToken =
    request.cookies.get('__Secure-authjs.session-token')?.value ||
    request.cookies.get('authjs.session-token')?.value;

  const isPublic = PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // 🔒 Rota protegida sem token → redireciona para login
  if (!isPublic && !sessionToken) {
    return NextResponse.redirect(new URL(LOGIN_ROUTE, request.url));
  }

  // ✅ Já está logado e tentou acessar o login → redireciona para dashboard
  if (pathname === LOGIN_ROUTE && sessionToken) {
    return NextResponse.redirect(new URL(DASHBOARD_ROUTE, request.url));
  }

  return i18nResponse;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
