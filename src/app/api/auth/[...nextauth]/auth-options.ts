import { PrismaAdapter } from '@next-auth/prisma-adapter';
import type { NextAuthOptions, Session, User } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import GoogleProvider from 'next-auth/providers/google';

import type { UserWithRole } from '../../../../../typed';

import { env } from '@/env.mjs';
import prisma from '@/lib/prisma';
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  secret: env.AUTH_SECRET,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: env.GOOGLE_ID,
      clientSecret: env.GOOGLE_SECRET,
    }),
  ],
  // callbacks: {
  //   jwt({ token, user }: { token: JWT; user?: User }) {
  //     if (user) {
  //       token.id = user.id;
  //       token.email = user.email ?? '';
  //       token.role = (user as any).role ?? 'USER';
  //       token.isActive = (user as any).isActive ?? true;
  //     }
  //     return token;
  //   },
  //   async session({ session, token }) {
  //     if (session.user && token?.id) {
  //       session.user.id = token.id;
  //       session.user.role = (token.role as any) ?? 'USER';
  //       session.user.isActive = token.isActive ?? true;
  //     } else {
  //       console.warn('[auth][warn] Token inválido na session:', token);
  //     }
  //     return session;
  //   },
  // },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.email = user.email ?? '';
        token.role = (user as UserWithRole).role ?? 'USER';
        token.isActive = (user as UserWithRole).isActive ?? true;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user && token?.id) {
        session.user.id = token.id as string;
        session.user.role = token.role as 'ADMIN' | 'MANAGER' | 'USER';
        session.user.isActive = token.isActive as boolean;
      } else {
        console.warn('[auth][warn] Token inválido na session:', token);
      }
      return session;
    },
  },
  logger: {
    error: (...args) => console.error('[auth][error]', ...args),
    warn: (...args) => console.warn('[auth][warn]', ...args),
    debug: (...args) => console.debug('[auth][debug]', ...args),
  },
  debug: true,
};
