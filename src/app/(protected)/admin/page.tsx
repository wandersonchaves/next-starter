import { requireRole } from '@/lib/auth/require-role';

export default async function AdminPage() {
  await requireRole(['ADMIN']);

  return <div>Bem-vindo, Admin!</div>;
}
