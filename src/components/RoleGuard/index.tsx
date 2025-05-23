'use client';

import { ReactNode } from 'react';
import { useSession } from 'next-auth/react';

interface RoleGuardProps {
  allowedRoles: Array<'ADMIN' | 'MANAGER' | 'USER'>;
  children: ReactNode;
  fallback?: ReactNode;
}

export const RoleGuard = ({
  allowedRoles,
  children,
  fallback = null,
}: RoleGuardProps) => {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;
  if (!session?.user || !allowedRoles.includes(session.user.role)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
