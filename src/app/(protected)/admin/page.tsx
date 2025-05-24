import { requireRole } from '@/lib/auth/require-role';

export default async function AdminPage() {
  const session = await requireRole(['ADMIN']);

  return <div>Bem-vindo, {session.user?.role}</div>;
}
