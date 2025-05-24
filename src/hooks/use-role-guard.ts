'use client';

import { useEffect } from 'react';
import type { Role } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
type Options = {
  allowedRoles: Role[];
  redirectTo?: string;
};

export function useRoleGuard({ allowedRoles, redirectTo = '/login' }: Options) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (
      status !== 'loading' &&
      (!session?.user || !allowedRoles.includes(session.user.role))
    ) {
      router.replace(redirectTo);
    }
  }, [session, status, allowedRoles, router, redirectTo]);

  return { session, loading: status === 'loading' };
}
