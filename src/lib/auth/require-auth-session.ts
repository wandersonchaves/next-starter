import type { Role } from '@prisma/client';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/auth-options';

export async function requireAuthSession(allowedRoles: Role[] = []) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !allowedRoles.includes(session.user.role)) {
    return redirect('/login');
  }

  return session;
}
