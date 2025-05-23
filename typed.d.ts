// import type { DefaultSession } from 'next-auth'; // Apenas se estiver usando
import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: 'ADMIN' | 'MANAGER' | 'USER';
      isActive: boolean;
    } & NextAuth.User;
  }

  interface User {
    role: 'ADMIN' | 'MANAGER' | 'USER';
    isActive: boolean;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    email: string;
    role: 'ADMIN' | 'MANAGER' | 'USER';
    isActive: boolean;
  }
}

type UserWithRole = User & {
  role?: 'ADMIN' | 'MANAGER' | 'USER';
  isActive?: boolean;
};
