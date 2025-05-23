import type { Role } from '@prisma/client';

import { auth } from './next-auth-wrapper';

type SessionWithRole = {
  user?: {
    role: Role;
  };
};

export async function requireRole(allowedRoles: Role[]) {
  const session = (await auth()) as SessionWithRole;

  if (!session.user || !allowedRoles.includes(session.user.role)) {
    throw new Error('Access Denied');
  }
}
